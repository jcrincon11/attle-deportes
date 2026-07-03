const SEDES = [
  {
    type: 'Fábrica & Tienda Principal',
    name: 'Sede Fontibón',
    address: 'Cra. 97B # 20B-10, Fontibón',
    city: 'Bogotá D.C., Colombia',
    hours: 'Lun–Vie 8:00 a.m. – 6:00 p.m. · Sáb 8:00 a.m. – 2:00 p.m.',
  },
]

const PHONES = [
  { label: 'Fijo',      number: '(601) 656 3535'      },
  { label: 'Celular',   number: '+57 317 888 8966'     },
  { label: 'Celular',   number: '+57 314 203 5779'     },
]

const SOCIAL = [
  {
    label:  'Instagram',
    handle: '@attleofficial',
    href:   'https://www.instagram.com/attleofficial',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label:  'Facebook',
    handle: 'Attle International Group',
    href:   'https://www.facebook.com/profile.php?id=100057273654061',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    label:  'WhatsApp',
    handle: 'Escríbenos directo',
    href:   'https://wa.me/573178888966',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    ),
  },
]

const NAV_LINKS = [
  { label: 'Fútbol',   href: '#productos' },
  { label: 'Dotación', href: '#productos' },
  { label: 'Proceso',  href: '#proceso'   },
  { label: 'Cotizar',  href: '#cotizar'   },
]

/* ─── Mini-component: Sede card ─────────────────────────────────── */
function SedeCard({ sede }: { sede: typeof SEDES[0] }) {
  return (
    <div
      className="p-6 border border-border"
      style={{ borderRadius: '2px', background: 'var(--bg-surface-2)' }}
    >
      <span
        className="font-body uppercase text-accent"
        style={{ fontSize: '0.58rem', letterSpacing: '0.2em' }}
      >
        {sede.type}
      </span>

      <h3
        className="font-display text-text-primary mt-2"
        style={{ fontSize: '1.3rem', lineHeight: 1 }}
      >
        {sede.name}
      </h3>

      <div className="h-px bg-accent w-8 mt-3 mb-4" />

      <address className="not-italic">
        <p className="font-body text-text-muted text-sm leading-relaxed">
          {sede.address}
        </p>
        <p className="font-body text-text-subtle text-sm">
          {sede.city}
        </p>
      </address>

      <p
        className="font-body text-text-subtle mt-3"
        style={{ fontSize: '0.72rem', letterSpacing: '0.02em' }}
      >
        {sede.hours}
      </p>
    </div>
  )
}

/* ─── Footer ─────────────────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer id="contacto" className="border-t border-border" style={{ background: 'var(--bg-surface)' }}>

      {/* ── Top accent stripe */}
      <div className="h-0.5 w-full" style={{ background: 'linear-gradient(to right, var(--accent), transparent 60%)' }} />

      {/* ── Main content ───────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-20">

        {/* Brand headline */}
        <div className="mb-16">
          <p
            className="font-display text-text-primary"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', letterSpacing: '-0.01em', lineHeight: 1 }}
          >
            ATTLE INTERNATIONAL GROUP
          </p>
          <p className="font-body text-text-muted mt-2 text-sm max-w-sm leading-relaxed">
            Fabricantes de uniformes deportivos de alto rendimiento en Colombia.
          </p>
        </div>

        {/* ── Two-column grid: Sedes + Contacto ──────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Col 1 — Sedes */}
          <div>
            <p
              className="font-body text-text-subtle uppercase mb-6"
              style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}
            >
              Nuestra Sede
            </p>

            <div className="grid grid-cols-1 gap-4">
              {SEDES.map((sede) => (
                <SedeCard key={sede.name} sede={sede} />
              ))}
            </div>
          </div>

          {/* Col 2 — Contacto y Redes */}
          <div className="flex flex-col gap-10">

            {/* Teléfonos */}
            <div>
              <p
                className="font-body text-text-subtle uppercase mb-5"
                style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}
              >
                Teléfonos
              </p>
              <ul className="space-y-3">
                {PHONES.map(({ label, number }, i) => (
                  <li key={i} className="flex items-baseline gap-4">
                    <span
                      className="font-body text-text-subtle uppercase shrink-0"
                      style={{ fontSize: '0.6rem', letterSpacing: '0.14em', width: '60px' }}
                    >
                      {label}
                    </span>
                    <span className="font-body text-text-primary text-sm">
                      {number}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Email */}
              <div className="flex items-baseline gap-4 mt-3">
                <span
                  className="font-body text-text-subtle uppercase shrink-0"
                  style={{ fontSize: '0.6rem', letterSpacing: '0.14em', width: '60px' }}
                >
                  Email
                </span>
                <a
                  href="mailto:ventas@attle.com.co"
                  className="font-body text-text-muted text-sm hover:text-accent transition-colors duration-300"
                >
                  ventas@attle.com.co
                </a>
              </div>
            </div>

            {/* Redes sociales */}
            <div>
              <p
                className="font-body text-text-subtle uppercase mb-5"
                style={{ fontSize: '0.65rem', letterSpacing: '0.2em' }}
              >
                Redes Sociales
              </p>
              <ul className="space-y-4">
                {SOCIAL.map(({ label, handle, href, icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4"
                    >
                      <span
                        className="flex items-center justify-center border border-border
                          text-text-subtle group-hover:border-accent group-hover:text-accent
                          transition-all duration-300"
                        style={{ width: 38, height: 38, borderRadius: '2px' }}
                      >
                        {icon}
                      </span>

                      <span>
                        <span
                          className="block font-body text-text-primary text-sm
                            group-hover:text-accent transition-colors duration-300"
                        >
                          {label}
                        </span>
                        <span
                          className="block font-body text-text-subtle"
                          style={{ fontSize: '0.72rem' }}
                        >
                          {handle}
                        </span>
                      </span>

                      <span
                        className="ml-auto font-body text-text-subtle group-hover:text-accent
                          transition-all duration-300 group-hover:translate-x-1"
                        style={{ fontSize: '0.8rem' }}
                      >
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* ── Secondary nav ────────────────────────────────────────── */}
        <div className="mt-16 pt-8 border-t border-border">
          <ul className="flex flex-wrap gap-6 mb-6">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="font-body text-text-subtle text-xs uppercase tracking-wider
                    hover:text-text-muted transition-colors duration-300"
                  style={{ letterSpacing: '0.1em', fontSize: '0.7rem' }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────────── */}
      <div
        className="border-t border-border px-8 lg:px-16 py-5"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-text-subtle" style={{ fontSize: '0.72rem' }}>
            © {new Date().getFullYear()} Attle International Group — Todos los derechos reservados.
          </p>
          <p className="font-body text-text-subtle" style={{ fontSize: '0.72rem' }}>
            Fabricado con orgullo en Colombia 🇨🇴
          </p>
        </div>
      </div>

    </footer>
  )
}
