import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, ArrowLeft } from 'lucide-react'
import { useAdminStore } from '../../store/adminStore'
import { Logo } from '../../components/Logo'

export function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const login = useAdminStore((s) => s.login)
  const isAuthenticated = useAdminStore((s) => s.isAuthenticated)
  const navigate = useNavigate()

  if (isAuthenticated) {
    navigate('/admin', { replace: true })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (login(password)) {
      navigate('/admin')
    } else {
      setError('Mot de passe incorrect')
    }
  }

  return (
    <div className="min-h-screen bg-dbs-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>
        <div className="bg-dbs-card border border-dbs-border rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-dbs-gold/15 flex items-center justify-center">
              <Lock size={18} className="text-dbs-gold" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Espace admin DBS</h1>
              <p className="text-xs text-dbs-silver">Tableau de bord · commandes · produits</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-pass" className="block text-sm text-dbs-silver mb-1.5">
                Mot de passe
              </label>
              <input
                id="admin-pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dbs-dark border border-dbs-border rounded-xl px-4 py-3 text-white focus:border-dbs-gold outline-none"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl gold-gradient text-dbs-black font-bold hover:opacity-95 transition"
            >
              Se connecter
            </button>
          </form>
          <p className="text-[11px] text-dbs-muted mt-4 text-center">
            Démo : mot de passe <code className="text-dbs-gold">DBS2026</code>
            <br />
            (sera remplacé par Google Apps Script)
          </p>
        </div>
        <Link to="/" className="flex items-center justify-center gap-2 mt-6 text-sm text-dbs-silver hover:text-dbs-gold">
          <ArrowLeft size={14} /> Retour à la boutique
        </Link>
      </div>
    </div>
  )
}
