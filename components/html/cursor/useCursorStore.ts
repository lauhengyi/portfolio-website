import { create } from 'zustand';

type CursorType = 'default' | 'home' | 'about' | 'work' | 'contact';

type CursorState = {
  cursorType: CursorType;
  setCursorType: (CursorType: CursorType) => void;
};

const useCursorStore = create<CursorState>()((set) => ({
  cursorType: 'default',
  setCursorType: (cursorType: CursorType) => set({ cursorType }),
}));

export type { CursorType };
export default useCursorStore;
