import { useSurvivorStore } from "@lootsurvivor/core";

export const useSurvivorState = () => {
  const { survivor } = useSurvivorStore.getState();

  return { survivor };
};
