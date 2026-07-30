/**
 * Audio Engine — Web Audio API synthesizer
 * No external audio files required. All sounds are synthesized.
 */

let audioCtx: AudioContext | null = null;
let isMuted = false;
let noiseBuffer: AudioBuffer | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function getNoiseBuffer(ctx: AudioContext): AudioBuffer {
  if (!noiseBuffer) {
    const bufferSize = ctx.sampleRate * 0.2; // 200ms noise buffer
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
  type: OscillatorType = "square",
  gainValue = 0.15,
  delay = 0
): void {
  if (isMuted) return;
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);

    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(gainValue, ctx.currentTime + delay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  } catch (e) {
    // Silently fail if audio is not available
  }
}

function playNoise(duration: number, gainValue = 0.05, delay = 0): void {
  if (isMuted) return;
  try {
    const ctx = getCtx();
    const buffer = getNoiseBuffer(ctx);
    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(gainValue, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

    source.connect(gain);
    gain.connect(ctx.destination);
    source.start(ctx.currentTime + delay);
  } catch (e) {}
}

let bgMusicInterval: any = null;
let bgMusicStep = 0;

// Gentle Cmaj7 -> Am7 -> Fmaj7 -> G6 chord arpeggios
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
        playTone(note, 0.4, "sine", 0.022);
        if (bgMusicStep % 4 === 0) {
          playTone(note / 2, 0.7, "sine", 0.03);
        }
        bgMusicStep++;
      } catch (e) {}
    }, 480);
  },

  stopBackgroundMusic() {
    if (bgMusicInterval) {
      clearInterval(bgMusicInterval);
      bgMusicInterval = null;
    }
  },

  click() {
    playTone(800, 0.05, "square", 0.08);
  },

  footstep() {
    playNoise(0.05, 0.04);
    playTone(120, 0.04, "sawtooth", 0.06, 0.01);
  },

  openWindow() {
    playTone(440, 0.05, "square", 0.1);
    playTone(660, 0.08, "square", 0.1, 0.05);
    playTone(880, 0.12, "square", 0.08, 0.1);
  },

  closeWindow() {
    playTone(880, 0.05, "square", 0.08);
    playTone(660, 0.05, "square", 0.08, 0.05);
    playTone(440, 0.1, "square", 0.06, 0.1);
  },

  bootPC() {
    playNoise(0.1, 0.08);
    playTone(130, 0.1, "sawtooth", 0.1, 0.1);
    playTone(195, 0.1, "sawtooth", 0.1, 0.2);
    playTone(260, 0.1, "sawtooth", 0.1, 0.3);
    playTone(390, 0.2, "sawtooth", 0.12, 0.4);
    playTone(520, 0.3, "square", 0.1, 0.6);
    playTone(440, 0.4, "sine", 0.08, 0.9);
  },

  powerOnPhone() {
    playTone(523, 0.08, "sine", 0.1, 0);
    playTone(659, 0.08, "sine", 0.1, 0.08);
    playTone(880, 0.15, "sine", 0.12, 0.16);
  },

  powerOff() {
    playTone(440, 0.06, "square", 0.08, 0);
    playTone(330, 0.06, "square", 0.08, 0.06);
    playTone(220, 0.12, "sawtooth", 0.1, 0.12);
  },

  openFolder() {
    playTone(600, 0.04, "square", 0.08);
    playTone(800, 0.06, "square", 0.06, 0.04);
  },

  notification() {
    playTone(523, 0.1, "sine", 0.12);
    playTone(659, 0.1, "sine", 0.12, 0.1);
    playTone(784, 0.2, "sine", 0.1, 0.2);
  },

  startAmbient() {
    if (isMuted) return;
    const loop = () => {
      if (isMuted) return;
      playNoise(2, 0.005);
      setTimeout(loop, 1800);
    };
    setTimeout(loop, 500);
  },

  interact() {
    playTone(440, 0.03, "square", 0.06);
    playTone(550, 0.06, "square", 0.05, 0.03);
  },
};
