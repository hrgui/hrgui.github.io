import { RefObject, useEffect, useState } from "preact/hooks";

export function useTransitionEnd(elementRef: RefObject<Element>) {
  const [transitionEnded, setTransitionEnded] = useState(false);
  function handleTransitionStart() {
    setTransitionEnded(false);
  }
  function handleTransitionEnd() {
    setTransitionEnded(true);
  }
  useEffect(() => {
    const el = elementRef?.current;
    el?.addEventListener("transitionstart", handleTransitionStart);
    el?.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      el?.removeEventListener("transitionstart", handleTransitionStart);
      el?.removeEventListener("transitionend", handleTransitionEnd);
    };
  });

  return transitionEnded;
}
