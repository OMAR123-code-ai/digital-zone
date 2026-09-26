import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Bannières = images placées par toi dans public/ :
 *   banniere-1.jpg | banniere-2.jpg | banniere-3.jpg
 * (PNG accepté aussi : banniere-1.png etc. via fallback)
 *
 * Textes légers uniquement — le visuel vient de TES images.
 */
const slides = [
  {
    id: 1,
    images: ['/banniere-1.jpg', '/banniere-1.png', '/banniere-1.webp'],
    badge: 'Nouveauté 2026',
    title: 'DBS Digital Business Store',
    highlight: 'Votre partenaire de confiance',
    subtitle: 'En gros ou en détail — partout dans le monde.',
    cta: 'Découvrir la boutique',
    href: '/boutique',
  },
  {
    id: 2,
    images: ['/banniere-2.jpg', '/banniere-2.png', '/banniere-2.webp'],
    badge: 'Offres',
    title: 'Des produits de qualité',
    highlight: 'pour un quotidien meilleur',
    subtitle: 'High-tech, mode, accessoires — sélectionnés pour vous.',
    cta: 'Voir le catalogue',
    href: '/boutique',
  },
  {
    id: 3,
    images: ['/banniere-3.jpg', '/banniere-3.png', '/banniere-3.webp'],
    badge: 'Service',
    title: "L'innovation au service",
    highlight: 'de votre quotidien',
    subtitle: 'Livraison rapide · Paiement sécurisé · Support WhatsApp.',
    cta: 'Nous contacter',
    href: '/contact',
  },
]

function BannerImage({ candidates, alt }: { candidates: string[]; alt: string }) {
  const [i, setI] = useState(0)
  if (i >= candidates.length) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-dbs-black via-dbs-dark to-dbs-black">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-dbs-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-dbs-gold/5 rounded-full blur-3xl" />
      </div>
    )
  }
  return (
    <img
      src={candidates[i]}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover"
      onError={() => setI((x) => x + 1)}
    />
  )
}

export function HeroBanner() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 7000)
    return () => clearInterval(t)
  }, [])

  const slide = slides[index]
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex((i) => (i + 1) % slides.length)

  return (
    <section className="relative overflow-hidden min-h-[380px] sm:min-h-[460px] md:min-h-[540px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }}
          className="absolute inset-0"
        >
          <BannerImage candidates={slide.images} alt={slide.title} />
          <div className="absolute inset-0 bg-gradient-to-r from-dbs-black/90 via-dbs-black/70 to-dbs-black/40 z-10" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 max-w-7xl mx-auto px-4 py-14 md:py-20 flex items-center min-h-[380px] sm:min-h-[460px] md:min-h-[540px]">
        <div className="max-w-xl">
          <span className="inline-block px-3 py-1 rounded-full border border-dbs-gold/50 bg-dbs-gold/10 text-dbs-gold text-xs font-medium mb-4">
            {slide.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
            {slide.title}<br />
            <span className="gold-text">{slide.highlight}</span>
          </h1>
          <p className="mt-4 text-dbs-silver text-base md:text-lg">{slide.subtitle}</p>
          <Link
            to={slide.href}
            className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-full gold-gradient text-dbs-black font-bold text-base hover:shadow-lg hover:shadow-dbs-gold/30 transition"
          >
            {slide.cta} <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-dbs-border bg-dbs-black/60 text-dbs-silver hover:text-dbs-gold hover:border-dbs-gold flex items-center justify-center transition"
        aria-label="Bannière précédente"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-dbs-border bg-dbs-black/60 text-dbs-silver hover:text-dbs-gold hover:border-dbs-gold flex items-center justify-center transition"
        aria-label="Bannière suivante"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-dbs-gold' : 'w-1.5 bg-dbs-silver/40'}`}
            aria-label={`Bannière ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
