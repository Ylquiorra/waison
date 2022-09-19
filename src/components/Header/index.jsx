import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PopupCart from './PopupCart';
import Search from '../Search';

const Header = ({ openBurger, setOpenBurger }) => {
  const { totalCount } = useSelector((state) => state.productCartSlice);
  const location = useLocation();

  const [openCartPopup, setOpenCartPopup] = React.useState(false);

  const burgerRef = React.useRef();
  const iconBurgerRef = React.useRef();
  const cartPopupRef = React.useRef();
  const iconCartPopupRef = React.useRef();

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.path.includes(iconBurgerRef.current) && !e.path.includes(burgerRef.current)) {
        setOpenBurger(false);
      }
      if (!e.path.includes(iconCartPopupRef.current) && !e.path.includes(cartPopupRef.current)) {
        setOpenCartPopup(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  const onClickToLinks = () => setOpenBurger(false);
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
                <Link to="account" onClick={onClickToLinks}>
                  <li>
                    <p>Аккаунт</p>
                  </li>
                </Link>
                <Link to="cart" onClick={onClickToLinks}>
                  <li>
                    <p>Корзина</p>
                  </li>
                </Link>
                <Link to="wishlist" onClick={onClickToLinks}>
                  <li>
                    <p>Избранное</p>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <header className="header">
        <div className="header__container">
          <div className="header__body">
            <Link to="/">
              <div className="header__logo">
                <svg
                  width="58"
                  height="32"
                  viewBox="0 0 58 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.154785 31.5L20.5472 0L29.0001 13.0571L37.453 0L57.8454 31.5H40.9397H17.0605H0.154785ZM24.4151 27.5H33.5851L29.0001 20.4176L24.4151 27.5ZM26.6176 16.7373L19.6501 27.5H7.50934L20.5472 7.36051L26.6176 16.7373ZM31.3826 16.7373L38.3502 27.5H50.4909L37.453 7.36051L31.3826 16.7373Z"
                    fill="#7F7F7F"
                  />
                </svg>
              </div>
            </Link>
            <div className="header__nav">
              <div className="nav-header__list">
                <ul>
                  <li>
                    <a href="#">ГЛАВНАЯ</a>
                  </li>
                  <li>
                    <a href="#">МАГАЗИН</a>
                  </li>
                </ul>
              </div>
              <div className="nav-header__right-menu">
                {location.pathname === '/' && <Search />}
                {location.pathname === '/' && (
                  <>
                    <div
                      ref={iconCartPopupRef}
                      onClick={() => setOpenCartPopup(!openCartPopup)}
                      className={`${
                        openCartPopup
                          ? 'right-menu-header__cart right-menu-header__cart-active'
                          : 'right-menu-header__cart'
                      }`}>
                      <svg
                        width="26"
                        height="29"
                        viewBox="0 0 26 29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M10.5875 0.300238C10.007 0.447019 8.84905 1.11611 8.01404 1.7869C6.42543 3.06367 5.7626 4.26741 5.7626 5.87619C5.7626 6.70609 5.70832 6.75494 4.78254 6.75591C4.24335 6.75639 3.36883 6.9687 2.83869 7.22793C0.980795 8.13642 0.932244 8.30568 0.470256 15.5047C-0.153969 25.2343 -0.155477 26.6796 0.458194 27.4304C0.739849 27.7755 1.40418 28.2695 1.93402 28.5287C2.83869 28.971 3.5175 29 13 29C22.4825 29 23.1613 28.971 24.066 28.5287C24.5958 28.2695 25.2602 27.7755 25.5418 27.4304C26.1555 26.6796 26.154 25.2343 25.5297 15.5047C25.0678 8.30568 25.0192 8.13642 23.1613 7.22793C22.6312 6.9687 21.7563 6.75639 21.2175 6.75591C20.2917 6.75494 20.2374 6.70609 20.2374 5.87619C20.2374 4.41178 19.5878 3.13863 18.2167 1.91579C16.265 0.175221 13.4454 -0.422056 10.5875 0.300238ZM15.6426 2.56481C16.97 3.35965 17.6009 4.24444 17.7547 5.52798L17.9015 6.75494H13.0383H8.17507V5.92431C8.17507 4.31167 9.27274 2.90262 11.0399 2.24659C12.2416 1.80044 14.6432 1.96657 15.6426 2.56481ZM22.1876 9.01637C22.6936 9.31308 22.7895 10.1082 23.2273 17.6418C23.5648 23.4494 23.6158 26.0915 23.3971 26.4433C23.0913 26.9356 22.8715 26.9477 13.0763 27.0099L3.06788 27.0737L2.64962 26.5263C2.29167 26.0581 2.30584 24.7755 2.74702 17.6588C3.21293 10.1461 3.31666 9.30727 3.81635 9.01395C4.62603 8.53952 21.3776 8.54145 22.1876 9.01637ZM6.39045 10.3451C5.92454 11.043 6.99115 12.0724 7.77912 11.6857C8.1039 11.5264 8.32585 11.1337 8.32585 10.7185C8.32585 10.1398 8.18623 10.0066 7.51677 9.94445C6.95708 9.8927 6.60998 10.016 6.39045 10.3451ZM17.6392 10.2472C17.3789 10.791 17.622 11.3929 18.2209 11.6862C18.9971 12.0664 20.0755 11.0432 19.6192 10.3596C19.2564 9.8158 17.8828 9.7377 17.6392 10.2472Z"
                          fill="#7F7F7F"
                        />
                      </svg>
                      <div className="right-menu-header__cart-count">
                        <p>{totalCount}</p>
                      </div>
                    </div>
                    <PopupCart
                      cartPopupRef={cartPopupRef}
                      setOpenCartPopup={setOpenCartPopup}
                      openCartPopup={openCartPopup}
                    />
                  </>
                )}
                <div
                  ref={iconBurgerRef}
                  onClick={() => setOpenBurger(!openBurger)}
                  className="right-menu-header__burger">
                  <svg
                    width="24"
                    height="16"
                    viewBox="0 0 24 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="3" fill="#7F7F7F" />
                    <rect y="7" width="24" height="3" fill="#7F7F7F" />
                    <rect y="13" width="24" height="3" fill="#7F7F7F" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
