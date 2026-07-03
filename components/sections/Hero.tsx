'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/* ─── Count-up hook ──────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1400, delay = 0) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0
      const frames = Math.round(duration / 16)
      const step = target / frames
      const timer = setInterval(() => {
        start += step
        if (start >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }, delay)
    return () => clearTimeout(timeout)
  }, [target, duration, delay])
  return count
}

const STATS = [
  { display: (n: number) => `${n}+`,  target: 10,  label: 'Años de Experiencia', delay: 1500 },
  { display: (n: number) => `${n}K+`, target: 5,   label: 'Uniformes Entregados', delay: 1600 },
  { display: (n: number) => `${n}%`,  target: 98,  label: 'Satisfacción',          delay: 1700 },
  { display: (n: number) => `${n}%`,  target: 100, label: 'Colombiano',             delay: 1800 },
]

function StatItem({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const count = useCountUp(stat.target, 1200, stat.delay)
  return (
    <div
      className="flex flex-col px-8 lg:px-12 py-7 group"
      style={index >= 2 ? { borderTop: '1px solid var(--border)' } : {}}
    >
      <span
        className="font-display text-text-primary leading-none tabular-nums"
        style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1 }}
      >
        {stat.display(count)}
      </span>
      <span
        className="font-body text-text-subtle uppercase mt-2"
        style={{ fontSize: '0.6rem', letterSpacing: '0.16em' }}
      >
        {stat.label}
      </span>
    </div>
  )
}

function HeroWord({ children, delay }: { children: string; delay: number }) {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-bg-primary flex flex-col overflow-hidden"
    >
      {/* ── Accent line top-left ──────────────────────────────────── */}
      <motion.div
        className="absolute top-0 left-0 h-0.5 bg-accent"
        initial={{ width: 0 }}
        animate={{ width: '200px' }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ── Ambient radial pulse ──────────────────────────────────── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '30%', right: '-10%',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(204,0,0,0.07) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Massive decorative background numeral ─────────────────── */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 font-display
          text-bg-surface-2 select-none pointer-events-none leading-none"
        style={{ fontSize: 'clamp(18rem, 30vw, 34rem)', opacity: 0.35 }}
      >
        10
      </div>

      {/* ── Main hero content ─────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 lg:px-16 pt-28 pb-12">

        {/* Tag line */}
        <motion.p
          className="font-body text-accent uppercase mb-6"
          style={{ fontSize: '0.75rem', letterSpacing: '0.22em' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          Colombia · Uniformes Deportivos de Alto Rendimiento
        </motion.p>

        {/* Hero headline */}
        <div className="max-w-5xl overflow-hidden">
          <h1
            className="font-display text-text-primary leading-none"
            style={{ fontSize: 'clamp(4.5rem, 11vw, 10rem)', lineHeight: 0.88 }}
          >
            <div className="overflow-hidden">
              <HeroWord delay={0.5}>VISTE&nbsp;</HeroWord>
              <HeroWord delay={0.6}>AL</HeroWord>
            </div>
            <div className="overflow-hidden" style={{ color: 'var(--accent)' }}>
              <HeroWord delay={0.7}>CAMPEÓN</HeroWord>
            </div>
            <div className="overflow-hidden">
              <HeroWord delay={0.8}>QUE&nbsp;</HeroWord>
              <HeroWord delay={0.85}>HAY&nbsp;</HeroWord>
              <HeroWord delay={0.9}>EN TI</HeroWord>
            </div>
          </h1>
        </div>

        {/* Sub-copy */}
        <motion.p
          className="font-body text-text-muted mt-8 max-w-md"
          style={{ fontSize: '0.95rem', lineHeight: 1.75 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          Fabricamos uniformes deportivos con materiales técnicos de primera calidad.
          Diseño personalizado, producción en Colombia.
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="flex flex-wrap items-center gap-6 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#productos"
            className="group relative inline-flex items-center gap-3 bg-accent text-white
              px-8 py-4 font-body font-semibold uppercase clip-button
              transition-all duration-300 hover:bg-accent-hover hover:scale-105"
            style={{ fontSize: '0.85rem', letterSpacing: '0.1em' }}
          >
            Ver Colección
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <span className="font-body text-text-subtle" style={{ fontSize: '0.8rem' }}>
            +500 equipos equipados en Colombia
          </span>
        </motion.div>
      </div>

      {/* ── Stats bar with count-up ──────────────────────────────── */}
      <motion.div
        className="relative z-10 border-t border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
