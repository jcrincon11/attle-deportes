'use client'

import Image from 'next/image'
import { useReducedMotion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import FadeUp from '@/components/animations/FadeUp'

interface ShowcaseItem {
  title: string
  sub: string
  category: string
  accent: string
  bg: string
  imageSrc: string
}

const ITEMS: ShowcaseItem[] = [
  {
    title:    'Clubes FPC',
    sub:      'Liga BetPlay · 2024–25',
    category: 'Fútbol',
    accent:   '#CC0000',
    bg:       'radial-gradient(ellipse 80% 65% at 25% 20%, #4D0000 0%, #0a0a0a 72%)',
    imageSrc: '/images/showcase/img1.jpg',
  },
  {
    title:    'Selección Bogotá',
    sub:      'Sub-20 · Torneo Nacional',
    category: 'Fútbol',
    accent:   '#4DFFB4',
    bg:       'radial-gradient(ellipse 80% 65% at 75% 25%, #003320 0%, #0a0a0a 72%)',
    imageSrc: '/images/showcase/img2.jpg',
  },
  {
    title:    'Dotación Corporativa',
    sub:      'Empresarial · Premium',
    category: 'Dotación',
    accent:   '#C084FC',
    bg:       'radial-gradient(ellipse 80% 65% at 30% 25%, #1A0D33 0%, #0a0a0a 72%)',
    imageSrc: '/images/showcase/img4.jpg',
  },
  {
    title:    'Liga de Fútbol Sala',
    sub:      'Nacional · Amateur & Pro',
    category: 'Fútbol Sala',
    accent:   '#FB923C',
    bg:       'radial-gradient(ellipse 80% 65% at 70% 20%, #33120D 0%, #0a0a0a 72%)',
    imageSrc: '/images/showcase/img5.jpg',
  },
]

const CARD_W  = 310
const GAP     = 20
const STRIDE  = CARD_W + GAP
const TOTAL_W = ITEMS.length * STRIDE

/* ─── Card ────────────────────────────────────────────────────────── */
function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      className="relative flex-shrink-0 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width:        CARD_W,
        height:       440,
        marginRight:  GAP,
        borderRadius: '2px',
        border:       `1px solid ${hovered ? item.accent + '55' : 'var(--border)'}`,
        transform:    hovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        transition:   'transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s',
        cursor:       'default',
      }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0" style={{ background: item.bg }} />

      {/* Real photo */}
      <Image
        src={item.imageSrc}
        alt={item.title}
        fill
        sizes={`${CARD_W}px`}
        className="object-cover"
        style={{
          opacity: hovered ? 0.72 : 0.55,
          mixBlendMode: 'luminosity',
          transition: 'opacity 0.4s ease',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}
        onError={() => { /* silently falls back to gradient */ }}
      />

      {/* Diagonal stripe texture */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, white 0, white 1px, transparent 1px, transparent 44px)',
          opacity: 0.028,
        }}
      />

      {/* Top-left accent line */}
      <div
        className="absolute top-0 left-0 h-0.5 transition-all duration-500"
        style={{
          background: item.accent,
          width: hovered ? '80px' : '56px',
        }}
      />

      {/* Large watermark letter */}
      <span
        aria-hidden
        className="absolute top-5 left-7 font-display select-none pointer-events-none"
        style={{
          fontSize:   '9rem',
          lineHeight: 1,
          color:      `${item.accent}08`,
          textShadow: `0 0 90px ${item.accent}22`,
        }}
      >
        {item.category[0]}
      </span>

      {/* ── Frosted-glass info panel ──────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 p-6"
        style={{
          background:           `rgba(4, 4, 4, ${hovered ? 0.85 : 0.75})`,
          backdropFilter:       'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderTop:            `1px solid ${item.accent}${hovered ? '55' : '28'}`,
          transition:           'background 0.3s, border-color 0.3s',
        }}
      >
        {/* Category badge */}
        <span
          className="inline-block font-body uppercase mb-3"
          style={{
            fontSize:      '0.58rem',
            letterSpacing: '0.18em',
            color:         item.accent,
            background:    `${item.accent}18`,
            border:        `1px solid ${item.accent}38`,
            padding:       '2px 8px',
          }}
        >
          {item.category}
        </span>

        <h3
          className="font-display text-white leading-none"
          style={{ fontSize: '1.3rem' }}
        >
          {item.title}
        </h3>

        <p
          className="font-body text-text-muted mt-1.5"
          style={{ fontSize: '0.72rem', letterSpacing: '0.03em' }}
        >
          {item.sub}
        </p>

        {/* Accent gradient underline */}
        <div
          className="mt-4 h-px transition-all duration-500"
          style={{
            background: `linear-gradient(to right, ${item.accent}90, transparent)`,
            width: hovered ? '100%' : '70%',
          }}
        />
      </div>
    </article>
  )
}

/* ─── Carousel ────────────────────────────────────────────────────── */
export default function ShowcaseCarousel() {
  const prefersReduced = useReducedMotion()
  const [isPaused, setIsPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const doubled = [...ITEMS, ...ITEMS]

  /* CSS animation approach — pause state is preserved without position reset */
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.style.animationPlayState = isPaused ? 'paused' : 'running'
  }, [isPaused])

  return (
    <div className="mt-24">
      <FadeUp>
        <div className="mb-12">
          <span
            className="font-body text-accent uppercase"
            style={{ fontSize: '0.72rem', letterSpacing: '0.22em' }}
          >
            Vitrina de Clientes
          </span>
          <h2
            className="font-display text-text-primary mt-2 leading-none"
            style={{
              fontSize:      'clamp(2.4rem, 5vw, 4.2rem)',
              letterSpacing: '-0.01em',
              lineHeight:    0.9,
            }}
          >
            EQUIPOS QUE<br />
            <span style={{ color: 'var(--accent)' }}>CONFÍAN EN NOSOTROS</span>
          </h2>
        </div>
      </FadeUp>

      {/* ── Carousel track ─────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={trackRef}
          className="flex carousel-track"
          style={prefersReduced ? undefined : {
            animation: `carouselScroll 40s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {doubled.map((item, i) => (
            <ShowcaseCard key={i} item={item} />
          ))}
        </div>

        {/* Edge fades */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--bg-primary), transparent)' }}
        />
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--bg-primary), transparent)' }}
        />

        {/* Pause indicator */}
        {isPaused && (
          <div
            className="absolute top-4 right-28 z-20 font-body uppercase pointer-events-none"
            style={{
              fontSize: '0.56rem',
              letterSpacing: '0.18em',
              color: 'var(--text-subtle)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              padding: '3px 10px',
            }}
          >
            Pausado
          </div>
        )}
      </div>
    </div>
  )
}
