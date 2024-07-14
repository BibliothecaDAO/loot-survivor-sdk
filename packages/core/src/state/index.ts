// Idea here is to create a store that will hold the game all the current playing game state. That is, the current adventurer, beast, battle, and last discovery.

// When updates happen to any of these, the store will be updated and the UI will be updated accordingly.

// You just have to call the updateState function with the new state and the store will be updated.

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { GameState } from "../type";

interface GameStateStore {
  gameState: Partial<GameState>;
  setGameState: (newState: Partial<GameState>) => void;
  updateGameState: (partialState: Partial<GameState>) => void;
}

export const useGameStateStore = create<GameStateStore>()(
  devtools(
    (set) => ({
      gameState: {},
      setGameState: (newState) => set({ gameState: newState }),
      updateGameState: (partialState) =>
        set((state) => ({
          gameState: { ...state.gameState, ...partialState },
        })),
    }),
    { name: "Game State Store" }
  )
);

export const updateState = (state: Partial<GameState>) => {
  if (state.adventurer) {
    useGameStateStore
      .getState()
      .updateGameState({ adventurer: state.adventurer });
  }
  if (state.beast) {
    useGameStateStore.getState().updateGameState({ beast: state.beast });
  }
  if (state.currentBattle) {
    useGameStateStore
      .getState()
      .updateGameState({ currentBattle: state.currentBattle });
  }
  if (state.lastDiscovery) {
    useGameStateStore
      .getState()
      .updateGameState({ lastDiscovery: state.lastDiscovery });
  }
};
