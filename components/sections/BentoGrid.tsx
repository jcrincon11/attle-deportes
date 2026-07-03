import FadeUp from '@/components/animations/FadeUp'
import BentoCard from '@/components/ui/BentoCard'
import ShowcaseCarousel from '@/components/sections/ShowcaseCarousel'

const PRODUCTS = [
  {
    label: 'Fútbol',
    description: 'Uniformes técnicos de alto rendimiento para cancha y sala. Telas transpirables y sublimación total.',
    tag: 'Más Vendido',
    accentColor: 'var(--accent)',
    glowClass: 'bento-glow-orange',
    gridClass: 'row-span-2 min-h-[560px]',
    delay: 0.1,
    fabricBadges: ['Transpirabilidad 95%', 'Secado Rápido', 'Anti UV', 'Sublimación Total'],
    imageSrc: '/images/showcase/img1.jpg',
  },
  {
    label: 'Escuelas de Formación',
    description: 'Uniformes de alto impacto para las promesas del fútbol. Durabilidad extrema para el entrenamiento diario.',
    tag: 'Formación',
    accentColor: 'var(--accent-teal)',
    glowClass: 'bento-glow-teal',
    gridClass: 'min-h-[268px]',
    delay: 0.2,
    fabricBadges: ['Extra Durabilidad', 'Lavado Industrial', 'Anti Desgarro'],
    imageSrc: '/images/showcase/img2.jpg',
  },
  {
    label: 'Dotación',
    description: 'Uniformes corporativos y empresariales. Imagen institucional con calidad textil garantizada.',
    tag: 'Corporativo',
    accentColor: 'var(--accent-gold)',
    glowClass: 'bento-glow-gold',
    gridClass: 'min-h-[268px]',
    delay: 0.3,
    fabricBadges: ['Resistencia Industrial', 'Anti Manchas', 'Lavado 60°'],
    imageSrc: '/images/showcase/img4.jpg',
  },
]

export default function BentoGrid() {
  return (
    <section id="productos" className="bg-bg-primary py-28 px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto">

        {/* Section header */}
        <FadeUp>
          <div className="mb-14">
            <span
              className="font-body text-accent uppercase"
              style={{ fontSize: '0.72rem', letterSpacing: '0.22em' }}
            >
              Catálogo
            </span>
            <h2
              className="font-display text-text-primary mt-2 leading-none"
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', letterSpacing: '-0.01em', lineHeight: 0.88 }}
            >
              NUESTROS<br />PRODUCTOS
            </h2>
          </div>
        </FadeUp>

        {/* Bento Grid — 3 cols, 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] auto-rows-auto gap-3">

          {PRODUCTS.map((product) => (
            <FadeUp
              key={product.label}
              delay={product.delay}
              className={`${product.gridClass} flex`}
            >
              <BentoCard
                label={product.label}
                description={product.description}
                tag={product.tag}
                accentColor={product.accentColor}
                glowClass={product.glowClass}
                fabricBadges={product.fabricBadges}
                imageSrc={(product as { imageSrc?: string }).imageSrc}
                className="flex-1"
              />
            </FadeUp>
          ))}

          {/* Full-width CTA card */}
          <FadeUp delay={0.4} className="md:col-span-3">
            <div
              className="relative overflow-hidden bg-bg-surface border border-border
                flex flex-col md:flex-row items-start md:items-center gap-6 p-8 lg:p-10
                group hover:border-border-hover transition-all duration-500"
              style={{ borderRadius: '2px' }}
            >
              {/* Decorative text */}
              <span
                aria-hidden
                className="absolute right-8 top-1/2 -translate-y-1/2 font-display text-bg-surface-2
                  leading-none select-none pointer-events-none hidden lg:block"
                style={{ fontSize: '7rem' }}
              >
                SAS
              </span>

              <div className="relative z-10">
                <h3
                  className="font-display text-text-primary"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', lineHeight: 1.1 }}
                >
                  ¿TIENES UN EQUIPO O UNA EMPRESA?
                </h3>
                <p className="font-body text-text-muted mt-3 text-sm leading-relaxed max-w-lg">
                  Solicita una cotización personalizada sin costo. Asesoría en diseño incluida.
                </p>
              </div>

              <a
                href="#contacto"
                className="relative z-10 shrink-0 inline-flex items-center gap-2 border border-accent text-accent
                  px-7 py-3 font-body font-medium uppercase tracking-wider text-xs
                  hover:bg-accent hover:text-white clip-button transition-all duration-300"
                style={{ letterSpacing: '0.1em', fontSize: '0.75rem' }}
              >
                Cotizar Ahora →
              </a>
            </div>
          </FadeUp>
        </div>

        {/* ── Showcase Carousel: featured clients ────────────────────── */}
        <ShowcaseCarousel />

      </div>
    </section>
  )
}
