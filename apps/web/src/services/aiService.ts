import { Dojo } from "../data/mockDojos";

export interface AIResponse {
  japanese: string;
  romaji: string;
  english: string;
}

export interface FeedbackResponse {
  isCorrect: boolean;
  feedback: string;
  suggestions?: string[];
  score: number; // 0-100
}

export interface ConversationContext {
  dojo: Dojo;
  conversationHistory: Array<{
    sensei: string;
    user: string;
    timestamp: Date;
  }>;
  currentTopic?: string;
}

class AIService {
  private apiKey: string | null = null;
  private baseUrl = "https://api.openai.com/v1";

  constructor() {
    // In a real app, this would come from environment variables
    // For now, we'll use a placeholder and fall back to mock responses
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || null;
  }

  async generateSenseiResponse(
    context: ConversationContext,
  ): Promise<AIResponse> {
    if (!this.apiKey) {
      // Fall back to enhanced mock responses
      return this.generateMockResponse(context);
    }

    try {
      const prompt = this.buildConversationPrompt(context);

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are a Japanese conversation sensei. You embody the persona of "${context.dojo.persona}". 
              Generate natural Japanese phrases that this person would say in conversation. 
              Always respond with JSON format: {"japanese": "...", "romaji": "...", "english": "..."}`,
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 200,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      try {
        return JSON.parse(content);
      } catch {
        // If JSON parsing fails, fall back to mock
        return this.generateMockResponse(context);
      }
    } catch (error) {
      console.error("AI API error:", error);
      return this.generateMockResponse(context);
    }
  }

  async evaluateUserResponse(
    senseiPhrase: string,
    userResponse: string,
    context: ConversationContext,
  ): Promise<FeedbackResponse> {
    if (!this.apiKey) {
      return this.generateMockFeedback(senseiPhrase, userResponse);
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are a Japanese language teacher evaluating student responses. 
              Analyze the user's Japanese response for grammar, naturalness, and appropriateness in context.
              Respond with JSON: {"isCorrect": boolean, "feedback": "...", "suggestions": [...], "score": 0-100}`,
            },
            {
              role: "user",
              content: `Sensei said: "${senseiPhrase}"
              Student responded: "${userResponse}"
              Context: ${context.dojo.persona}
              
              Please evaluate this response.`,
            },
          ],
          temperature: 0.3,
          max_tokens: 300,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      try {
        return JSON.parse(content);
      } catch {
        return this.generateMockFeedback(senseiPhrase, userResponse);
      }
    } catch (error) {
      console.error("AI evaluation error:", error);
      return this.generateMockFeedback(senseiPhrase, userResponse);
    }
  }

  private buildConversationPrompt(context: ConversationContext): string {
    const history = context.conversationHistory
      .slice(-3) // Last 3 exchanges for context
      .map((h) => `Sensei: ${h.sensei}\nStudent: ${h.user}`)
      .join("\n");

    return `
    Conversation context: ${context.dojo.description}
    Persona: ${context.dojo.persona}
    Difficulty: ${context.dojo.difficulty}
    
    Recent conversation:
    ${history}
    
    Generate the next natural Japanese phrase this person would say in conversation.
    Make it appropriate for ${context.dojo.difficulty} level learners.
    `;
  }

  private generateMockResponse(context: ConversationContext): AIResponse {
    // Enhanced mock responses based on context
    const responses = {
      mom: [
        {
          japanese: "今日の晩ごはんは何がいい？",
          romaji: "Kyō no bangohan wa nani ga ii?",
          english: "What would you like for dinner today?",
        },
        {
          japanese: "お風呂に入りなさい。",
          romaji: "Ofuro ni hairinasai.",
          english: "Please take a bath.",
        },
        {
          japanese: "明日は雨が降るみたいよ。",
          romaji: "Ashita wa ame ga furu mitai yo.",
          english: "It looks like it will rain tomorrow.",
        },
      ],
      friend: [
        {
          japanese: "今度新しいカフェに行ってみない？",
          romaji: "Kondo atarashii kafe ni itte minai?",
          english: "Want to try going to that new cafe sometime?",
        },
        {
          japanese: "そのアニメ見た？めっちゃ面白かった！",
          romaji: "Sono anime mita? Meccha omoshirokatta!",
          english: "Did you watch that anime? It was super interesting!",
        },
        {
          japanese: "今度の休みに何する？",
          romaji: "Kondo no yasumi ni nani suru?",
          english: "What are you doing on your next day off?",
        },
      ],
      coworker: [
        {
          japanese: "来週の企画書の件でご相談があります。",
          romaji: "Raishū no kikakusho no ken de go-sōdan ga arimasu.",
          english: "I have a consultation about next week's proposal.",
        },
        {
          japanese: "会議室の予約を確認していただけますか？",
          romaji: "Kaigishitsu no yoyaku wo kakunin shite itadakemasu ka?",
          english: "Could you please confirm the meeting room reservation?",
        },
        {
          japanese: "お疲れ様です。資料の準備ができました。",
          romaji: "Otsukaresama desu. Shiryō no junbi ga dekimashita.",
          english: "Thank you for your hard work. The materials are ready.",
        },
      ],
    };

    const dojoResponses =
      responses[context.dojo.id as keyof typeof responses] || responses.friend;
    return dojoResponses[Math.floor(Math.random() * dojoResponses.length)];
  }

  private generateMockFeedback(
    senseiPhrase: string,
    userResponse: string,
  ): FeedbackResponse {
    // Simple mock feedback logic
    const isLongEnough = userResponse.length > 3;
    const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(
      userResponse,
    );

    if (!hasJapanese) {
      return {
        isCorrect: false,
        feedback:
          "Please try responding in Japanese. Use hiragana, katakana, or kanji.",
        suggestions: [
          "Try using Japanese characters",
          "Listen to the phrase again",
        ],
        score: 20,
      };
    }

    if (!isLongEnough) {
      return {
        isCorrect: false,
        feedback:
          "Your response is quite short. Try to give a more complete answer.",
        suggestions: [
          "Add more detail to your response",
          "Use complete sentences",
        ],
        score: 40,
      };
    }

    // Simulate positive feedback for reasonable responses
    const score = Math.floor(Math.random() * 30) + 70; // 70-100 range

    return {
      isCorrect: score >= 75,
      feedback:
        score >= 90
          ? "Excellent! Your pronunciation and grammar are very natural."
          : score >= 75
            ? "Good response! Your Japanese is clear and appropriate."
            : "Not bad, but there's room for improvement in naturalness.",
      suggestions:
        score < 75
          ? ["Practice pronunciation", "Try using more natural expressions"]
          : [],
      score,
    };
  }
}

export const aiService = new AIService();
