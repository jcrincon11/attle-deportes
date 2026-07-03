import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans, Oswald } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/providers/LenisProvider'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-dm',
  display: 'swap',
})

const oswald = Oswald({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Attle Deportes SAS | Uniformes Deportivos Colombia',
  description:
    'Fabricamos uniformes deportivos de alto rendimiento en Colombia. Fútbol, ciclismo y dotación empresarial con calidad premium.',
  keywords: ['uniformes deportivos', 'fútbol', 'ciclismo', 'Colombia', 'dotación empresarial'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${dmSans.variable} ${oswald.variable}`}>
      <body className="bg-bg-primary text-text-primary font-body antialiased">
        {/* Fixed decorative diagonal lines — pure atmosphere, no interaction */}
        <div className="page-diagonals" aria-hidden="true" />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
