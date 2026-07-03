'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

export interface GalleryData {
  title: string
  tag?: string
  accentColor?: string
  images: string[]
}

interface Props {
  data: GalleryData | null
  onClose: () => void
}

export default function ProductGalleryModal({ data, onClose }: Props) {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState<1 | -1>(1)

  const go = useCallback((delta: 1 | -1) => {
    if (!data) return
    setDir(delta)
    setCurrent(c => (c + delta + data.images.length) % data.images.length)
  }, [data])

  useEffect(() => { setCurrent(0); setDir(1) }, [data])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!data) return
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [data, onClose, go])

  useEffect(() => {
    if (data) document.body.style.overflow = 'hidden'
    else      document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [data])

  const accent = data?.accentColor ?? 'var(--accent)'

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          key="gallery-overlay"
          className="fixed inset-0 z-[300] flex items-stretch"
          style={{ background: 'rgba(5,5,5,0.97)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="flex flex-col w-full"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0,  opacity: 1 }}
            exit={{ y: 12,   opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
          >
            {/* ── Header ────────────────────────────────────────────── */}
            <div
              className="flex items-center justify-between px-6 md:px-10 py-4 shrink-0 border-b border-border"
              style={{ background: 'var(--bg-surface)' }}
            >
              <div className="flex items-center gap-3 min-w-0">
                {data.tag && (
                  <span
                    className="shrink-0 font-body uppercase px-2 py-1 border"
                    style={{
                      fontSize: '0.58rem',
                      letterSpacing: '0.15em',
                      color: accent,
                      borderColor: `${accent}55`,
                    }}
                  >
                    {data.tag}
                  </span>
                )}
                <h2
                  className="font-display text-text-primary truncate"
                  style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', lineHeight: 1 }}
                >
                  {data.title}
                </h2>
              </div>

              <div className="flex items-center gap-5 shrink-0 ml-4">
                <span
                  className="font-body text-text-subtle tabular-nums"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}
                >
                  {String(current + 1).padStart(2, '0')} / {String(data.images.length).padStart(2, '0')}
                </span>
                <button
                  onClick={onClose}
                  className="font-body text-text-subtle hover:text-text-primary
                    transition-colors duration-200 flex items-center gap-2 uppercase"
                  style={{ fontSize: '0.65rem', letterSpacing: '0.14em' }}
                  aria-label="Cerrar galería"
                >
                  <span className="hidden sm:inline">Cerrar</span>
                  <span style={{ fontSize: '1rem', lineHeight: 1 }}>✕</span>
                </button>
              </div>
            </div>

            {/* ── Main image ────────────────────────────────────────── */}
            <div className="flex-1 relative overflow-hidden min-h-0">

              {/* Arrows */}
              {[{ dir: -1 as const, label: '←', side: 'left-3 md:left-6' }, { dir: 1 as const, label: '→', side: 'right-3 md:right-6' }].map(({ dir: d, label, side }) => (
                <button
                  key={label}
                  onClick={() => go(d)}
                  className={`absolute ${side} top-1/2 -translate-y-1/2 z-20
                    flex items-center justify-center border border-border text-text-subtle
                    hover:border-border-hover hover:text-text-primary transition-all duration-200`}
                  style={{
                    width: 44, height: 44,
                    background: 'rgba(8,8,8,0.72)',
                    backdropFilter: 'blur(8px)',
                    fontSize: '1.1rem',
                    borderRadius: '2px',
                  }}
                  aria-label={d === -1 ? 'Foto anterior' : 'Foto siguiente'}
                >
                  {label}
                </button>
              ))}

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current}
                  className="absolute inset-0"
                  initial={{ opacity: 0, x: dir * 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{   opacity: 0, x: dir * -28 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <Image
                    src={data.images[current]}
                    alt={`${data.title} — foto ${current + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Bottom accent glow */}
              <div
                className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
                style={{ background: `linear-gradient(to top, ${accent}10, transparent)` }}
              />
            </div>

            {/* ── Thumbnail strip ───────────────────────────────────── */}
            <div
              className="shrink-0 border-t border-border px-4 py-3 overflow-x-auto"
              style={{ background: 'var(--bg-surface)', scrollbarWidth: 'none' }}
            >
              <div className="flex gap-2 w-max mx-auto">
                {data.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i) }}
                    className="relative shrink-0 overflow-hidden transition-all duration-200"
                    style={{
                      width: 68,
                      height: 50,
                      borderRadius: '1px',
                      outline: i === current ? `2px solid ${accent}` : '2px solid transparent',
                      outlineOffset: '-2px',
                      opacity: i === current ? 1 : 0.4,
                    }}
                    aria-label={`Foto ${i + 1}`}
                  >
                    <Image src={src} alt="" fill className="object-cover" sizes="68px" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
