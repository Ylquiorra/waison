import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Footer from '../components/Footer';
import Header from '../components/Header';

const MainLayout = () => {
  const { openBurger } = useSelector((state) => state.clickOutsideSlice);
  return (
    <div className="wrapper">
      <Header />
      <>
        <Outlet />
      </>
      <Footer />
      <div className={`${openBurger ? ' over__dark-active' : 'over__dark-disable'}`}></div>
    </div>
  );
};

export default MainLayout;
