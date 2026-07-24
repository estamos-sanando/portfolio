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

  // Device Power State
  isPcOn: boolean;
  isPhoneOn: boolean;

  // Game Guide Modal
  showGuideModal: boolean;
  isGuideDocked: boolean;
  hasSeenGuide: boolean;

  // Quests & Character Unlocks
  visitedPhone: boolean;
  visitedPC: boolean;
  visitedDoor: boolean;
  dogUnlocked: boolean;
  activeCharacter: "antonella" | "dog";
  showQuestModal: boolean;
  showUnlockBanner: boolean;

  // Actions
  setLoading: (loading: boolean) => void;
  setLoadProgress: (progress: number) => void;
  startGame: () => void;
  toggleMute: () => void;
  togglePcPower: () => void;
  togglePhonePower: () => void;
  setPcPower: (on: boolean) => void;
  setPhonePower: (on: boolean) => void;
  openGuideModal: () => void;
  closeGuideModal: () => void;
  toggleGuideModal: () => void;
  openQuestModal: () => void;
  closeQuestModal: () => void;
  toggleQuestModal: () => void;
  dismissUnlockBanner: () => void;
  setActiveCharacter: (char: "antonella" | "dog") => void;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  setActiveWindow: (id: WindowId) => void;
  setNearObject: (obj: InteractableObject) => void;
  setCurrentPhoneApp: (app: string | null) => void;
  openDesktopWindow: (id: string) => void;
  closeDesktopWindow: (id: string) => void;
  closeAllWindows: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  isLoading: true,
  loadProgress: 0,
  gameStarted: false,
  isMuted: false,
  isPcOn: false,
  isPhoneOn: false,
  showGuideModal: true,
  isGuideDocked: false,
  hasSeenGuide: false,
  openWindows: [],
  activeWindow: null,
  nearObject: null,
  showHint: false,
  currentPhoneApp: null,
  desktopOpenWindows: [],

  // Quests initial values
  visitedPhone: false,
  visitedPC: false,
  visitedDoor: false,
  dogUnlocked: false,
  activeCharacter: "antonella" as "antonella" | "dog",
  showQuestModal: false,
  showUnlockBanner: false,

  setLoading: (loading) => set({ isLoading: loading }),
  setLoadProgress: (progress) => set({ loadProgress: progress }),

  startGame: () =>
    set((state) => ({
      isLoading: false,
      gameStarted: true,
      showGuideModal: !state.hasSeenGuide,
    })),

  openGuideModal: () => set({ showGuideModal: true }),

  closeGuideModal: () =>
    set({
      showGuideModal: false,
      isGuideDocked: true,
      hasSeenGuide: true,
    }),

  toggleGuideModal: () =>
    set((state) => ({
      showGuideModal: !state.showGuideModal,
      isGuideDocked: state.showGuideModal,
      hasSeenGuide: true,
    })),

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  togglePcPower: () =>
    set((state) => {
      const nextState = !state.isPcOn;
      if (!nextState) {
        // If turning OFF, close computer and desktop OS windows
        const filteredWindows = state.openWindows.filter(
          (w) => w !== "computer" && w !== "desktop_os"
        );
        return {
          isPcOn: false,
          openWindows: filteredWindows,
          activeWindow:
            state.activeWindow === "computer" || state.activeWindow === "desktop_os"
              ? filteredWindows[filteredWindows.length - 1] ?? null
              : state.activeWindow,
          desktopOpenWindows: [],
        };
      }
      return { isPcOn: true };
    }),

  togglePhonePower: () =>
    set((state) => {
      const nextState = !state.isPhoneOn;
      if (!nextState) {
        // If turning OFF, close phone window
        const filteredWindows = state.openWindows.filter((w) => w !== "phone");
        return {
          isPhoneOn: false,
          openWindows: filteredWindows,
          activeWindow:
            state.activeWindow === "phone"
              ? filteredWindows[filteredWindows.length - 1] ?? null
              : state.activeWindow,
          currentPhoneApp: null,
        };
      }
      return { isPhoneOn: true };
    }),

  setPcPower: (on) =>
    set((state) => {
      if (!on) {
        const filteredWindows = state.openWindows.filter(
          (w) => w !== "computer" && w !== "desktop_os"
        );
        return {
          isPcOn: false,
          openWindows: filteredWindows,
          activeWindow:
            state.activeWindow === "computer" || state.activeWindow === "desktop_os"
              ? filteredWindows[filteredWindows.length - 1] ?? null
              : state.activeWindow,
          desktopOpenWindows: [],
        };
      }
      return { isPcOn: true };
    }),

  setPhonePower: (on) =>
    set((state) => {
      if (!on) {
        const filteredWindows = state.openWindows.filter((w) => w !== "phone");
        return {
          isPhoneOn: false,
          openWindows: filteredWindows,
          activeWindow:
            state.activeWindow === "phone"
              ? filteredWindows[filteredWindows.length - 1] ?? null
              : state.activeWindow,
          currentPhoneApp: null,
        };
      }
      return { isPhoneOn: true };
    }),

  openQuestModal: () => set({ showQuestModal: true }),
  closeQuestModal: () => set({ showQuestModal: false }),
  toggleQuestModal: () => set((s) => ({ showQuestModal: !s.showQuestModal })),
  dismissUnlockBanner: () => set({ showUnlockBanner: false }),

  setActiveCharacter: (char) => set({ activeCharacter: char }),

  openWindow: (id) =>
    set((state) => {
      const nextOpenWindows = state.openWindows.includes(id)
        ? state.openWindows
        : [...state.openWindows, id];

      // Update visited checkpoints
      let vPhone = state.visitedPhone;
      let vPC = state.visitedPC;
      let vDoor = state.visitedDoor;

      if (id === "phone") vPhone = true;
      if (id === "computer" || id === "desktop_os") vPC = true;
      if (id === "door" || id === "contacto") vDoor = true;

      const allCompleted = vPhone && vPC && vDoor;
      const justUnlocked = allCompleted && !state.dogUnlocked;

      return {
        openWindows: nextOpenWindows,
        activeWindow: id,
        visitedPhone: vPhone,
        visitedPC: vPC,
        visitedDoor: vDoor,
        dogUnlocked: state.dogUnlocked || allCompleted,
        showUnlockBanner: state.showUnlockBanner || justUnlocked,
        showQuestModal: justUnlocked ? true : state.showQuestModal,
      };
    }),

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
