"use client";

import { useEffect, type RefObject } from "react";

export function useOutsideClick<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  callback: () => void,
  exceptions: RefObject<HTMLElement | null>[] = [],
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    function handleClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      const clickedInsideContainer = containerRef.current?.contains(target);
      const clickedException = exceptions.some((exception) =>
        exception.current?.contains(target),
      );

      if (!clickedInsideContainer && !clickedException) {
        callback();
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [callback, containerRef, enabled, exceptions]);
}
