import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductPage from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import MyOrdersPage from './pages/MyOrder';

import { fetchUserProfile } from './services/auth/authSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<MyOrdersPage />} />
        <Route path="*" element={<NotFound />} /> {/* Handle all unmatched routes */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
