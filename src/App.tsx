import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ShoppingProvider } from './context/ShoppingContext';

// Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { QuickViewModal } from './components/common/QuickViewModal';
import { AuthModal } from './components/common/AuthModal';
import { CompleteLookModal } from './components/look/CompleteLookModal';

// Pages
import { HomePage } from './pages/HomePage';
import { MoodShoppingPage } from './pages/MoodShoppingPage';
import { CompleteLookPage } from './pages/CompleteLookPage';
import { StyleDiscoveryPage } from './pages/StyleDiscoveryPage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ProfilePage } from './pages/ProfilePage';
import { CheckoutPage } from './pages/CheckoutPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-ivory-50 text-charcoal-900">
      <ScrollToTop />
      
      {/* Navigation Bar */}
      <Navbar onOpenAuth={() => setAuthModalOpen(true)} />

      {/* Main Page Routes */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/moods" element={<MoodShoppingPage />} />
          <Route path="/complete-look" element={<CompleteLookPage />} />
          <Route path="/complete-look/:productId" element={<CompleteLookPage />} />
          <Route path="/style-discovery" element={<StyleDiscoveryPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals and Drawers */}
      <CartDrawer />
      <QuickViewModal />
      <CompleteLookModal />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ShoppingProvider>
        <Router>
          <AppContent />
        </Router>
      </ShoppingProvider>
    </AuthProvider>
  );
};

export default App;
