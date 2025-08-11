export interface Dojo {
  id: string;
  name: string;
  description: string;
  persona: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  phrases: Array<{
    japanese: string;
    romaji: string;
    english: string;
  }>;
  avatar: string; // For now, we'll use emoji until we add pixel art
}

export const mockDojos: Dojo[] = [
  {
    id: "mom",
    name: "お母さん (Okāsan)",
    description: "Practice everyday family conversations",
    persona:
      "A caring Japanese mother who speaks warmly and asks about daily life",
    difficulty: "beginner",
    avatar: "👩‍🦳",
    phrases: [
      {
        japanese: "学校の準備はできた？",
        romaji: "Gakkō no junbi wa dekita?",
        english: "Are you ready for school?",
      },
      {
        japanese: "朝ごはんは何が食べたい？",
        romaji: "Asagohan wa nani ga tabetai?",
        english: "What do you want for breakfast?",
      },
      {
        japanese: "今日はどうだった？",
        romaji: "Kyō wa dō datta?",
        english: "How was your day today?",
      },
      {
        japanese: "宿題は終わった？",
        romaji: "Shukudai wa owatta?",
        english: "Did you finish your homework?",
      },
      {
        japanese: "早く寝なさい。",
        romaji: "Hayaku nenasai.",
        english: "Go to bed early.",
      },
    ],
  },
  {
    id: "friend",
    name: "友達 (Tomodachi)",
    description: "Casual conversations with a peer",
    persona: "A friendly Japanese person your age who speaks casually",
    difficulty: "intermediate",
    avatar: "😊",
    phrases: [
      {
        japanese: "今度一緒に映画を見ない？",
        romaji: "Kondo issho ni eiga wo minai?",
        english: "Want to watch a movie together sometime?",
      },
      {
        japanese: "週末は何をする予定？",
        romaji: "Shūmatsu wa nani wo suru yotei?",
        english: "What are you planning to do this weekend?",
      },
      {
        japanese: "そのゲーム面白そうだね！",
        romaji: "Sono gēmu omoshirosō da ne!",
        english: "That game looks interesting!",
      },
      {
        japanese: "今度カラオケに行こうよ。",
        romaji: "Kondo karaoke ni ikō yo.",
        english: "Let's go to karaoke sometime.",
      },
      {
        japanese: "お疲れ様！",
        romaji: "Otsukaresama!",
        english: "Good work! (casual greeting)",
      },
    ],
  },
  {
    id: "coworker",
    name: "同僚 (Dōryō)",
    description: "Professional workplace interactions",
    persona:
      "A polite Japanese colleague who uses appropriate business language",
    difficulty: "advanced",
    avatar: "👔",
    phrases: [
      {
        japanese: "会議の資料を準備していただけますか？",
        romaji: "Kaigi no shiryō wo junbi shite itadakemasu ka?",
        english: "Could you please prepare the meeting materials?",
      },
      {
        japanese: "プロジェクトの進捗はいかがですか？",
        romaji: "Purojekuto no shinchoku wa ikaga desu ka?",
        english: "How is the project progress?",
      },
      {
        japanese: "お疲れ様でした。",
        romaji: "Otsukaresama deshita.",
        english: "Thank you for your hard work. (formal)",
      },
      {
        japanese: "来週の予定を確認させてください。",
        romaji: "Raishū no yotei wo kakunin sasete kudasai.",
        english: "Please let me confirm next week's schedule.",
      },
      {
        japanese: "ご質問がございましたら、お聞かせください。",
        romaji: "Go-shitsumon ga gozaimashitara, okikase kudasai.",
        english: "If you have any questions, please let me know.",
      },
    ],
  },
];
