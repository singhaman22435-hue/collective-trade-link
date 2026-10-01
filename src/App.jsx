import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Context
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { InquiryProvider } from './context/InquiryContext';

// Layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import Preloader from './components/Preloader';
import PageTransition from './components/PageTransition';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import BearingFinder from './pages/BearingFinder';
import BearingDoctor from './pages/BearingDoctor';
import CNZBearings from './pages/CNZBearings';

// Admin Pages
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';
import AdminAddProduct from './admin/AdminAddProduct';
import AdminInquiries from './admin/AdminInquiries';

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main style={{ marginTop: '80px' }}>
      <PageTransition>{children}</PageTransition>
    </main>
    <Footer />
    <ScrollToTop />
    <WhatsAppButton />
  </>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* ── Public Routes ── */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
        <Route path="/products/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
        <Route path="/finder" element={<PublicLayout><BearingFinder /></PublicLayout>} />
        <Route path="/doctor" element={<PublicLayout><BearingDoctor /></PublicLayout>} />
        <Route path="/cnz-bearings" element={<PublicLayout><CNZBearings /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

        {/* ── Admin Routes ── */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
        <Route path="/admin/products/add" element={<ProtectedRoute><AdminAddProduct /></ProtectedRoute>} />
        <Route path="/admin/products/edit/:id" element={<ProtectedRoute><AdminAddProduct /></ProtectedRoute>} />
        <Route path="/admin/inquiries" element={<ProtectedRoute><AdminInquiries /></ProtectedRoute>} />

        {/* Redirect /admin to /admin/dashboard */}
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <AuthProvider>
      <ProductProvider>
        <InquiryProvider>
          {loading && <Preloader onComplete={() => setLoading(false)} />}
          <Router>
            <AnimatedRoutes />
          </Router>
        </InquiryProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
