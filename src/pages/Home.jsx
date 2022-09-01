import React from 'react';
import axios from 'axios';

import Sort from '../components/Sort';
import Header from '../components/Header';

import '../scss/style.scss';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';

function App() {
  const [openBurger, setOpenBurger] = React.useState(false);
  const [openSort, setOpenSort] = React.useState(false);
  const [openCartPopup, setOpenCartPopup] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(true);
  const [product, setProduct] = React.useState([]);
  const [changeSearchValue, setChangeSearchValue] = React.useState('');
  const [onChangeCategory, setOnchangeCategory] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [onChangeSort, setOnChangeSort] = React.useState({
    name: 'Умолчанию',
    sortProperty: 'default',
  });

  const burgerRef = React.useRef();
  const iconBurgerRef = React.useRef();
  const sortRef = React.useRef();
  const cartPopupRef = React.useRef();
  const iconCartPopupRef = React.useRef();

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.path.includes(iconBurgerRef.current) && !e.path.includes(burgerRef.current)) {
        setOpenBurger(false);
      }
      if (!e.path.includes(sortRef.current)) {
        setOpenSort(false);
      }
      if (!e.path.includes(iconCartPopupRef.current) && !e.path.includes(cartPopupRef.current)) {
        setOpenCartPopup(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  const fetchCategory = onChangeCategory > 0 ? `category=${onChangeCategory}` : '';
  const fetchOrder = onChangeSort.sortProperty.includes('-') ? 'desc' : 'asc';
  const fetchSortBy = onChangeSort.sortProperty.replace('-', '');
  const fetchSearch = changeSearchValue ? `&search=${changeSearchValue}` : '';
  const fetchPage = `page=${currentPage}&limit=3&`;

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [productResponse] = await Promise.all([
          axios.get(
            `https://630b2463f280658a59d6a747.mockapi.io/product?${fetchPage}${fetchCategory}&sortBy=${fetchSortBy}&order=${fetchOrder}${fetchSearch}`,
          ),
        ]);
        setProduct(productResponse.data);
        setIsLoading(false);
      } catch (error) {
        alert('Произошла ошибка при получении товаров с сервера');
        console.log('ERROR');
      }
    }
    setIsLoading(true); // из за этого 2 рендер
    fetchData(); // из за этого еще рендер (итого 2 лишних)
  }, [onChangeCategory, onChangeSort, changeSearchValue, currentPage]);

  const onChangeSearchValue = (event) => {
    setChangeSearchValue(event.target.value);
  };

  const onSelectSort = (obj) => {
    setOnChangeSort(obj);
    setOpenSort(false);
  };

  const productItemsLessCode = product.map((objProduct) => (
    <Card {...objProduct} key={objProduct.id} image={objProduct.imageUrl} />
  ));
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
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
      <Header
        openBurger={() => setOpenBurger(true)}
        iconBurgerRef={iconBurgerRef}
        cartPopupRef={cartPopupRef}
        iconCartPopupRef={iconCartPopupRef}
        onChangeSearchValue={onChangeSearchValue}
        changeSearchValue={changeSearchValue}
        openCartPopup={openCartPopup}
        setOpenCartPopup={setOpenCartPopup}
      />
      <main className="product">
        <div className="product__container">
          <div className="product__filter">
            <div className="filter-product__row">
              <Categories
                onChangeCategory={onChangeCategory}
                setOnchangeCategory={setOnchangeCategory}
              />
              <Sort
                openSort={openSort}
                setOpenSort={setOpenSort}
                sortRef={sortRef}
                onChangeSort={onChangeSort}
                onSelectSort={onSelectSort}
              />
            </div>
          </div>
          <div className="body-product__grid">
            <div className="body-product__grid-items">
              {isLoading ? skeleton : productItemsLessCode}
            </div>
          </div>
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </main>
      <Footer />
      <div className={`${openBurger ? ' over__dark-active' : 'over__dark-disable'}`}></div>
    </>
  );
}

export default App;
