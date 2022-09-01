import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

import Cart from './pages/Cart';
import Home from './pages/Home';

import './scss/style.scss';

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<MainLayout />}></Route> */}
      <Route path="" element={<Home />} />
      <Route path="cart" element={<Cart />} />
    </Routes>
  );
};

export default App;
