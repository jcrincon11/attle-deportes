'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

interface FadeUpProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  /** once=true means the animation only plays once (recommended for performance) */
  once?: boolean
}

/**
 * FadeUp — wraps any content in a scroll-triggered "fade in from below" reveal.
 * Uses framer-motion's useInView for efficient IntersectionObserver integration.
 *
 * Usage:
 *   <FadeUp delay={0.2}>
 *     <YourComponent />
 *   </FadeUp>
 */
export default function FadeUp({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  once = true,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  // margin: "-10%" means the animation starts when 10% of the element is visible
  const isInView = useInView(ref, { once, margin: '-10% 0px -10% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom expo-out — matches the Lenis feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
