import { RefObject, useEffect, useState } from "react"

export function useAnimationEnd(elementRef: RefObject<Element>) {
  const [animationEnded, setAnimationEnded] = useState(false)
  function handleAnimationStart() {
    setAnimationEnded(false)
  }
  function handleAnimationEnd() {
    setAnimationEnded(true)
  }
  useEffect(() => {
    const el = elementRef?.current
    el?.addEventListener("animationstart", handleAnimationStart)
    el?.addEventListener("animationend", handleAnimationEnd)

    return () => {
      el?.removeEventListener("animationstart", handleAnimationStart)
      el?.removeEventListener("animationend", handleAnimationEnd)
    }
  })

  return animationEnded
}
