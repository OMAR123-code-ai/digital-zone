import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, Minus, Plus, ShoppingCart, Zap, Truck, Shield, RotateCcw, Heart } from 'lucide-react'
import { products } from '../data/products'
import { formatPrice } from '../utils/format'
import { useCartStore } from '../store/cartStore'
import { useUserStore } from '../store/userStore'
import { ProductCard } from '../components/ProductCard'

export function ProductPage() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((s) => s.addItem)
  const { favorites, toggleFavorite } = useUserStore()

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Produit introuvable</h1>
        <Link to="/boutique" className="text-dbs-gold mt-4 inline-block">Retour à la boutique</Link>
      </div>
    )
  }

  const isFav = favorites.includes(product.id)
  const similar = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAdd = () => { for (let i = 0; i < quantity; i++) addItem(product) }
  const handleBuyNow = () => { handleAdd(); window.location.href = '/panier' }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-sm text-dbs-silver mb-6">
        <Link to="/" className="hover:text-dbs-gold">Accueil</Link>
        <span className="mx-2">/</span>
        <Link to="/boutique" className="hover:text-dbs-gold">Boutique</Link>
        <span className="mx-2">/</span>
        <span className="text-white">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden bg-dbs-card border border-dbs-border mb-4">
            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i)} className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${selectedImage === i ? 'border-dbs-gold' : 'border-dbs-border'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-dbs-gold mb-1">{product.brand}</p>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">{product.name}</h1>
            </div>
            <button onClick={() => toggleFavorite(product.id)} className={`p-2 rounded-full border ${isFav ? 'border-red-500 text-red-500' : 'border-dbs-border text-dbs-silver'}`}>
              <Heart size={20} fill={isFav ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className={i < Math.round(product.rating) ? 'text-dbs-gold fill-dbs-gold' : 'text-dbs-border'} />
            ))}
            <span className="text-sm text-dbs-silver">{product.rating} ({product.reviewCount} avis)</span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <span className="text-3xl font-bold text-dbs-gold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-dbs-silver line-through">{formatPrice(product.originalPrice)}</span>
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">-{product.discount}%</span>
              </>
            )}
          </div>

          <p className={`mt-2 text-sm ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {product.stock > 0 ? `✓ En stock — ${product.stock} unités` : '✗ Rupture de stock'}
          </p>

          <p className="mt-4 text-dbs-silver leading-relaxed">{product.description}</p>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm">Quantité</span>
            <div className="flex items-center border border-dbs-border rounded-lg">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:text-dbs-gold"><Minus size={16} /></button>
              <span className="px-4 font-medium">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="p-2 hover:text-dbs-gold"><Plus size={16} /></button>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button onClick={handleAdd} disabled={product.stock <= 0} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-dbs-gold text-dbs-gold font-semibold hover:bg-dbs-gold hover:text-dbs-black transition disabled:opacity-50">
              <ShoppingCart size={18} /> Ajouter au panier
            </button>
            <button onClick={handleBuyNow} disabled={product.stock <= 0} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl gold-gradient text-dbs-black font-bold hover:shadow-lg hover:shadow-dbs-gold/30 transition disabled:opacity-50">
              <Zap size={18} /> Acheter maintenant
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[{ icon: Truck, label: 'Livraison rapide' }, { icon: Shield, label: 'Paiement sécurisé' }, { icon: RotateCcw, label: 'Retours 7 jours' }].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <item.icon size={20} className="text-dbs-gold" />
                <span className="text-xs text-dbs-silver">{item.label}</span>
              </div>
            ))}
          </div>

          {product.features && (
            <div className="mt-8">
              <h3 className="font-semibold mb-3">Caractéristiques</h3>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-dbs-silver">
                    <span className="w-1.5 h-1.5 rounded-full bg-dbs-gold" />{f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-6">Produits similaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {similar.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  )
}
