import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { WhatsAppButton } from '../components/WhatsAppButton'
import { ToastContainer } from '../components/Toast'
import { MobileNav } from '../components/MobileNav'
import { ErrorBoundary } from '../components/ErrorBoundary'

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-dbs-black pb-14 lg:pb-0">
      <Header />
      <main id="main-content" className="flex-1 w-full overflow-x-hidden" tabIndex={-1}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <WhatsAppButton />
      <ToastContainer />
      <MobileNav />
    </div>
  )
}
