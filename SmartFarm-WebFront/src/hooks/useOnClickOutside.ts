import React, { useEffect } from "react";

type Props<T> = {
  ref: React.RefObject<T>;
  func: () => void;
};

export default function useOnClickOutside<T extends HTMLElement>({
  ref,
  func,
}: Props<T>) {
  useEffect(() => {
    // @FIX any 타입 변경
    const listener = (e: any) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      func();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, func]);
}
