import { useState, useCallback } from "react";

interface UseTextToSpeechReturn {
  isSupported: boolean;
  isSpeaking: boolean;
  speak: (text: string, lang?: string) => void;
  stop: () => void;
  voices: SpeechSynthesisVoice[];
}

export function useTextToSpeech(): UseTextToSpeechReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Check if speech synthesis is supported
  const isSupported = "speechSynthesis" in window;

  // Load available voices
  const loadVoices = useCallback(() => {
    if (isSupported) {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    }
  }, [isSupported]);

  // Load voices on first render and when voices change
  if (isSupported && voices.length === 0) {
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }

  const speak = useCallback(
    (text: string, lang: string = "ja-JP") => {
      if (!isSupported) {
        console.warn("Speech synthesis is not supported in this browser");
        return;
      }

      // Stop any current speech
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9; // Slightly slower for learning
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Try to find a Japanese voice
      const japaneseVoices = voices.filter(
        (voice) => voice.lang.startsWith("ja") || voice.lang.includes("JP"),
      );

      if (japaneseVoices.length > 0) {
        // Prefer female voices for a more natural sensei experience
        const femaleVoice = japaneseVoices.find(
          (voice) =>
            voice.name.toLowerCase().includes("female") ||
            voice.name.toLowerCase().includes("kyoko") ||
            voice.name.toLowerCase().includes("otoya"),
        );
        utterance.voice = femaleVoice || japaneseVoices[0];
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event.error);
        setIsSpeaking(false);
      };

      speechSynthesis.speak(utterance);
    },
    [isSupported, voices],
  );

  const stop = useCallback(() => {
    if (isSupported) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return {
    isSupported,
    isSpeaking,
    speak,
    stop,
    voices,
  };
}
