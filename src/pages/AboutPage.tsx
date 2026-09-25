import { Logo } from '../components/Logo'

export function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <Logo size="lg" className="justify-center" />
        <h1 className="text-2xl font-bold mt-6">À propos de DBS</h1>
        <p className="text-dbs-silver mt-2">Votre partenaire de confiance pour des produits de qualité et un service d'excellence.</p>
      </div>
      <div className="space-y-8 text-dbs-silver leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-white mb-3">Notre mission</h2>
          <p>Offrir les meilleurs produits au meilleur prix, avec une expérience d'achat premium adaptée au marché africain et international.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-white mb-3">Notre vision</h2>
          <p>Devenir la référence e-commerce en Afrique de l'Ouest et dans le monde.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold text-white mb-3">Nos valeurs</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Qualité & Confiance</li>
            <li>Innovation</li>
            <li>Satisfaction client</li>
            <li>Transparence</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
