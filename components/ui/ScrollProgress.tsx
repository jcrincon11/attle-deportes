'use client'

import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] pointer-events-none"
      style={{ background: 'var(--bg-surface-2)' }}
    >
      <div
        className="h-full transition-none"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(to right, var(--accent), #FF4444)',
        }}
      />
    </div>
  )
}
