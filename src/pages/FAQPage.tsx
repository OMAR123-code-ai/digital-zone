import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'Comment passer une commande ?', a: 'Parcourez la boutique, ajoutez des produits au panier, puis suivez le processus de paiement en 3 étapes.' },
  { q: 'Quels sont les modes de paiement ?', a: 'Orange Money, Moov Money, Wave, carte bancaire et DBS Coin.' },
  { q: 'Quels sont les délais de livraison ?', a: '3 à 7 jours ouvrés au Burkina Faso. International : 7 à 21 jours.' },
  { q: 'Puis-je retourner un produit ?', a: 'Oui, 7 jours pour retourner un produit non utilisé dans son emballage d\'origine.' },
  { q: 'Qu\'est-ce que le DBS Coin ?', a: 'Notre monnaie virtuelle. 1 DBS = 1 FCFA. Vous pouvez en acheter, en gagner et les utiliser pour payer.' },
  { q: 'Comment suivre ma commande ?', a: 'Page Suivi de commande : entrez votre numéro (ex: DBS10245) et votre téléphone.' },
]

export function FAQPage() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-center mb-8">Questions fréquentes</h1>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-dbs-card border border-dbs-border rounded-xl overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
              <span className="font-medium text-sm">{faq.q}</span>
              <ChevronDown size={18} className={`text-dbs-gold transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && <div className="px-5 pb-4 text-sm text-dbs-silver leading-relaxed">{faq.a}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
