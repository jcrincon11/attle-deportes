'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Productos', href: '#productos' },
  { label: 'Proceso',   href: '#proceso' },
  { label: 'Contacto',  href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  /* Close menu on route change / scroll */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled
            ? 'py-4 bg-bg-primary/90 backdrop-blur-xl border-b border-border'
            : 'py-6 bg-transparent'
          }
        `}
      >
        <nav className="flex items-center justify-between px-8 lg:px-16 max-w-[1400px] mx-auto">

          {/* Logo */}
          <a href="/" className="relative flex items-center" onClick={() => setMenuOpen(false)}>
            <div className="relative" style={{ height: '60px', width: '200px' }}>
              <Image
                src="/images/logo-attle.png"
                alt="Attle Deportes SAS"
                fill
                sizes="200px"
                className="object-contain object-left"
                priority
              />
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="text-text-muted text-sm tracking-wider font-body hover:text-text-primary transition-colors duration-300 uppercase"
                  style={{ letterSpacing: '0.08em', fontSize: '0.8rem' }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#contacto"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-body font-medium tracking-wider uppercase
              border border-accent text-accent hover:bg-accent hover:text-white
              transition-all duration-300 clip-button"
            style={{ letterSpacing: '0.1em', fontSize: '0.75rem' }}
          >
            Cotizar →
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <span
              className="block h-px w-6 bg-text-primary transition-all duration-300 origin-center"
              style={{ transform: menuOpen ? 'translateY(4px) rotate(45deg)' : 'none' }}
            />
            <span
              className="block h-px w-6 bg-text-primary transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'scaleX(0)' : 'none' }}
            />
            <span
              className="block h-px w-6 bg-text-primary transition-all duration-300 origin-center"
              style={{ transform: menuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none' }}
            />
          </button>
        </nav>
      </header>

      {/* ── Mobile drawer ──────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-bg-primary/95 backdrop-blur-2xl"
              onClick={() => setMenuOpen(false)}
            />

            {/* Content */}
            <motion.nav
              className="relative z-10 flex flex-col justify-center px-8 h-full"
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 h-0.5 w-32 bg-accent" />

              <ul className="flex flex-col gap-2 mb-12">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="block font-display text-text-primary hover:text-accent transition-colors duration-300"
                      style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', lineHeight: 1.1 }}
                    >
                      {label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-2 self-start bg-accent text-white font-body font-semibold uppercase clip-button px-8 py-4"
                style={{ fontSize: '0.85rem', letterSpacing: '0.1em' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                Cotizar ahora →
              </motion.a>

              <p
                className="absolute bottom-10 left-8 font-body text-text-subtle"
                style={{ fontSize: '0.65rem', letterSpacing: '0.12em' }}
              >
                © Attle Deportes SAS
              </p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
