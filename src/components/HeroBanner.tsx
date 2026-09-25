import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    id: 1,
    badge: 'Nouveauté 2026',
    title: 'La technologie',
    highlight: 'à la perfection',
    subtitle: "L'innovation au service de votre quotidien. Découvrez notre sélection premium.",
    cta: 'Découvrir maintenant',
    href: '/boutique',
    image: 'https://images.unsplash.com/photo-1695048133142-1a204db4a1d6?w=1200&q=80',
  },
  {
    id: 2,
    badge: 'High-Tech',
    title: 'Audio & wearables',
    highlight: 'premium',
    subtitle: 'AirPods, montres connectées et accessoires sélectionnés pour la qualité.',
    cta: 'Voir le catalogue',
    href: '/boutique?categorie=high-tech',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=1200&q=80',
  },
  {
    id: 3,
    badge: 'Offres',
    title: 'Des produits de qualité',
    highlight: 'pour un quotidien meilleur',
    subtitle: 'Mode, beauté, électronique — en gros ou en détail, partout dans le monde.',
    cta: 'Acheter maintenant',
    href: '/boutique',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80',
  },
]

export function HeroBanner() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [])

  const slide = slides[index]
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex((i) => (i + 1) % slides.length)

  return (
    <section className="relative overflow-hidden min-h-[420px] md:min-h-[520px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-dbs-black via-dbs-black/90 to-dbs-black/40 z-10" />
          <img src={slide.image} alt="" className="w-full h-full object-cover opacity-50" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 max-w-7xl mx-auto px-4 py-16 md:py-24 flex items-center min-h-[420px] md:min-h-[520px]">
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
        aria-label="Précédent"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-dbs-border bg-dbs-black/60 text-dbs-silver hover:text-dbs-gold hover:border-dbs-gold flex items-center justify-center transition"
        aria-label="Suivant"
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
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
