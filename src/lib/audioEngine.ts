/**
 * Audio Engine — Web Audio API synthesizer
 * Silky smooth, zero-clipping sound synthesizer & background music generator
 */

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let masterFilter: BiquadFilterNode | null = null;
let isMuted = false;
let noiseBuffer: AudioBuffer | null = null;

function getCtx(): { ctx: AudioContext; master: GainNode } {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Master filter to remove harsh digital clicks/pops
    masterFilter = audioCtx.createBiquadFilter();
    masterFilter.type = "lowpass";
    masterFilter.frequency.value = 3500;

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

function getNoiseBuffer(ctx: AudioContext): AudioBuffer {
  if (!noiseBuffer) {
    const bufferSize = ctx.sampleRate * 0.2;
    noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return noiseBuffer;
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

    // Smooth envelope with zero clicks
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

function playNoise(duration: number, gainValue = 0.03, delay = 0): void {
  if (isMuted) return;
  try {
    const { ctx, master } = getCtx();
    const buffer = getNoiseBuffer(ctx);
    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const gain = ctx.createGain();
    const startTime = ctx.currentTime + delay;
    const stopTime = startTime + duration;

    gain.gain.setValueAtTime(gainValue, startTime);
    gain.gain.linearRampToValueAtTime(0.0001, stopTime);

    source.connect(gain);
    gain.connect(master);
    source.start(startTime);
    source.stop(stopTime);
  } catch (e) {}
}

let bgMusicInterval: any = null;
let bgMusicStep = 0;

// Soft Cmaj7 -> Am7 -> Fmaj7 -> G6 chord arpeggios
const bgNotes = [
  // Cmaj7
  261.63, 329.63, 392.00, 493.88,
  // Am7
  220.00, 261.63, 329.63, 392.00,
  // Fmaj7
  174.61, 220.00, 261.63, 329.63,
  // G6
  196.00, 246.94, 293.66, 349.23,
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
        const note = bgNotes[bgMusicStep % bgNotes.length];
        playTone(note, 0.5, "sine", 0.015);
        if (bgMusicStep % 4 === 0) {
          playTone(note / 2, 0.8, "sine", 0.02);
        }
        bgMusicStep++;
      } catch (e) {}
    }, 550);
  },

  stopBackgroundMusic() {
    if (bgMusicInterval) {
      clearInterval(bgMusicInterval);
      bgMusicInterval = null;
    }
  },

  click() {
    playTone(600, 0.04, "sine", 0.05);
  },

  footstep() {
    playNoise(0.04, 0.02);
  },

  openWindow() {
    playTone(440, 0.05, "sine", 0.06);
    playTone(660, 0.08, "sine", 0.06, 0.05);
  },

  closeWindow() {
    playTone(660, 0.05, "sine", 0.06);
    playTone(440, 0.08, "sine", 0.06, 0.05);
  },

  bootPC() {
    playTone(260, 0.1, "sine", 0.06, 0);
    playTone(390, 0.15, "sine", 0.06, 0.1);
    playTone(520, 0.25, "sine", 0.06, 0.25);
  },

  powerOnPhone() {
    playTone(523, 0.08, "sine", 0.06, 0);
    playTone(659, 0.12, "sine", 0.06, 0.08);
  },

  powerOff() {
    playTone(440, 0.06, "sine", 0.06, 0);
    playTone(220, 0.12, "sine", 0.06, 0.06);
  },

  openFolder() {
    playTone(500, 0.04, "sine", 0.05);
    playTone(700, 0.06, "sine", 0.05, 0.04);
  },

  notification() {
    playTone(523, 0.08, "sine", 0.08);
    playTone(659, 0.12, "sine", 0.08, 0.08);
  },

  startAmbient() {
    // Legacy stub
  },

  interact() {
    playTone(440, 0.04, "sine", 0.05);
    playTone(550, 0.06, "sine", 0.05, 0.04);
  },
};
