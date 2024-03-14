import { RefObject, useEffect } from "react";

export function useExternalClickHandler(ref: RefObject<HTMLElement> , callback: () => void) {
  useEffect(() => {
    function handleExternalClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleExternalClick);
    return (() => {
      document.removeEventListener("mousedown", handleExternalClick);
    });
  }, [ref, callback]);
}
