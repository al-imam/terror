"use client"

import { useEffect } from "react"
import Lenis from "@studio-freight/lenis"

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    })

    const raf: FrameRequestCallback = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return null
}
