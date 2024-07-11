import { useEffect, useState } from "react";
import { create } from "zustand";

export const useZIndex = (isOpen: boolean) => {
  const { addCount, removeCount, getCurrentZIndex } = useZIndexStore();

  const [layoutIndex, setLayoutIndex] = useState(0);
  const zIndex = getCurrentZIndex(layoutIndex);

  useEffect(() => {
    const index = addCount();
    setLayoutIndex(index);

    return removeCount;
  }, [isOpen]);

  return { zIndex, layoutIndex, addCount, removeCount, getCurrentZIndex };
};

type ZIndexState = {
  defaultZIndex: number;
  defaultZIndexStep: number;
  count: number;
  addCount: () => number;
  removeCount: () => void;
  getCurrentZIndex: (index: number) => number;
};

const useZIndexStore = create<ZIndexState>((set, get) => ({
  defaultZIndex: 1000,
  defaultZIndexStep: 100,
  count: 0,
  addCount: () => {
    set((state) => ({ count: state.count + 1 }));
    const state = get();
    return state.count;
  },
  removeCount: () => {
    set((state) => ({ count: Math.max(0, state.count - 1) }));
  },
  getCurrentZIndex: (index: number) => {
    const state = get();

    return state.defaultZIndex + state.defaultZIndexStep * index;
  },
}));
