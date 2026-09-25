import { MessageCircle, Mail, Clock } from 'lucide-react'

export function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-center mb-2 text-white">Contact / Support</h1>
      <p className="text-center text-dbs-silver mb-10">Une question ? Notre équipe est là pour vous !</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
              <MessageCircle size={22} className="text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">WhatsApp</h3>
              <p className="text-sm text-dbs-silver">+226 73 19 07 10</p>
              <a
                href="https://wa.me/22673190710"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-dbs-gold hover:underline"
              >
                Discuter sur WhatsApp →
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-dbs-gold/20 flex items-center justify-center shrink-0">
              <Mail size={22} className="text-dbs-gold" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Email</h3>
              <p className="text-sm text-dbs-silver">support@dbs-store.com</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-dbs-gold/20 flex items-center justify-center shrink-0">
              <Clock size={22} className="text-dbs-gold" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Horaires</h3>
              <p className="text-sm text-dbs-silver">Lun - Dim : 8h00 – 22h00</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            alert('Message envoyé ! Nous vous répondrons rapidement.')
          }}
          className="bg-dbs-card border border-dbs-border rounded-2xl p-6 space-y-4"
        >
          <h3 className="font-bold text-white">Envoyez-nous un message</h3>
          <input
            placeholder="Votre nom"
            required
            className="w-full bg-dbs-dark border border-dbs-border rounded-lg px-4 py-2.5 outline-none focus:border-dbs-gold"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full bg-dbs-dark border border-dbs-border rounded-lg px-4 py-2.5 outline-none focus:border-dbs-gold"
          />
          <textarea
            placeholder="Message"
            rows={4}
            required
            className="w-full bg-dbs-dark border border-dbs-border rounded-lg px-4 py-2.5 outline-none focus:border-dbs-gold resize-none"
          />
          <button type="submit" className="w-full py-3 rounded-xl gold-gradient text-dbs-black font-bold">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  )
}
