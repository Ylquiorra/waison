import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import EmptyItem from '../components/EmptyItem';

import ProductInCart from '../components/ProductInCart';

const Cart = () => {
  const { productInCart, totalPrice } = useSelector((state) => state.productCartSlice);

  const arrChecked = ['Бесплатная доставка', 'Быстрая доставка', 'Самовывоз'];
  const [changeChecked, setChangeChecked] = React.useState('Бесплатная доставка');

  const totalPriceWithFastDelevery = totalPrice + 500;

  return (
    <main className="cart universal">
      <div className="cart__container universal__container">
        <div className="cart__body body-cart universal-body">
          <div className="body-cart__content universal-body__content">
            <div className="body-cart__content-breadcrumbs universal-body__content-breadcrumbs">
              <ul>
                <Link to="/">
                  <li>
                    <p>Начальная страница</p>
                  </li>
                </Link>
                <li>
                  <p>корзина</p>
                </li>
              </ul>
            </div>
            <div className="body-cart__title universal-body__title">
              <h1>Корзина</h1>
            </div>
          </div>
          {productInCart.length > 0 ? (
            <div className="body-cart__items">
              <div className="body-cart__item item-in-cart">
                {productInCart.map((objProductInCart) => (
                  <ProductInCart key={objProductInCart.id} {...objProductInCart} />
                ))}
              </div>
              <div className="body-cart__total total-cart">
                <div className="total-cart__body total-body">
                  <div className="total-body__title">
                    <h2>Итого</h2>
                  </div>
                  <div className="total-body__table total-table">
                    <div className="total-table__grid">
                      <div className="total-table__grid-subtotal">
                        <p>Первичная стоимость</p>
                      </div>
                      <div className="total-table__grid-subtotal-title">
                        <p>{totalPrice} ₽.</p>
                      </div>
                      <div className="total-table__grid-shipping">
                        <p>Доставка</p>
                      </div>
                      <div className="total-table__grid-shipping-text grid-shipping-text">
                        <div className="grid-shipping-text__method">
                          <ul className="grid-shipping-text__method-list">
                            {arrChecked.map((objChecked, index) => (
                              <li key={index}>
                                <input
                                  type="radio"
                                  checked={changeChecked === objChecked}
                                  onChange={() => setChangeChecked(objChecked)}
                                />
                                <p>{objChecked}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="grid-shipping-text__text">
                          <p>Варианты доставки будут обновлены во время оформления заказа.</p>
                        </div>
                      </div>
                      <div className="total-table__grid-total">
                        <p>Стоимость</p>
                      </div>
                      <div className="total-table__grid-total-price">
                        <p>
                          {changeChecked === 'Быстрая доставка'
                            ? totalPriceWithFastDelevery
                            : totalPrice}
                          &nbsp;₽.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link to="/checkout">
                    <div className="total-body__button">
                      <p>Оформить заказ</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <EmptyItem title={'Ваша корзина пуста'} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Cart;
