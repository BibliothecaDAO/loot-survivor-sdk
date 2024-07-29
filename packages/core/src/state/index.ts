// Idea here is to create a store that will hold the game all the current playing game state. That is, the current adventurer, beast, battle, and last discovery.

// When updates happen to any of these, the store will be updated and the UI will be updated accordingly.

// You just have to call the updateGameState function with the new state and the store will be updated.

import { createStore } from "zustand/vanilla";
import { devtools } from "zustand/middleware";

import { Survivor } from "../objects/survivor";

export interface SurvivorStore {
  survivor: Survivor | null;
  updateSurvivor: (updates: Survivor) => void;
  clearSurvivor: () => void;
  newSurvivor: () => void;
}

export const useSurvivorStore = createStore<SurvivorStore>()(
  devtools(
    (set) => ({
      survivor: null,
      newSurvivor: () => {
        set(() => {
          return { survivor: new Survivor() };
        });
      },
      clearSurvivor: () => set({ survivor: null }),
      updateSurvivor: (survivor: Survivor) =>
        set(() => {
          return { survivor };
        }),
    }),
    { name: "Survivor Store" }
  )
);
