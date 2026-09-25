import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Product } from '../types'
import { formatPrice } from '../utils/format'
import { useCartStore } from '../store/cartStore'
import { useUserStore } from '../store/userStore'
import { useToastStore } from '../store/toastStore'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const { favorites, toggleFavorite } = useUserStore()
  const addToast = useToastStore((s) => s.addToast)
  const isFav = favorites.includes(product.id)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
    addToast('success', `${product.name.split(' ').slice(0, 3).join(' ')} ajouté au panier`)
  }

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(product.id)
    addToast(isFav ? 'info' : 'success', isFav ? 'Retiré des favoris' : 'Ajouté aux favoris')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link to={`/produit/${product.slug}`} className="group block bg-dbs-card border border-dbs-border rounded-2xl overflow-hidden card-hover">
        <div className="relative aspect-square overflow-hidden bg-dbs-dark">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          {product.discount && product.discount > 0 && (
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-md">-{product.discount}%</span>
          )}
          {product.isNew && (
            <span className="absolute top-3 right-12 bg-dbs-gold text-dbs-black text-xs font-bold px-2 py-1 rounded-md">Nouveau</span>
          )}
          <button onClick={handleFav} className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition ${isFav ? 'bg-red-500/90 text-white' : 'bg-black/40 text-white hover:bg-dbs-gold hover:text-dbs-black'}`} aria-label="Favoris">
            <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="p-4">
          <p className="text-xs text-dbs-silver mb-1">{product.brand}</p>
          <h3 className="text-sm font-medium text-white line-clamp-2 min-h-[2.5rem] group-hover:text-dbs-gold transition">{product.name}</h3>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className={i < Math.round(product.rating) ? 'text-dbs-gold fill-dbs-gold' : 'text-dbs-border'} />
            ))}
            <span className="text-xs text-dbs-silver ml-1">({product.reviewCount})</span>
          </div>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-lg font-bold text-dbs-gold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-dbs-silver line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <p className={`text-xs mt-1 ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {product.stock > 0 ? `En stock (${product.stock})` : 'Rupture de stock'}
          </p>
          <button onClick={handleAdd} disabled={product.stock <= 0} className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-dbs-gold text-dbs-black font-semibold text-sm hover:bg-dbs-gold-light transition disabled:opacity-50 disabled:cursor-not-allowed">
            <ShoppingCart size={16} />
            Ajouter au panier
          </button>
        </div>
      </Link>
    </motion.div>
  )
}
