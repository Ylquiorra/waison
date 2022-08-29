import React from 'react';
import axios from 'axios';

import Sort from './components/Sort';
import Header from './components/Header';

import './scss/style.scss';
import Footer from './components/Footer';
import Card from './components/Card';
import Skeleton from './components/Skeleton';
import Categories from './components/Categories';

function App() {
  const [openBurger, setOpenBurger] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [product, setProduct] = React.useState([]);

  const burgerRef = React.useRef();
  const iconBurgerRef = React.useRef();

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.path.includes(iconBurgerRef.current) && !e.path.includes(burgerRef.current)) {
        setOpenBurger(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [productResponse] = await Promise.all([
          axios.get('https://630b2463f280658a59d6a747.mockapi.io/product'),
        ]);
        setProduct(productResponse.data);
        setIsLoading(false);
      } catch (error) {
        alert('Произошла ошибка при получении товаров с сервера');
        console.log('ERROR');
      }
    }
    fetchData();
  }, []);

  const productItemsLessCode = product.map((objProduct) => (
    <Card {...objProduct} key={objProduct.id} image={objProduct.imageUrl} />
  ));
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="wrapper">
      <section
        ref={burgerRef}
        className={`${
          openBurger ? 'burger-menu__open burger-menu' : 'burger-menu__close burger-menu'
        }`}>
        <div className="burger-menu__small-container">
          <div className="burger-menu__body">
            <div onClick={() => setOpenBurger(false)} className="body-menu__close">
              Close
            </div>
            <div className="body-menu__list">
              <ul>
                <li>
                  <a href="#">Account</a>
                </li>
                <li>
                  <a href="#">Cart</a>
                </li>
                <li>
                  <a href="#">Wishlist</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Header openBurger={() => setOpenBurger(true)} iconBurgerRef={iconBurgerRef} />
      <main className="product">
        <div className="product__container">
          <div className="product__filter">
            <div className="filter-product__row">
              <Categories />
              <Sort />
            </div>
          </div>
          <div className="body-product__grid">
            <div className="body-product__grid-items">
              {isLoading ? skeleton : productItemsLessCode}
            </div>
          </div>
          <div className="product__pagination">
            <div className="body-pagination__page">
              <b>1</b>
              <b>2</b>
              <div className="body-pagination__arrow">
                <svg
                  width="25"
                  height="16"
                  viewBox="0 0 25 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M24.7071 8.70711C25.0976 8.31658 25.0976 7.68342 24.7071 7.29289L18.3431 0.928932C17.9526 0.538408 17.3195 0.538408 16.9289 0.928932C16.5384 1.31946 16.5384 1.95262 16.9289 2.34315L22.5858 8L16.9289 13.6569C16.5384 14.0474 16.5384 14.6805 16.9289 15.0711C17.3195 15.4616 17.9526 15.4616 18.3431 15.0711L24.7071 8.70711ZM0 9H24V7H0V9Z"
                    fill="#7F7F7F"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <div className={`${openBurger ? ' over__dark-active' : 'over__dark-disable'}`}></div>
    </div>
  );
}

export default App;
