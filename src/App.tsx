import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  )
}
