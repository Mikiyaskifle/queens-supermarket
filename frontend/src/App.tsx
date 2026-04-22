import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollToTopButton from './components/ScrollToTopButton'
import { CartProvider } from './context/cart'
import { ThemeProvider } from './context/theme'
import { ToastProvider } from './context/toast'
import { WishlistProvider } from './context/wishlist'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import HelpPage from './pages/HelpPage'
import NotFoundPage from './pages/NotFoundPage'
import OrdersPage from './pages/OrdersPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import ProfilePage from './pages/ProfilePage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ProductsPage from './pages/ProductsPage'
import SearchPage from './pages/SearchPage'
import WishlistPage from './pages/WishlistPage'

const pageVariants = {
  initial: { opacity: 0, y: 10, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -10, filter: 'blur(6px)' },
}

function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-[calc(100svh-80px)]"
    >
      {children}
    </motion.main>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <ThemeProvider>
      <ToastProvider>
        <WishlistProvider>
          <CartProvider>
            <div className="min-h-svh bg-hero dark:bg-heroDark">
              <Navbar />
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route
                    path="/"
                    element={
                      <Page>
                        <HomePage />
                      </Page>
                    }
                  />
                  <Route
                    path="/products"
                    element={
                      <Page>
                        <ProductsPage />
                      </Page>
                    }
                  />
                  <Route
                    path="/products/:productId"
                    element={
                      <Page>
                        <ProductDetailsPage />
                      </Page>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <Page>
                        <CartPage />
                      </Page>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <Page>
                        <CheckoutPage />
                      </Page>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <Page>
                        <OrdersPage />
                      </Page>
                    }
                  />
                  <Route
                    path="/order-success"
                    element={
                      <Page>
                        <OrderSuccessPage />
                      </Page>
                    }
                  />
                  <Route
                    path="/wishlist"
                    element={
                      <Page>
                        <WishlistPage />
                      </Page>
                    }
                  />
                  <Route
                    path="/search"
                    element={
                      <Page>
                        <SearchPage />
                      </Page>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <Page>
                        <ProfilePage />
                      </Page>
                    }
                  />
                  <Route
                    path="/help"
                    element={
                      <Page>
                        <HelpPage />
                      </Page>
                    }
                  />
                  <Route
                    path="/about"
                    element={
                      <Page>
                        <AboutPage />
                      </Page>
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <Page>
                        <ContactPage />
                      </Page>
                    }
                  />
                  <Route
                    path="*"
                    element={
                      <Page>
                        <NotFoundPage />
                      </Page>
                    }
                  />
                </Routes>
              </AnimatePresence>
              <Footer />
              <ScrollToTopButton />
            </div>
          </CartProvider>
        </WishlistProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

