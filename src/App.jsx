import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setChangeSearchValue } from './redux/filter/slice';
import { setOpenBurger, setOpenSort, setOpenCartPopup } from './redux/clickOutside/slice';
import MainLayout from './layouts/MainLayout';
import Cart from './pages/Cart';
import Home from './pages/Home';

import './scss/style.scss';
import AppContext from './context';

const App = () => {
  const dispatch = useDispatch();

  const burgerRef = React.useRef();
  const iconBurgerRef = React.useRef();
  const cartPopupRef = React.useRef();
  const iconCartPopupRef = React.useRef();
  const sortRef = React.useRef();

  //* из за этой части кода лишние перересовки (что то сделать)
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.path.includes(iconBurgerRef.current) && !e.path.includes(burgerRef.current)) {
        dispatch(setOpenBurger(false));
      }
      if (!e.path.includes(sortRef.current)) {
        dispatch(setOpenSort(false));
      }
      if (!e.path.includes(iconCartPopupRef.current) && !e.path.includes(cartPopupRef.current)) {
        dispatch(setOpenCartPopup(false));
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  const onChangeSearchValue = (event) => {
    dispatch(setChangeSearchValue(event.target.value));
  };

  return (
    <AppContext.Provider
      value={{
        burgerRef,
        iconBurgerRef,
        iconCartPopupRef,
        cartPopupRef,
        onChangeSearchValue,
        sortRef,
      }}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
