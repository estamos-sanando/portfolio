/**
 * Audio Engine — Web Audio API synthesizer
 * Upbeat, Cheerful Swing Jazz Style Synthesized Background Music
 */

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let masterFilter: BiquadFilterNode | null = null;
let isMuted = false;

function getCtx(): { ctx: AudioContext; master: GainNode } {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Bright & Warm Lowpass Filter for upbeat Jazz tone
    masterFilter = audioCtx.createBiquadFilter();
    masterFilter.type = "lowpass";
    masterFilter.frequency.value = 3800;

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

// Upbeat, Cheerful Swing Jazz Melody (C Major / G7 / Dm7 Swing Progression)
const happyJazzMelody = [
  // Measure 1: Cmaj7 (Bright & Cheerful)
  523.25, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33, 523.25,
  // Measure 2: Dm7 -> G7 (Bouncy Swing)
  587.33, 698.46, 880.00, 987.77, 880.00, 698.46, 659.25, 587.33,
  // Measure 3: E7 -> A7 (Jazz Sparkle)
  659.25, 783.99, 987.77, 1046.50, 987.77, 783.99, 659.25, 587.33,
  // Measure 4: Turnaround to C
  523.25, 659.25, 783.99, 880.00, 987.77, 880.00, 783.99, 659.25,
];

const happyJazzBass = [
  // Walking Swing Bassline (C3, E3, G3, A3, D3, F3, G3, B3)
  130.81, 164.81, 196.00, 220.00,
  146.83, 174.61, 196.00, 246.94,
];

export const audioEngine = {
  setMuted(muted: boolean) {
    isMuted = muted;
    if (masterGain && audioCtx) {
      masterGain.gain.setValueAtTime(muted ? 0.0001 : 0.7, audioCtx.currentTime);
    }
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
        const idx = bgMusicStep % happyJazzMelody.length;
        const melodyNote = happyJazzMelody[idx];

        // Happy Jazz Lead Melody (Soft Sine / Warm Synth Voice)
        playTone(melodyNote, 0.22, "sine", 0.024);

        // Walking Swing Bassline every 2 steps
        if (bgMusicStep % 2 === 0) {
          const bassIdx = Math.floor((bgMusicStep / 2) % happyJazzBass.length);
          const bassNote = happyJazzBass[bassIdx];
          playTone(bassNote, 0.35, "sine", 0.036);
        }

        bgMusicStep++;
      } catch (e) {}
    }, 235); // Cheerful Swing 128 BPM Tempo!
  },

  stopBackgroundMusic() {
    if (bgMusicInterval) {
      clearInterval(bgMusicInterval);
      bgMusicInterval = null;
    }
  },

  click() {
    playTone(600, 0.04, "sine", 0.04);
  },

  footstep() {
    playTone(120, 0.03, "sine", 0.02);
  },

  openWindow() {
    playTone(523.25, 0.05, "sine", 0.05);
    playTone(659.25, 0.08, "sine", 0.05, 0.05);
  },

  closeWindow() {
    playTone(659.25, 0.05, "sine", 0.05);
    playTone(523.25, 0.08, "sine", 0.05, 0.05);
  },

  bootPC() {
    playTone(260, 0.08, "sine", 0.05, 0);
    playTone(390, 0.12, "sine", 0.05, 0.08);
    playTone(520, 0.20, "sine", 0.05, 0.20);
  },

  powerOnPhone() {
    playTone(523.25, 0.06, "sine", 0.05, 0);
    playTone(659.25, 0.10, "sine", 0.05, 0.06);
  },

  powerOff() {
    playTone(440, 0.05, "sine", 0.05, 0);
    playTone(220, 0.10, "sine", 0.05, 0.05);
  },

  openFolder() {
    playTone(523.25, 0.04, "sine", 0.04);
    playTone(659.25, 0.06, "sine", 0.04, 0.04);
  },

  notification() {
    playTone(523.25, 0.08, "sine", 0.06);
    playTone(659.25, 0.12, "sine", 0.06, 0.08);
  },

  startAmbient() {
    // Legacy stub
  },

  interact() {
    playTone(523.25, 0.04, "sine", 0.04);
    playTone(659.25, 0.06, "sine", 0.04, 0.04);
  },
};
