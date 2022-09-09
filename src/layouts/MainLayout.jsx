import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Footer from '../components/Footer';
import Header from '../components/Header';

const MainLayout = ({ openProductModal }) => {
  const [openBurger, setOpenBurger] = React.useState(false);
  return (
    <div className="wrapper">
      <Header openBurger={openBurger} setOpenBurger={setOpenBurger} />
      <>
        <Outlet />
      </>
      <Footer />
      <div
        className={`${
          openBurger || openProductModal ? ' over__dark-active' : 'over__dark-disable'
        }`}></div>
    </div>
  );
};

export default MainLayout;
