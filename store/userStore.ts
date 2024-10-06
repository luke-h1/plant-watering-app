import { create } from "zustand";

interface UserState {
  hasFinishedOnboarding: boolean;
  toggleHasOnboarded: () => void;
}

const useUserStore = create<UserState>((set) => ({
  hasFinishedOnboarding: false,
  toggleHasOnboarded: () => {
    set((state) => {
      return {
        ...state,
        hasFinishedOnboarding: !state.hasFinishedOnboarding,
      };
    });
  },
}));
export default useUserStore;
