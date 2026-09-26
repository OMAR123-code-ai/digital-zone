import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { AdminLayout } from './layouts/AdminLayout'
import { HomePage } from './pages/HomePage'
import { ShopPage } from './pages/ShopPage'
import { ProductPage } from './pages/ProductPage'
import { CartPage } from './pages/CartPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { ConfirmationPage } from './pages/ConfirmationPage'
import { ReceiptPage } from './pages/ReceiptPage'
import { TrackingPage } from './pages/TrackingPage'
import { AccountPage } from './pages/AccountPage'
import { ContactPage } from './pages/ContactPage'
import { FAQPage } from './pages/FAQPage'
import { AboutPage } from './pages/AboutPage'
import { AdminLoginPage } from './pages/admin/AdminLoginPage'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage'
import { AdminProductsPage } from './pages/admin/AdminProductsPage'
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage'
import { AdminWalletPage } from './pages/admin/AdminWalletPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Boutique publique */}
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="boutique" element={<ShopPage />} />
          <Route path="produit/:slug" element={<ProductPage />} />
          <Route path="panier" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="confirmation/:orderNumber" element={<ConfirmationPage />} />
          <Route path="recu/:orderNumber" element={<ReceiptPage />} />
          <Route path="tracking" element={<TrackingPage />} />
          <Route path="compte" element={<AccountPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="a-propos" element={<AboutPage />} />
        </Route>

        {/* Admin DBS */}
        <Route path="admin/login" element={<AdminLoginPage />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="commandes" element={<AdminOrdersPage />} />
          <Route path="produits" element={<AdminProductsPage />} />
          <Route path="clients" element={<AdminCustomersPage />} />
          <Route path="dbs-coin" element={<AdminWalletPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
