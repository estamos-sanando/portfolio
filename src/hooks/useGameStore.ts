import { create } from "zustand";

export type WindowId =
  | "phone"
  | "computer"
  | "sobremi"
  | "experiencia"
  | "habilidades"
  | "contacto"
  | "desktop_os"
  | "aplicaciones"
  | "estamos_sanando"
  | "spot_publicitario"
  | "creacion_contenido"
  | "despues"
  | "chequeate"
  | "tercera_app"
  | "door"
  | null;

export type InteractableObject =
  | "phone"
  | "computer"
  | "door"
  | "player"
  | "radio"
  | null;

interface GameState {
  // Loading
  isLoading: boolean;
  loadProgress: number;
  gameStarted: boolean;

  // Audio
  isMuted: boolean;

  // Windows
  openWindows: WindowId[];
  activeWindow: WindowId;

  // Interaction
  nearObject: InteractableObject;
  showHint: boolean;

  // Phone state
  currentPhoneApp: string | null;

  // Desktop OS state
  desktopOpenWindows: string[];

  // Actions
  setLoading: (loading: boolean) => void;
  setLoadProgress: (progress: number) => void;
  startGame: () => void;
  toggleMute: () => void;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  setActiveWindow: (id: WindowId) => void;
  setNearObject: (obj: InteractableObject) => void;
  setCurrentPhoneApp: (app: string | null) => void;
  openDesktopWindow: (id: string) => void;
  closeDesktopWindow: (id: string) => void;
  closeAllWindows: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  isLoading: true,
  loadProgress: 0,
  gameStarted: false,
  isMuted: false,
  openWindows: [],
  activeWindow: null,
  nearObject: null,
  showHint: false,
  currentPhoneApp: null,
  desktopOpenWindows: [],

  setLoading: (loading) => set({ isLoading: loading }),
  setLoadProgress: (progress) => set({ loadProgress: progress }),

  startGame: () => set({ isLoading: false, gameStarted: true }),

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  openWindow: (id) =>
    set((state) => ({
      openWindows: state.openWindows.includes(id)
        ? state.openWindows
        : [...state.openWindows, id],
      activeWindow: id,
    })),

  closeWindow: (id) =>
    set((state) => ({
      openWindows: state.openWindows.filter((w) => w !== id),
      activeWindow:
        state.activeWindow === id
          ? state.openWindows[state.openWindows.length - 2] ?? null
          : state.activeWindow,
    })),

  setActiveWindow: (id) => set({ activeWindow: id }),

  setNearObject: (obj) =>
    set({ nearObject: obj, showHint: obj !== null }),

  setCurrentPhoneApp: (app) => set({ currentPhoneApp: app }),

  openDesktopWindow: (id) =>
    set((state) => ({
      desktopOpenWindows: state.desktopOpenWindows.includes(id)
        ? state.desktopOpenWindows
        : [...state.desktopOpenWindows, id],
    })),

  closeDesktopWindow: (id) =>
    set((state) => ({
      desktopOpenWindows: state.desktopOpenWindows.filter((w) => w !== id),
    })),

  closeAllWindows: () =>
    set({
      openWindows: [],
      activeWindow: null,
      desktopOpenWindows: [],
      currentPhoneApp: null,
    }),
}));
