import React, { useEffect } from "react";

type Props<T> = {
  ref: React.RefObject<T>;
  func: () => void;
};

const useOutsideClick = <T extends HTMLElement>({ ref, func }: Props<T>) => {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) {
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
  }, [func, ref]);
};

export default useOutsideClick;
