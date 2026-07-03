'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeUp from '@/components/animations/FadeUp'

/* ─── Types ──────────────────────────────────────────────────────── */
type Sport = 'Fútbol' | 'Ciclismo' | 'Dotación'
type WizardStep = 0 | 1 | 2 | 3
type ContactKey = 'teamName' | 'whatsapp' | 'email'

interface FormData {
  sport: Sport | null
  quantity: number
  teamName: string
  whatsapp: string
  email: string
}

/* ─── Constants ──────────────────────────────────────────────────── */
const INITIAL: FormData = { sport: null, quantity: 50, teamName: '', whatsapp: '', email: '' }
const STEP_LABELS = ['Deporte', 'Volumen', 'Contacto'] as const

/* ─── Slide animation variants ───────────────────────────────────── */
const slide = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
  exit:   (dir: number) => ({
    x: dir > 0 ? '-60%' : '60%',
    opacity: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] as const },
  }),
}

/* ─── SVG Sport Icons ────────────────────────────────────────────── */
function FootballIcon({ color }: { color: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
      <circle cx="22" cy="22" r="19" stroke={color} strokeWidth="1.5" />
      <polygon
        points="22,12 27.5,17 25.5,24.5 18.5,24.5 16.5,17"
        stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"
      />
      <line x1="22"  y1="3"    x2="22"   y2="12"   stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="37"  y1="13"   x2="27.5" y2="17"   stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="33"  y1="38"   x2="25.5" y2="24.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11"  y1="38"   x2="18.5" y2="24.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7"   y1="13"   x2="16.5" y2="17"   stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function CyclingIcon({ color }: { color: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
      <circle cx="10" cy="32" r="9"  stroke={color} strokeWidth="1.5" />
      <circle cx="34" cy="32" r="9"  stroke={color} strokeWidth="1.5" />
      <circle cx="10" cy="32" r="2"  fill={color} />
      <circle cx="34" cy="32" r="2"  fill={color} />
      <path d="M34 32L27 12H20L10 32M27 12L32 22"
        stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      />
      <path d="M30 22H36" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 12H24" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="30" cy="10" r="3" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

function JerseyIcon({ color }: { color: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
      <path
        d="M16 8L7 18H16V42H28V18H37L28 8C28 8 26 14 22 14C18 14 16 8 16 8Z"
        stroke={color} strokeWidth="1.5" strokeLinejoin="round"
      />
      <path d="M16 24H28" stroke={color} strokeWidth="1" strokeOpacity="0.35" />
    </svg>
  )
}

/* ─── Sport options ──────────────────────────────────────────────── */
const SPORTS = [
  { id: 'Fútbol'   as Sport, sub: 'Cancha 11 / Fútbol Sala',    accent: '#CC0000', Icon: FootballIcon },
  { id: 'Ciclismo' as Sport, sub: 'Ruta / MTB / Pista',          accent: '#4DFFB4', Icon: CyclingIcon  },
  { id: 'Dotación' as Sport, sub: 'Empresarial / Institucional',  accent: '#FFD000', Icon: JerseyIcon   },
]

/* ─── Step 1: Sport selection ────────────────────────────────────── */
function StepSport({
  value,
  onChange,
  dir,
}: {
  value: Sport | null
  onChange: (s: Sport) => void
  dir: number
}) {
  return (
    <motion.div custom={dir} variants={slide} initial="enter" animate="center" exit="exit">
      <p
        className="font-condensed text-text-primary uppercase mb-6"
        style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', letterSpacing: '0.02em' }}
      >
        ¿Qué deporte buscas?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SPORTS.map(({ id, sub, accent, Icon }) => {
          const selected = value === id
          return (
            <motion.button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className="relative flex flex-col items-center gap-3 p-6 border cursor-pointer"
              style={{
                borderRadius: '2px',
                borderColor: selected ? accent : 'var(--border)',
                background: selected ? `${accent}14` : 'var(--bg-surface-2)',
                transition: 'border-color 0.25s, background 0.25s',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <Icon color={selected ? accent : 'var(--text-subtle)'} />

              <div>
                <div
                  className="font-condensed uppercase"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    color: selected ? accent : 'var(--text-primary)',
                    transition: 'color 0.25s',
                  }}
                >
                  {id}
                </div>
                <div
                  className="font-body mt-0.5"
                  style={{
                    fontSize: '0.62rem',
                    color: selected ? `${accent}99` : 'var(--text-subtle)',
                    transition: 'color 0.25s',
                  }}
                >
                  {sub}
                </div>
              </div>

              {selected && (
                <motion.div
                  className="absolute top-2.5 right-2.5 flex items-center justify-center"
                  style={{ width: 14, height: 14, background: accent, borderRadius: '1px' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}

/* ─── Step 2: Volume slider ──────────────────────────────────────── */
function StepVolume({
  value,
  onChange,
  dir,
}: {
  value: number
  onChange: (n: number) => void
  dir: number
}) {
  const pct = ((value - 10) / (500 - 10)) * 100
  const display = value >= 500 ? '500+' : String(value)

  const hint =
    value < 50
      ? 'Producción desde 10 unidades. El precio unitario disminuye con mayor volumen.'
      : value < 200
      ? 'Volumen medio — recibirás cotización personalizada en menos de 24 h.'
      : 'Gran volumen — asignaremos un asesor dedicado a tu pedido.'

  return (
    <motion.div custom={dir} variants={slide} initial="enter" animate="center" exit="exit">
      <p
        className="font-condensed text-text-primary uppercase mb-8"
        style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', letterSpacing: '0.02em' }}
      >
        ¿Cuántos uniformes necesitas?
      </p>

      {/* Large quantity display */}
      <div className="text-center mb-10">
        <div
          className="font-display leading-none"
          style={{ fontSize: 'clamp(4.5rem, 14vw, 8rem)', color: 'var(--accent)' }}
        >
          {display}
        </div>
        <div
          className="font-condensed text-text-muted uppercase mt-1"
          style={{ fontSize: '0.68rem', letterSpacing: '0.22em' }}
        >
          Uniformes
        </div>
      </div>

      {/* Slider */}
      <div className="px-1">
        <input
          type="range"
          min={10}
          max={500}
          step={10}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="quote-slider w-full"
          style={{
            background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${pct}%, var(--bg-surface-3) ${pct}%, var(--bg-surface-3) 100%)`,
          }}
        />
        <div className="flex justify-between mt-2">
          <span className="font-body text-text-subtle" style={{ fontSize: '0.62rem' }}>10 un.</span>
          <span className="font-body text-text-subtle" style={{ fontSize: '0.62rem' }}>500+ un.</span>
        </div>
      </div>

      {/* Volume context hint */}
      <div
        className="mt-8 p-4 border border-border"
        style={{ borderRadius: '2px', background: 'var(--bg-surface-2)' }}
      >
        <p className="font-body text-text-muted leading-relaxed" style={{ fontSize: '0.75rem' }}>
          {hint}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Step 3: Contact form ───────────────────────────────────────── */
function StepContact({
  data,
  onChange,
  dir,
}: {
  data: Pick<FormData, ContactKey>
  onChange: (key: ContactKey, val: string) => void
  dir: number
}) {
  return (
    <motion.div custom={dir} variants={slide} initial="enter" animate="center" exit="exit">
      <p
        className="font-condensed text-text-primary uppercase mb-6"
        style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', letterSpacing: '0.02em' }}
      >
        ¿Cómo te contactamos?
      </p>

      <div className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="qw-team"
            className="font-condensed uppercase text-text-subtle block mb-1.5"
            style={{ fontSize: '0.56rem', letterSpacing: '0.15em' }}
          >
            Nombre del Equipo / Empresa *
          </label>
          <input
            id="qw-team"
            type="text"
            value={data.teamName}
            onChange={e => onChange('teamName', e.target.value)}
            placeholder="Ej: Club Atlético Medellín"
            className="quote-input w-full"
            autoComplete="organization"
          />
        </div>

        <div>
          <label
            htmlFor="qw-wa"
            className="font-condensed uppercase text-text-subtle block mb-1.5"
            style={{ fontSize: '0.56rem', letterSpacing: '0.15em' }}
          >
            WhatsApp *
          </label>
          <div className="relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 font-body text-text-muted"
              style={{ fontSize: '0.85rem', pointerEvents: 'none' }}
            >
              +57
            </span>
            <input
              id="qw-wa"
              type="tel"
              value={data.whatsapp}
              onChange={e => onChange('whatsapp', e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="300 000 0000"
              className="quote-input w-full"
              style={{ paddingLeft: '44px' }}
              autoComplete="tel"
              inputMode="numeric"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="qw-email"
            className="font-condensed uppercase text-text-subtle block mb-1.5"
            style={{ fontSize: '0.56rem', letterSpacing: '0.15em' }}
          >
            Email{' '}
            <span style={{ fontSize: '0.5rem', color: 'var(--text-subtle)', textTransform: 'none' }}>
              (opcional)
            </span>
          </label>
          <input
            id="qw-email"
            type="email"
            value={data.email}
            onChange={e => onChange('email', e.target.value)}
            placeholder="correo@dominio.com"
            className="quote-input w-full"
            autoComplete="email"
          />
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Success screen ─────────────────────────────────────────────── */
function SuccessScreen({ data }: { data: FormData }) {
  const sport  = SPORTS.find(s => s.id === data.sport)
  const qty    = data.quantity >= 500 ? '500+' : String(data.quantity)
  const waText = encodeURIComponent(
    `Hola Attle Deportes! Solicité una cotización: ${qty} uniformes de ${data.sport} para ${data.teamName}.`,
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="text-center py-6"
    >
      {/* Animated checkmark */}
      <motion.div
        className="mx-auto mb-6 flex items-center justify-center border-2 border-accent"
        style={{ width: 52, height: 52, borderRadius: '2px' }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <motion.path
            d="M4 11L9 16L18 6"
            stroke="#CC0000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          />
        </svg>
      </motion.div>

      {/* Headline */}
      <motion.h3
        className="font-display text-text-primary leading-none"
        style={{ fontSize: 'clamp(1.6rem, 5vw, 2.5rem)' }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        ¡TU EQUIPO ESTÁ{' '}
        <span style={{ color: 'var(--accent)' }}>A UN PASO</span>{' '}
        DE SER GANADOR!
      </motion.h3>

      {/* Summary */}
      <motion.p
        className="font-body text-text-muted mt-4 mx-auto leading-relaxed"
        style={{ fontSize: '0.875rem', maxWidth: '340px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Recibimos tu solicitud para{' '}
        <strong className="text-text-primary">
          {qty} uniformes de {data.sport}
        </strong>
        . Contactaremos a{' '}
        <strong className="text-text-primary">{data.teamName}</strong> en menos de 24 horas.
      </motion.p>

      {/* Summary chips */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        {[
          { label: data.sport!, color: sport?.accent ?? '#CC0000' },
          { label: `${qty} unidades`,  color: '#CC0000' },
        ].map(({ label, color }) => (
          <span
            key={label}
            className="font-condensed uppercase"
            style={{
              fontSize: '0.62rem',
              letterSpacing: '0.1em',
              padding: '3px 10px',
              border: `1px solid ${color}44`,
              background: `${color}14`,
              color,
            }}
          >
            {label}
          </span>
        ))}
      </motion.div>

      {/* WhatsApp CTA — replace XXXXXXXXXX with Attle's number (no spaces, no +) */}
      <motion.a
        href={`https://wa.me/573178888966?text=${waText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-8 font-body font-semibold uppercase clip-button
          bg-accent text-white hover:bg-accent-hover transition-colors duration-300"
        style={{ fontSize: '0.8rem', letterSpacing: '0.1em', padding: '12px 28px' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        Confirmar por WhatsApp →
      </motion.a>
    </motion.div>
  )
}

/* ─── QuoteWizard ────────────────────────────────────────────────── */
export default function QuoteWizard() {
  const [step, setStep] = useState<WizardStep>(0)
  const [dir,  setDir]  = useState(1)
  const [data, setData] = useState<FormData>(INITIAL)

  function update(patch: Partial<FormData>) {
    setData(d => ({ ...d, ...patch }))
  }

  function next() {
    setDir(1)
    setStep(s => (s + 1) as WizardStep)
  }

  function back() {
    setDir(-1)
    setStep(s => (s - 1) as WizardStep)
  }

  function submit() {
    console.log('[QuoteWizard] Cotización enviada:', {
      sport:    data.sport,
      quantity: data.quantity >= 500 ? '500+' : data.quantity,
      teamName: data.teamName,
      whatsapp: `+57${data.whatsapp}`,
      email:    data.email || '—',
    })
    setDir(1)
    setStep(3)
  }

  const progressPct = step >= 3 ? 100 : ((step + 1) / STEP_LABELS.length) * 100

  const isValid = [
    data.sport !== null,
    true,
    data.teamName.trim() !== '' && data.whatsapp.trim().length === 10,
  ]

  return (
    <section id="cotizar" className="bg-bg-primary py-28 px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto">

        {/* Section header */}
        <FadeUp>
          <div className="mb-14">
            <span
              className="font-body text-accent uppercase"
              style={{ fontSize: '0.72rem', letterSpacing: '0.22em' }}
            >
              Cotización Inteligente
            </span>
            <h2
              className="font-display text-text-primary mt-2 leading-none"
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 0.88 }}
            >
              CONSIGUE TU<br />
              <span style={{ color: 'var(--accent)' }}>COTIZACIÓN</span>
            </h2>
          </div>
        </FadeUp>

        {/* Wizard card */}
        <FadeUp delay={0.15}>
          <div
            className="max-w-2xl mx-auto bg-bg-surface border border-border"
            style={{ borderRadius: '2px' }}
          >
            {/* Progress bar */}
            <div className="relative h-0.5 bg-bg-surface-3 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            {/* Breadcrumb */}
            {step < 3 && (
              <div className="flex items-center gap-1.5 px-8 pt-6 pb-1">
                {STEP_LABELS.map((label, i) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <span
                      className="font-condensed uppercase"
                      style={{
                        fontSize: '0.56rem',
                        letterSpacing: '0.12em',
                        color:
                          i === step   ? 'var(--accent)'      :
                          i  < step    ? 'var(--text-muted)'  :
                                         'var(--text-subtle)',
                        transition: 'color 0.3s',
                      }}
                    >
                      {i < step ? `✓ ${label}` : `${i + 1}. ${label}`}
                    </span>
                    {i < STEP_LABELS.length - 1 && (
                      <span style={{ color: 'var(--bg-surface-3)', fontSize: '0.65rem' }}>›</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Step content — overflow-hidden clips the slide */}
            <motion.div
              layout
              className="relative overflow-hidden px-8 pt-4 pb-2"
              style={{ minHeight: '340px' }}
            >
              <AnimatePresence mode="wait" custom={dir}>
                {step === 0 && (
                  <StepSport
                    key="sport"
                    value={data.sport}
                    onChange={sport => update({ sport })}
                    dir={dir}
                  />
                )}
                {step === 1 && (
                  <StepVolume
                    key="volume"
                    value={data.quantity}
                    onChange={quantity => update({ quantity })}
                    dir={dir}
                  />
                )}
                {step === 2 && (
                  <StepContact
                    key="contact"
                    data={data}
                    onChange={(k, v) => update({ [k]: v } as Partial<FormData>)}
                    dir={dir}
                  />
                )}
                {step === 3 && <SuccessScreen key="success" data={data} />}
              </AnimatePresence>
            </motion.div>

            {/* Navigation */}
            {step < 3 && (
              <div className="flex items-center justify-between px-8 pb-8 pt-4">
                <button
                  type="button"
                  onClick={back}
                  className="font-body text-text-subtle hover:text-text-muted transition-colors duration-300 uppercase"
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    visibility: step === 0 ? 'hidden' : 'visible',
                  }}
                >
                  ← Atrás
                </button>

                <motion.button
                  type="button"
                  onClick={() => {
                    if (!isValid[step]) return
                    if (step === 2) { submit() } else { next() }
                  }}
                  className={`inline-flex items-center gap-2 font-body font-semibold uppercase clip-button transition-colors duration-300 ${
                    isValid[step]
                      ? 'bg-accent text-white hover:bg-accent-hover'
                      : 'bg-bg-surface-3 text-text-subtle cursor-not-allowed'
                  }`}
                  style={{ fontSize: '0.8rem', letterSpacing: '0.1em', padding: '12px 28px' }}
                  whileHover={isValid[step] ? { scale: 1.04 } : {}}
                  whileTap={isValid[step]   ? { scale: 0.97 } : {}}
                  transition={{ duration: 0.2 }}
                >
                  {step === 2 ? 'Solicitar Cotización' : 'Siguiente'}
                  <span>→</span>
                </motion.button>
              </div>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
