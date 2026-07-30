/**
 * Audio Engine — Web Audio API synthesizer
 * 2000s Flash Game Style Chiptune & Synthesized Sound Effects
 */

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let masterFilter: BiquadFilterNode | null = null;
let isMuted = false;

function getCtx(): { ctx: AudioContext; master: GainNode } {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Master filter to keep digital sounds smooth and warmth
    masterFilter = audioCtx.createBiquadFilter();
    masterFilter.type = "lowpass";
    masterFilter.frequency.value = 3600;

    // Master gain node
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.7;

    masterFilter.connect(masterGain);
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return { ctx: audioCtx, master: masterGain! };
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  gainValue = 0.1,
  delay = 0
): void {
  if (isMuted) return;
  try {
    const { ctx, master } = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);

    // Smooth linear envelope with zero clicks
    const startTime = ctx.currentTime + delay;
    const attackTime = Math.min(0.015, duration * 0.15);
    const stopTime = startTime + duration;

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(gainValue, startTime + attackTime);
    gain.gain.linearRampToValueAtTime(0.0001, stopTime - 0.005);

    osc.connect(gain);
    gain.connect(master);

    osc.start(startTime);
    osc.stop(stopTime);
  } catch (e) {}
}

let bgMusicInterval: any = null;
let bgMusicStep = 0;

// Catchy, nostalgic 2000s Flash game melody sequence (C Major / F Major chiptune feel)
const flashMelody = [
  // Phrase 1 (Bouncy & Cheerful)
  523.25, 659.25, 783.99, 659.25, 880.00, 783.99, 659.25, 523.25,
  // Phrase 2
  587.33, 698.46, 880.00, 698.46, 987.77, 880.00, 698.46, 587.33,
  // Phrase 3 (High peak)
  659.25, 783.99, 1046.50, 783.99, 1174.66, 1046.50, 783.99, 659.25,
  // Phrase 4 (Resolution)
  698.46, 880.00, 1046.50, 880.00, 987.77, 880.00, 698.46, 587.33,
];

const flashBass = [
  261.63, 261.63, 220.00, 220.00,
  174.61, 174.61, 196.00, 196.00,
];

export const audioEngine = {
  setMuted(muted: boolean) {
    isMuted = muted;
    if (muted) {
      this.stopBackgroundMusic();
    } else {
      this.startBackgroundMusic();
    }
  },

  startBackgroundMusic() {
    if (bgMusicInterval || isMuted) return;
    bgMusicStep = 0;
    bgMusicInterval = setInterval(() => {
      if (isMuted) return;
      try {
        const idx = bgMusicStep % flashMelody.length;
        const melodyNote = flashMelody[idx];

        // 2000s Flash Game lead melody (soft triangle synth tone)
        playTone(melodyNote, 0.16, "triangle", 0.022);

        // Bouncy bassline every 2 steps
        if (bgMusicStep % 2 === 0) {
          const bassIdx = Math.floor((bgMusicStep / 2) % flashBass.length);
          const bassNote = flashBass[bassIdx];
          playTone(bassNote / 2, 0.28, "sine", 0.032);
        }

        bgMusicStep++;
      } catch (e) {}
    }, 220); // Upbeat 136 BPM Flash game tempo!
  },

  stopBackgroundMusic() {
    if (bgMusicInterval) {
      clearInterval(bgMusicInterval);
      bgMusicInterval = null;
    }
  },

  click() {
    playTone(750, 0.04, "triangle", 0.04);
  },

  footstep() {
    playTone(130, 0.03, "sine", 0.02);
  },

  openWindow() {
    playTone(523.25, 0.05, "triangle", 0.05);
    playTone(659.25, 0.08, "triangle", 0.05, 0.05);
  },

  closeWindow() {
    playTone(659.25, 0.05, "triangle", 0.05);
    playTone(523.25, 0.08, "triangle", 0.05, 0.05);
  },

  bootPC() {
    playTone(260, 0.08, "triangle", 0.05, 0);
    playTone(390, 0.12, "triangle", 0.05, 0.08);
    playTone(520, 0.20, "triangle", 0.05, 0.20);
  },

  powerOnPhone() {
    playTone(523, 0.06, "sine", 0.05, 0);
    playTone(659, 0.10, "sine", 0.05, 0.06);
  },

  powerOff() {
    playTone(440, 0.05, "sine", 0.05, 0);
    playTone(220, 0.10, "sine", 0.05, 0.05);
  },

  openFolder() {
    playTone(500, 0.04, "triangle", 0.04);
    playTone(700, 0.06, "triangle", 0.04, 0.04);
  },

  notification() {
    playTone(523, 0.08, "sine", 0.06);
    playTone(659, 0.12, "sine", 0.06, 0.08);
  },

  startAmbient() {
    // Legacy stub
  },

  interact() {
    playTone(440, 0.04, "triangle", 0.04);
    playTone(550, 0.06, "triangle", 0.04, 0.04);
  },
};
