'use client'

import { useState } from 'react'
import Image from 'next/image'

interface BentoCardProps {
  label: string
  description: string
  tag: string
  accentColor: string
  glowClass: string
  className?: string
  fabricBadges?: string[]
  imageSrc?: string
  onClick?: () => void
}

export default function BentoCard({
  label,
  description,
  tag,
  accentColor,
  glowClass,
  className = '',
  fabricBadges,
  imageSrc,
  onClick,
}: BentoCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`
        relative overflow-hidden cursor-pointer
        bg-bg-surface border border-border
        flex flex-col justify-end p-8 lg:p-10
        transition-all duration-500 ease-expo-out
        ${hovered ? 'border-border-hover scale-[1.015]' : 'scale-100'}
        ${glowClass}
        ${className}
      `}
      style={{ borderRadius: '2px' }}
    >
      {/* ── Product image — visible background ───────────────────── */}
      {imageSrc && (
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{ opacity: hovered ? 0.38 : 0.18 }}
        >
          <Image
            src={imageSrc}
            alt={label}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700"
            style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
            onError={() => { /* fallback to bg-surface */ }}
          />
          {/* Gradient vignette so text always readable */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, var(--bg-surface) 35%, transparent 80%)',
            }}
          />
        </div>
      )}

      {/* ── Radial glow on hover ──────────────────────────────────── */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 75% 25%, var(--glow-color) 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* ── Shine sweep on hover ──────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)',
          transform: hovered ? 'translateX(100%)' : 'translateX(-100%)',
          transition: hovered ? 'transform 0.65s ease' : 'none',
        }}
      />

      {/* ── Large initial letter — decorative watermark ───────────── */}
      <span
        aria-hidden
        className="absolute top-6 left-8 font-display select-none pointer-events-none leading-none
          transition-colors duration-500"
        style={{
          fontSize: 'clamp(5rem, 10vw, 8rem)',
          color: hovered ? 'var(--bg-surface-3)' : 'var(--bg-surface-2)',
          lineHeight: 1,
        }}
      >
        {label[0]}
      </span>

      {/* ── Badge tag — top right ─────────────────────────────────── */}
      <span
        className="absolute top-6 right-6 font-body uppercase text-xs px-3 py-1 border"
        style={{
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          color: accentColor,
          borderColor: `${accentColor}40`,
          background: `${accentColor}14`,
        }}
      >
        {tag}
      </span>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="relative z-10">
        <h3
          className="font-display text-text-primary"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1, marginBottom: '0.4rem' }}
        >
          {label}
        </h3>
        <p className="font-body text-text-muted text-sm leading-relaxed">
          {description}
        </p>

        {/* Fabric technical badges */}
        {fabricBadges && fabricBadges.length > 0 && (
          <div
            className="flex flex-wrap gap-1.5 mt-3 transition-all duration-500"
            style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(6px)' }}
          >
            {fabricBadges.map((badge) => (
              <span
                key={badge}
                className="font-condensed uppercase"
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  color: accentColor,
                  background: `${accentColor}1A`,
                  border: `1px solid ${accentColor}33`,
                  padding: '2px 6px',
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* ── Explorar Colección button ─────────────────────────────── */}
        <button
          onClick={onClick}
          className="inline-flex items-center gap-2 mt-4 font-body font-semibold
            uppercase border border-accent text-accent clip-button
            hover:bg-accent hover:text-white transition-all duration-300"
          style={{
            fontSize:      '0.7rem',
            letterSpacing: '0.1em',
            padding:       '8px 18px',
            opacity:       hovered ? 1 : 0,
            transform:     hovered ? 'translateY(0)' : 'translateY(10px)',
            transition:    'opacity 0.3s 0.05s, transform 0.3s 0.05s, background-color 0.25s, color 0.25s',
            pointerEvents: hovered ? 'auto' : 'none',
          }}
        >
          Ver Galería →
        </button>
      </div>
    </article>
  )
}
