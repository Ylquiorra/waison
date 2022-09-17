import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './scss/style.scss';
import AppContext from './context';

import Wishlist from './pages/Wishlist';
import ProductCard from './pages/ProductCard';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import MainLayout from './layouts/MainLayout';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Account from './pages/Account';
import Register from './pages/Register';

const App = () => {
  const [openProductModal, setOpenProductModal] = React.useState(false);

  React.useEffect(() => {
    if (openProductModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [openProductModal]);

  return (
    <AppContext.Provider
      value={{
        openProductModal,
        setOpenProductModal,
      }}>
      <Routes>
        <Route path="/" element={<MainLayout openProductModal={openProductModal} />}>
          <Route path="" element={<Home openProductModal={openProductModal} />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product/:id" element={<ProductCard />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
