"use client";

import { useEffect, useCallback } from "react";
import { audioEngine } from "@/lib/audioEngine";
import { useGameStore } from "@/hooks/useGameStore";

export function useAudio() {
  const isMuted = useGameStore((s) => s.isMuted);

  useEffect(() => {
    audioEngine.setMuted(isMuted);
  }, [isMuted]);

  const play = useCallback(
    (sound: keyof typeof audioEngine) => {
      if (!isMuted && typeof audioEngine[sound] === "function") {
        (audioEngine[sound] as () => void)();
      }
    },
    [isMuted]
  );

  return { play, isMuted };
}
