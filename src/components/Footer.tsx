import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-dbs-dark border-t border-dbs-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Logo size="md" />
            <p className="mt-4 text-sm text-dbs-silver leading-relaxed">
              Votre partenaire de confiance pour des produits de qualité et un service d'excellence.
            </p>
            <div className="flex gap-3 mt-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-dbs-card border border-dbs-border flex items-center justify-center text-dbs-silver hover:text-dbs-gold hover:border-dbs-gold transition">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Liens utiles</h4>
            <ul className="space-y-2 text-sm text-dbs-silver">
              <li><Link to="/a-propos" className="hover:text-dbs-gold transition">À propos</Link></li>
              <li><Link to="/boutique" className="hover:text-dbs-gold transition">Boutique</Link></li>
              <li><Link to="/faq" className="hover:text-dbs-gold transition">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-dbs-gold transition">Contact</Link></li>
              <li><Link to="/tracking" className="hover:text-dbs-gold transition">Suivi commande</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Catégories</h4>
            <ul className="space-y-2 text-sm text-dbs-silver">
              <li><Link to="/boutique?categorie=electronique" className="hover:text-dbs-gold transition">Électronique</Link></li>
              <li><Link to="/boutique?categorie=mode" className="hover:text-dbs-gold transition">Mode</Link></li>
              <li><Link to="/boutique?categorie=accessoires" className="hover:text-dbs-gold transition">Accessoires</Link></li>
              <li><Link to="/boutique?categorie=beaute" className="hover:text-dbs-gold transition">Beauté</Link></li>
              <li><Link to="/boutique?categorie=high-tech" className="hover:text-dbs-gold transition">High-Tech</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Service client</h4>
            <ul className="space-y-2 text-sm text-dbs-silver">
              <li><Link to="/tracking" className="hover:text-dbs-gold transition">Suivi commande</Link></li>
              <li><Link to="/faq" className="hover:text-dbs-gold transition">FAQ</Link></li>
              <li><a href="#" className="hover:text-dbs-gold transition">Conditions générales</a></li>
              <li><a href="#" className="hover:text-dbs-gold transition">Retour & remboursement</a></li>
            </ul>
            <div className="mt-4">
              <p className="text-xs text-dbs-silver mb-2">Moyens de paiement</p>
              <div className="flex flex-wrap gap-2">
                {['Orange Money', 'Moov', 'Wave', 'VISA'].map((m) => (
                  <span key={m} className="px-2 py-1 bg-dbs-card border border-dbs-border rounded text-[10px] text-dbs-silver">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-dbs-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-dbs-silver">
          <p>© 2026 DBS — Digital Business Store. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <span>✓ Produits authentiques</span>
            <span>✓ Paiement sécurisé</span>
            <span>✓ Livraison rapide</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
