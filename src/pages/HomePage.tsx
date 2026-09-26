import { Link } from 'react-router-dom'
import { Smartphone, Shirt, Watch, Home, Sparkles, Dumbbell, Cpu, Tag, ArrowRight, Truck, Shield, Headphones, Award } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { Newsletter } from '../components/Newsletter'
import { ProductRequest } from '../components/ProductRequest'
import { ProductCompare } from '../components/ProductCompare'
import { HeroBanner } from '../components/HeroBanner'
import { HomeFAQ } from '../components/HomeFAQ'
import { Testimonials } from '../components/Testimonials'
import { WhyUs } from '../components/WhyUs'
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
      <HeroBanner />

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
          {categoryIcons.map((cat) => {
            const Icon = cat.icon
            return (
              <Link
                key={cat.id}
                to={`/boutique?categorie=${cat.id}`}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-dbs-card transition group"
              >
                <div className="w-12 h-12 rounded-full bg-dbs-card border border-dbs-border flex items-center justify-center group-hover:border-dbs-gold group-hover:bg-dbs-gold/10 transition">
                  <Icon size={22} className="text-dbs-gold" />
                </div>
                <span className="text-xs text-dbs-silver text-center group-hover:text-white transition">{cat.name}</span>
              </Link>
            )
          })}
        </div>
      </section>

      <WhyUs />

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">
            Nos <span className="gold-text">meilleures ventes</span>
          </h2>
          <Link to="/boutique" className="text-sm text-dbs-gold hover:text-dbs-gold-light flex items-center gap-1">
            Voir tout <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
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
                <p className="font-semibold text-sm text-white">{item.title}</p>
                <p className="text-xs text-dbs-silver">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">
            Tous nos <span className="gold-text">produits</span>
          </h2>
          <Link to="/boutique" className="text-sm text-dbs-gold hover:text-dbs-gold-light flex items-center gap-1">
            Voir tout <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.slice(0, 8).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      <ProductCompare />

      <ProductRequest />

      <Testimonials />

      <HomeFAQ />

      <Newsletter />
    </div>
  )
}
