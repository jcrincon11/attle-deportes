'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

// Expose Lenis globally so components can programmatically scroll
export let lenisInstance: Lenis | null = null

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      // Exponential deceleration — creates the "superfluid" feel
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      infinite: false,
    })

    lenisInstance = lenis

    function raf(time: number) {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }

    rafRef.current = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafRef.current)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  return <>{children}</>
}
