import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setChangeSearchValue } from './redux/filter/slice';
import MainLayout from './layouts/MainLayout';
import Cart from './pages/Cart';
import Home from './pages/Home';

import './scss/style.scss';
import AppContext from './context';
import Wishlist from './pages/Wishlist';
import ProductCard from './pages/ProductCard';
import NotFound from './pages/NotFound';

const App = () => {
  const dispatch = useDispatch();
  const [openProductModal, setOpenProductModal] = React.useState(false);

  const onChangeSearchValue = (event) => {
    dispatch(setChangeSearchValue(event.target.value));
  };

  return (
    <AppContext.Provider
      value={{
        onChangeSearchValue,
        openProductModal,
        setOpenProductModal,
      }}>
      <Routes>
        <Route path="/" element={<MainLayout openProductModal={openProductModal} />}>
          <Route path="" element={<Home openProductModal={openProductModal} />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product/:id" element={<ProductCard />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
