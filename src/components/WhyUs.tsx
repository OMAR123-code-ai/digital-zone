import { Truck, Headphones, Award, Cpu, Shield } from 'lucide-react'

const items = [
  { icon: Truck, title: 'Livraison fiable et rapide', desc: 'Suivi clair, délais maîtrisés.' },
  { icon: Headphones, title: 'Service client réactif', desc: 'Disponible 24h/7j via WhatsApp.' },
  { icon: Award, title: 'Produits de bonne qualité', desc: 'Sélectionnés pour vos attentes.' },
  { icon: Cpu, title: 'Avenir tech et innovant', desc: 'Solutions modernes au quotidien.' },
  { icon: Shield, title: 'Paiement sécurisé', desc: 'Transactions protégées.' },
]

export function WhyUs() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="text-center mb-10">
        <p className="text-dbs-gold text-sm font-medium mb-2">Votre entreprise de référence</p>
        <h2 className="text-2xl font-bold text-white">Pourquoi nous choisir ?</h2>
        <p className="text-dbs-silver text-sm mt-2 max-w-xl mx-auto">
          Nous vous accompagnons avec des solutions fiables, modernes et pensées pour votre réussite.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="bg-dbs-card border border-dbs-border rounded-2xl p-5 text-center hover:border-dbs-gold/40 transition"
          >
            <div className="w-12 h-12 rounded-full bg-dbs-gold/10 flex items-center justify-center mx-auto mb-3">
              <item.icon size={22} className="text-dbs-gold" />
            </div>
            <h3 className="font-semibold text-sm text-white mb-1">{item.title}</h3>
            <p className="text-xs text-dbs-silver">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
