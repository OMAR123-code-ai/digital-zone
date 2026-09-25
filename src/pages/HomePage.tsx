import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Smartphone, Shirt, Watch, Home, Sparkles, Dumbbell, Cpu, Tag, ArrowRight, Truck, Shield, Headphones, Award } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { Newsletter } from '../components/Newsletter'
import { products } from '../data/products'

const categoryIcons = [
  { id: 'electronique', name: 'Électronique', icon: Smartphone },
  { id: 'mode', name: 'Mode', icon: Shirt },
  { id: 'accessoires', name: 'Accessoires', icon: Watch },
  { id: 'maison', name: 'Maison & Lifestyle', icon: Home },
  { id: 'beaute', name: 'Beauté', icon: Sparkles },
  { id: 'sport', name: 'Sport', icon: Dumbbell },
  { id: 'high-tech', name: 'High-Tech', icon: Cpu },
  { id: 'promotions', name: 'Promotions', icon: Tag },
]

export function HomePage() {
  const featured = products.filter((p) => p.isFeatured).slice(0, 5)

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dbs-black via-dbs-dark to-dbs-black" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-dbs-gold/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-dbs-gold/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Des produits de qualité<br />
              <span className="gold-text">pour un quotidien meilleur</span>
            </h1>
            <p className="mt-4 text-dbs-silver text-lg max-w-md">
              Mode, high-tech, beauté, maison, accessoires et bien plus encore.
            </p>
            <Link to="/boutique" className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-full gold-gradient text-dbs-black font-bold text-base hover:shadow-lg hover:shadow-dbs-gold/30 transition">
              Découvrir maintenant <ArrowRight size={18} />
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              {featured.slice(0, 4).map((p, i) => (
                <div key={p.id} className={`rounded-2xl overflow-hidden border border-dbs-border ${i === 0 ? 'col-span-2 aspect-[2/1]' : 'aspect-square'}`}>
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
          {categoryIcons.map((cat) => {
            const Icon = cat.icon
            return (
              <Link key={cat.id} to={`/boutique?categorie=${cat.id}`} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-dbs-card transition group">
                <div className="w-12 h-12 rounded-full bg-dbs-card border border-dbs-border flex items-center justify-center group-hover:border-dbs-gold group-hover:bg-dbs-gold/10 transition">
                  <Icon size={22} className="text-dbs-gold" />
                </div>
                <span className="text-xs text-dbs-silver text-center group-hover:text-white transition">{cat.name}</span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Nos <span className="gold-text">meilleures ventes</span></h2>
          <Link to="/boutique" className="text-sm text-dbs-gold hover:text-dbs-gold-light flex items-center gap-1">Voir tout <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      <section className="bg-dbs-dark border-y border-dbs-border py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: 'Livraison rapide', desc: 'Dans le monde entier' },
            { icon: Shield, title: 'Paiement sécurisé', desc: '100% sécurisé' },
            { icon: Award, title: 'Produits authentiques', desc: '100% originaux' },
            { icon: Headphones, title: 'Service client 24/7', desc: 'Toujours à votre écoute' },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-dbs-gold/10 flex items-center justify-center shrink-0">
                <item.icon size={22} className="text-dbs-gold" />
              </div>
              <div>
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-xs text-dbs-silver">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Tous nos <span className="gold-text">produits</span></h2>
          <Link to="/boutique" className="text-sm text-dbs-gold hover:text-dbs-gold-light flex items-center gap-1">Voir tout <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 8).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      <Newsletter />
    </div>
  )
}
