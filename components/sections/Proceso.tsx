'use client'

import { useState } from 'react'
import { StaggerReveal, StaggerItem } from '@/components/animations/StaggerReveal'
import FadeUp from '@/components/animations/FadeUp'

const STEPS = [
  {
    number: '01',
    title: 'Diseño',
    description:
      'Tu idea toma forma con nuestro equipo creativo. Bocetos, paletas de color y detalles técnicos hasta que sea perfecto.',
    icon: '✦',
  },
  {
    number: '02',
    title: 'Fabricación',
    description:
      'Producción en planta propia en Colombia con materiales técnicos de primera calidad. Control de calidad en cada etapa.',
    icon: '⬡',
  },
  {
    number: '03',
    title: 'Entrega',
    description:
      'Despacho a todo el país con seguimiento en tiempo real. Tu equipo completo, listo para salir al campo.',
    icon: '◈',
  },
]

function StepCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col p-10 lg:p-12 cursor-default
        border-r border-border last:border-r-0
        transition-colors duration-500"
      style={{ background: hovered ? 'var(--bg-surface)' : 'transparent' }}
    >
      {/* Step number */}
      <div
        className="font-display leading-none mb-6 transition-colors duration-500"
        style={{
          fontSize: 'clamp(4rem, 7vw, 6rem)',
          color: hovered ? 'var(--accent)' : 'var(--bg-surface-3)',
        }}
      >
        {step.number}
      </div>

      {/* Divider line */}
      <div
        className="h-px mb-6 transition-all duration-500"
        style={{
          background: hovered ? 'var(--accent)' : 'var(--bg-surface-3)',
          width: hovered ? '48px' : '32px',
        }}
      />

      {/* Content */}
      <h3
        className="font-display text-text-primary mb-4"
        style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2rem)', lineHeight: 1 }}
      >
        {step.title}
      </h3>
      <p className="font-body text-text-muted text-sm leading-relaxed">
        {step.description}
      </p>

      {/* Connector arrow (not on last) */}
      {index < STEPS.length - 1 && (
        <div
          className="hidden lg:block absolute top-10 -right-3 z-10
            font-body text-text-subtle transition-colors duration-300"
          style={{ fontSize: '1.2rem' }}
          aria-hidden
        >
          →
        </div>
      )}
    </div>
  )
}

export default function Proceso() {
  return (
    <section id="proceso" className="bg-bg-primary py-28 px-8 lg:px-16 border-t border-border">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <FadeUp>
          <div className="mb-16">
            <span
              className="font-body text-accent uppercase"
              style={{ fontSize: '0.72rem', letterSpacing: '0.22em' }}
            >
              Metodología
            </span>
            <h2
              className="font-display text-text-primary mt-2 leading-none"
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', letterSpacing: '-0.01em', lineHeight: 0.88 }}
            >
              ASÍ<br />TRABAJAMOS
            </h2>
          </div>
        </FadeUp>

        {/* Steps grid */}
        <StaggerReveal
          className="grid grid-cols-1 md:grid-cols-3 border border-border divide-y md:divide-y-0"
          staggerDelay={0.15}
        >
          {STEPS.map((step, i) => (
            <StaggerItem key={step.number}>
              <StepCard step={step} index={i} />
            </StaggerItem>
          ))}
        </StaggerReveal>

        {/* Bottom CTA */}
        <FadeUp delay={0.3} className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-body text-text-muted text-sm leading-relaxed max-w-lg">
            Tiempo de producción promedio: <span className="text-text-primary">12–18 días hábiles</span> dependiendo
            del volumen. Mínimo de pedido: <span className="text-text-primary">10 unidades</span>.
          </p>
          <a
            href="https://wa.me/57XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-3 px-7 py-3 bg-bg-surface border border-border
              font-body font-medium text-xs uppercase tracking-wider text-text-primary
              hover:border-accent hover:text-accent clip-button transition-all duration-300"
            style={{ letterSpacing: '0.1em', fontSize: '0.75rem' }}
          >
            Hablar con un asesor →
          </a>
        </FadeUp>

      </div>
    </section>
  )
}
