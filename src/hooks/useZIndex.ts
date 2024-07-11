import { useEffect, useState } from "react";
import { create } from "zustand";

export const useZIndex = (isOpen: boolean = true) => {
  const { pushStack, popStack, getCurrentZIndex } = useZIndexStore();

  const [layoutIndex, setLayoutIndex] = useState(0);
  const zIndex = getCurrentZIndex(layoutIndex);

  useEffect(() => {
    const index = pushStack();
    setLayoutIndex(index);

    return popStack;
  }, [isOpen]);

  return { zIndex, layoutIndex, pushStack, popStack, getCurrentZIndex };
};

type ZIndexState = {
  defaultZIndex: number;
  defaultZIndexStep: number;
  stackCount: number;
  pushStack: () => number;
  popStack: () => void;
  getCurrentZIndex: (index: number) => number;
};

const useZIndexStore = create<ZIndexState>((set, get) => ({
  defaultZIndex: 1000,
  defaultZIndexStep: 100,
  stackCount: 0,
  pushStack: () => {
    set((state) => ({ stackCount: state.stackCount + 1 }));
    const state = get();
    return state.stackCount;
  },
  popStack: () => {
    set((state) => ({ stackCount: Math.max(0, state.stackCount - 1) }));
  },
  getCurrentZIndex: (index: number) => {
    const state = get();
    return state.defaultZIndex + state.defaultZIndexStep * index;
  },
}));
