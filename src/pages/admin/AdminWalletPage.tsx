import { Coins } from 'lucide-react'

export function AdminWalletPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">DBS Coin</h1>
        <p className="text-sm text-dbs-silver mt-1">Portefeuille fidélité — branchement Apps Script à venir</p>
      </div>
      <div className="bg-dbs-card border border-dbs-border rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-dbs-gold/15 flex items-center justify-center mx-auto mb-4">
          <Coins size={28} className="text-dbs-gold" />
        </div>
        <p className="text-dbs-silver text-sm max-w-md mx-auto">
          La gestion des soldes DBS Coin, récompenses et transactions sera reliée à Google Sheets via Apps Script dans la prochaine étape.
        </p>
      </div>
    </div>
  )
}
