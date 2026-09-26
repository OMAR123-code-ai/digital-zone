import { Quote, Star } from 'lucide-react'

const items = [
  {
    name: 'Amadou K.',
    role: 'Ouagadougou',
    text: 'Commande reçue rapidement, produit conforme. Le suivi WhatsApp est très pratique.',
  },
  {
    name: 'Fatou B.',
    role: 'Abidjan',
    text: 'Service pro et paiement simple. Je recommande DBS pour le high-tech.',
  },
  {
    name: 'Jean-Marc T.',
    role: 'Dakar',
    text: 'Très bon rapport qualité-prix. L’équipe a trouvé un accessoire que je ne trouvais nulle part.',
  },
]

export function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <h2 className="text-2xl font-bold text-center text-white mb-2">
        Ce que disent <span className="gold-text">nos clients</span>
      </h2>
      <p className="text-center text-dbs-silver text-sm mb-10">
        La confiance se construit commande après commande
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((t) => (
          <div
            key={t.name}
            className="bg-dbs-card border border-dbs-border rounded-2xl p-6 relative"
          >
            <Quote size={28} className="text-dbs-gold/30 absolute top-4 right-4" />
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-dbs-gold fill-dbs-gold" />
              ))}
            </div>
            <p className="text-sm text-dbs-silver leading-relaxed mb-4">« {t.text} »</p>
            <p className="font-semibold text-white text-sm">{t.name}</p>
            <p className="text-xs text-dbs-muted">{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
