import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProductInPopup from '../ProductInPopup';

const PopupCart = ({ cartPopupRef, setOpenCartPopup, openCartPopup }) => {
  const { productInCart } = useSelector((state) => state.productCartSlice);
  const { totalPrice } = useSelector((state) => state.productCartSlice);

  return (
    <div
      ref={cartPopupRef}
      className={`${
        openCartPopup ? 'header-cart__popup  header-cart__popup-open' : 'header-cart__popup'
      }`}>
      <div className="header-cart__content">
        {productInCart.length > 0 ? (
          productInCart.map((objProductInCart) => (
            <ProductInPopup key={objProductInCart.id} {...objProductInCart} />
          ))
        ) : (
          <div className="header-cart__empty">
            <p>Корзина пуста</p>
            <p>Добавьте в корзину хотя бы один товар</p>
          </div>
        )}
        {productInCart.length > 0 ? (
          <>
            <div className="header-cart__content-total total-cart">
              <div className="total-cart__text">
                <p>Стоимость:</p>
              </div>
              <div className="total-cart__price">
                <p>{totalPrice} ₽.</p>
              </div>
            </div>
            <div className="header-cart__content-buttons cart-buttons">
              <Link to="cart">
                <div
                  onClick={() => setOpenCartPopup(false)}
                  className="cart-buttons__view-cart black-button">
                  <p>Посмотреть корзину</p>
                </div>
              </Link>
              <Link to="/checkout">
                <div className="cart-buttons__checkout ">
                  <p>Оформить</p>
                </div>
              </Link>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PopupCart;
