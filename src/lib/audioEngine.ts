/**
 * Audio Engine — Web Audio API synthesizer
 * Cozy Tango & Jazz Lounge Style Synthesized Background Music
 */

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let masterFilter: BiquadFilterNode | null = null;
let isMuted = false;

function getCtx(): { ctx: AudioContext; master: GainNode } {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Warm Lowpass Filter for smooth Jazz/Tango tone
    masterFilter = audioCtx.createBiquadFilter();
    masterFilter.type = "lowpass";
    masterFilter.frequency.value = 3200;

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
    const attackTime = Math.min(0.02, duration * 0.2);
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

// Sophisticated Tango & Jazz Lounge Melody (A Minor / E7 / Dm6 Progression)
const tangoMelody = [
  // Measure 1: Am (Tango passion)
  440.00, 523.25, 493.88, 440.00, 415.30, 440.00, 523.25, 659.25,
  // Measure 2: Dm6 (Jazz lounge tension)
  587.33, 523.25, 493.88, 440.00, 392.00, 440.00, 523.25, 587.33,
  // Measure 3: E7 (Tango cadence)
  659.25, 587.33, 523.25, 493.88, 415.30, 493.88, 523.25, 587.33,
  // Measure 4: Am (Resolution)
  440.00, 415.30, 440.00, 523.25, 659.25, 523.25, 440.00, 330.00,
];

const tangoBass = [
  // A2, E2, D2, E2 (Walking Tango/Jazz Bassline)
  110.00, 164.81, 146.83, 164.81,
  110.00, 164.81, 146.83, 164.81,
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
        const idx = bgMusicStep % tangoMelody.length;
        const melodyNote = tangoMelody[idx];

        // Tango/Jazz Lead Melody (Soft Sine / Warm Tone)
        playTone(melodyNote, 0.28, "sine", 0.022);

        // Walking Tango/Jazz Bassline every 2 steps
        if (bgMusicStep % 2 === 0) {
          const bassIdx = Math.floor((bgMusicStep / 2) % tangoBass.length);
          const bassNote = tangoBass[bassIdx];
          playTone(bassNote, 0.42, "sine", 0.035);
        }

        bgMusicStep++;
      } catch (e) {}
    }, 310); // Relaxed Tango / Jazz 108 BPM Tempo!
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
    playTone(440, 0.05, "sine", 0.05);
    playTone(554.37, 0.08, "sine", 0.05, 0.05);
  },

  closeWindow() {
    playTone(554.37, 0.05, "sine", 0.05);
    playTone(440, 0.08, "sine", 0.05, 0.05);
  },

  bootPC() {
    playTone(220, 0.1, "sine", 0.05, 0);
    playTone(330, 0.15, "sine", 0.05, 0.08);
    playTone(440, 0.25, "sine", 0.05, 0.20);
  },

  powerOnPhone() {
    playTone(440, 0.08, "sine", 0.05, 0);
    playTone(554.37, 0.12, "sine", 0.05, 0.06);
  },

  powerOff() {
    playTone(440, 0.05, "sine", 0.05, 0);
    playTone(220, 0.10, "sine", 0.05, 0.05);
  },

  openFolder() {
    playTone(440, 0.04, "sine", 0.04);
    playTone(554.37, 0.06, "sine", 0.04, 0.04);
  },

  notification() {
    playTone(440, 0.08, "sine", 0.06);
    playTone(554.37, 0.12, "sine", 0.06, 0.08);
  },

  startAmbient() {
    // Legacy stub
  },

  interact() {
    playTone(440, 0.04, "sine", 0.04);
    playTone(554.37, 0.06, "sine", 0.04, 0.04);
  },
};
