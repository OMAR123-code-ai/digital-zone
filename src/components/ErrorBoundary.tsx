import { Component, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 text-center">
          <AlertTriangle size={48} className="text-dbs-gold mb-4" />
          <h2 className="text-xl font-bold mb-2">Oups, une erreur est survenue</h2>
          <p className="text-dbs-silver text-sm mb-6">
            Nous travaillons à résoudre le problème. Réessayez ou retournez à l'accueil.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false })
              window.location.href = '/'
            }}
            className="px-6 py-2.5 rounded-full gold-gradient text-dbs-black font-bold text-sm"
          >
            Retour à l'accueil
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
