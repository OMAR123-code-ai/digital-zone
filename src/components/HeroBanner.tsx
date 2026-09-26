import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Bannières — fichiers public/banniere-1.jpg | 2 | 3
 * Affichage sans déformation : object-contain + fond noir.
 * Ratio adapté mobile / desktop.
 */
const slides = [
  {
    id: 1,
    images: ['/banniere-1.jpg', '/banniere-1.png', '/banniere-1.webp'],
    href: '/boutique?categorie=mode',
    label: 'Mode · Accessoires · Lifestyle',
  },
  {
    id: 2,
    images: ['/banniere-2.jpg', '/banniere-2.png', '/banniere-2.webp'],
    href: '/boutique?categorie=electronique',
    label: 'Smartphones · Ordinateurs · High-tech',
  },
  {
    id: 3,
    images: ['/banniere-3.jpg', '/banniere-3.png', '/banniere-3.webp'],
    href: '/boutique?categorie=maison',
    label: 'Maison connectée · Gadgets',
  },
]

function BannerImage({ candidates, alt }: { candidates: string[]; alt: string }) {
  const [i, setI] = useState(0)
  if (i >= candidates.length) {
    return (
      <div className="w-full h-full min-h-[160px] flex items-center justify-center bg-dbs-dark px-4">
        <p className="text-dbs-silver text-xs sm:text-sm text-center">
          Placez <span className="text-dbs-gold">banniere-1.jpg</span>,{' '}
          <span className="text-dbs-gold">banniere-2.jpg</span>,{' '}
          <span className="text-dbs-gold">banniere-3.jpg</span> dans public/
        </p>
      </div>
    )
  }
  return (
    <img
      src={candidates[i]}
      alt={alt}
      className="w-full h-full object-contain object-center"
      onError={() => setI((x) => x + 1)}
    />
  )
}

export function HeroBanner() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6500)
    return () => clearInterval(t)
  }, [])

  const slide = slides[index]
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setIndex((i) => (i + 1) % slides.length)

  return (
    <section className="relative w-full bg-dbs-black overflow-hidden">
      {/* Hauteur contrôlée : mobile compact, desktop plus large, sans étirer l'image */}
      <div className="relative w-full mx-auto max-w-[1600px] h-[180px] sm:h-[260px] md:h-[340px] lg:h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Link
              to={slide.href}
              className="absolute inset-0 z-10"
              aria-label={slide.label}
            >
              <span className="sr-only">{slide.label}</span>
            </Link>
            <BannerImage candidates={slide.images} alt={slide.label} />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={prev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/25 bg-black/50 text-white hover:border-dbs-gold hover:text-dbs-gold flex items-center justify-center transition"
          aria-label="Bannière précédente"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/25 bg-black/50 text-white hover:border-dbs-gold hover:text-dbs-gold flex items-center justify-center transition"
          aria-label="Bannière suivante"
        >
          <ChevronRight size={18} />
        </button>

        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-dbs-gold' : 'w-1.5 bg-white/40'
              }`}
              aria-label={`Bannière ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
