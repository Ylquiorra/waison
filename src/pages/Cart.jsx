import React from 'react';
import Image from '../assets/img/hero/product-first-photo-on-hero/bookends-normal.jpg';

const Cart = () => {
  return (
    <section className="cart">
      <div className="cart__container">
        <div className="cart__body body-cart">
          <div className="body-cart__content">
            <div className="body-cart__content-breadcrumbs">
              <ul>
                <li>
                  <p>Начальная страница</p>
                </li>
                <li>
                  <p>корзина</p>
                </li>
              </ul>
            </div>
            <div className="body-cart__title">
              <h1>Корзина</h1>
            </div>
          </div>
          <div className="body-cart__items">
            <div className="body-cart__item item-in-cart">
              <div className="item-in-cart__main ">
                <div className="item-in-cart__main-image">
                  <img src={Image} alt="#" />
                </div>
                <div className="item-in-cart__main-body body-main-cart">
                  <div className="body-main-cart__title">
                    <h1>Bookends </h1>
                  </div>
                  <div className="body-main-cart__quantity">
                    <div className="body-main-cart__quantity-plus">
                      <p>-</p>
                    </div>
                    <div className="body-main-cart__quantity-volue">
                      <p>0</p>
                    </div>
                    <div className="body-main-cart__quantity-minus">
                      <p>+</p>
                    </div>
                  </div>
                </div>
                <div className="item-in-cart__right-side right-side-cart">
                  <div className="right-side-cart__cancel cancel-button">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.08516 7.99988L15.7752 1.30992C16.0749 1.01025 16.0749 0.524428 15.7752 0.224755C15.4756 -0.0749183 14.9897 -0.0749183 14.6901 0.224755L7.99998 6.91472L1.30993 0.225778C1.01026 -0.0738955 0.524434 -0.0738955 0.224757 0.225778C-0.0749191 0.52545 -0.0749191 1.01127 0.224757 1.31094L6.91481 8.00091L0.225781 14.6898C-0.0738962 14.9895 -0.0738962 15.4753 0.225781 15.775C0.376131 15.9243 0.571482 16 0.767857 16C0.964232 16 1.1606 15.9253 1.30993 15.775L7.99998 9.08505L14.6901 15.775C14.8404 15.9243 15.0358 16 15.2321 16C15.4285 16 15.6249 15.9253 15.7742 15.775C16.0739 15.4753 16.0739 14.9895 15.7742 14.6898L9.08516 7.99988Z"
                        fill="#272727"
                      />
                    </svg>
                  </div>
                  <div className="right-side-cart__price">
                    <p>590 p.</p>
                  </div>
                </div>
              </div>
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
                      <p>590 p.</p>
                    </div>
                    <div className="total-table__grid-shipping">
                      <p>Доставка</p>
                    </div>
                    <div className="total-table__grid-shipping-text grid-shipping-text">
                      <div className="grid-shipping-text__method">
                        <ul className="grid-shipping-text__method-list">
                          <li>
                            <input type="radio" checked="checked" />
                            <p>Бесплатная доставка</p>
                          </li>
                          <li>
                            <input type="radio" checked="" />
                            <p>Быстрая доставка</p>
                          </li>
                          <li>
                            <input type="radio" checked="" />
                            <p>Самовывоз</p>
                          </li>
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
                      <p>590 p.</p>
                    </div>
                  </div>
                </div>
                <div className="total-body__button">
                  <p>Оформить заказ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
