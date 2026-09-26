import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Bannières officielles DBS — place dans public/ :
 *   banniere-1.jpg  → Mode / Accessoires / Lifestyle
 *   banniere-2.jpg  → Smartphones / Ordinateurs / High-tech
 *   banniere-3.jpg  → Maison connectée
 *
 * Les images contiennent déjà logo + textes + CTA.
 * On affiche l'image en plein largeur ; toute la bannière est cliquable.
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
      <div className="absolute inset-0 bg-gradient-to-br from-dbs-black via-dbs-dark to-dbs-black flex items-center justify-center">
        <p className="text-dbs-silver text-sm px-4 text-center">
          Ajoutez <code className="text-dbs-gold">banniere-1.jpg</code>,{' '}
          <code className="text-dbs-gold">banniere-2.jpg</code>,{' '}
          <code className="text-dbs-gold">banniere-3.jpg</code> dans le dossier public/
        </p>
      </div>
    )
  }
  return (
    <img
      src={candidates[i]}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover object-center"
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
    <section className="relative overflow-hidden w-full aspect-[21/9] min-h-[280px] max-h-[560px] bg-dbs-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Link to={slide.href} className="block absolute inset-0 z-10" aria-label={slide.label}>
            <span className="sr-only">{slide.label}</span>
          </Link>
          <BannerImage candidates={slide.images} alt={slide.label} />
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-white/20 bg-black/50 text-white hover:border-dbs-gold hover:text-dbs-gold flex items-center justify-center transition"
        aria-label="Bannière précédente"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full border border-white/20 bg-black/50 text-white hover:border-dbs-gold hover:text-dbs-gold flex items-center justify-center transition"
        aria-label="Bannière suivante"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-dbs-gold' : 'w-1.5 bg-white/40'}`}
            aria-label={`Bannière ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
