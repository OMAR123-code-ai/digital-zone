import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

const faqs = [
  {
    q: 'Comment passer une commande ?',
    a: 'Parcourez la boutique, ajoutez des produits au panier, puis suivez le paiement en 3 étapes (informations, livraison, paiement).',
  },
  {
    q: 'Quels sont les modes de paiement ?',
    a: 'Orange Money, Moov Money, Wave, carte bancaire et DBS Coin. Le montant exact s’affiche avant validation.',
  },
  {
    q: 'Quels sont les délais de livraison ?',
    a: 'En général 3 à 7 jours ouvrés au Burkina Faso. À l’international, comptez 7 à 21 jours selon la destination.',
  },
  {
    q: 'Puis-je retourner un produit ?',
    a: 'Oui, sous 7 jours pour un produit non utilisé dans son emballage d’origine. Contactez-nous sur WhatsApp pour organiser le retour.',
  },
  {
    q: 'Comment suivre ma commande ?',
    a: 'Utilisez la page Suivi de commande avec votre numéro (ex. DBS10245) et votre téléphone.',
  },
  {
    q: 'Produit introuvable dans le catalogue ?',
    a: 'Utilisez le formulaire « Proposez-le ici » : notre équipe sourcera le produit pour vous.',
  },
]

export function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="max-w-3xl mx-auto px-4 py-14">
      <h2 className="text-2xl font-bold text-center text-white mb-2">Questions fréquentes</h2>
      <p className="text-center text-dbs-silver text-sm mb-8">
        Les réponses essentielles — sans quitter la page d’accueil
      </p>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-dbs-card border border-dbs-border rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-medium text-sm text-white pr-4">{faq.q}</span>
              <ChevronDown
                size={18}
                className={`text-dbs-gold shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-dbs-silver leading-relaxed">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
      <p className="text-center mt-6 text-sm text-dbs-silver">
        Plus de détails ?{' '}
        <Link to="/faq" className="text-dbs-gold hover:underline">
          Voir toute la FAQ
        </Link>
      </p>
    </section>
  )
}
