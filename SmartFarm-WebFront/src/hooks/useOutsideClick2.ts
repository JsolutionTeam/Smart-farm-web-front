import React, { useEffect } from "react";

type Props<T> = {
  elements: {
    ref: React.RefObject<T>;
    isVisible: boolean;
    func: () => void;
  }[];
};

const useOutsideClick = <T extends HTMLElement>({ elements }: Props<T>) => {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      elements.forEach((element) => {
        const { ref, isVisible, func } = element;

        if (!isVisible) return;

        if (!ref.current || ref.current.contains(e.target as Node)) {
          return;
        }
        func();
      });
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [elements]);
};

export default useOutsideClick;
