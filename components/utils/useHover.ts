import useCursorStore, { CursorType } from '../html/cursor/useCursorStore';

export default function useHover(name: CursorType) {
  const setCursorType = useCursorStore((state) => state.setCursorType);
  return {
    handleOnMouseEnter: () => {
      setCursorType(name);
    },
    handleOnMouseLeave: () => {
      setCursorType('default');
    },
  };
}
