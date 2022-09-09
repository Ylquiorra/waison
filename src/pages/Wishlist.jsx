import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EmptyItem from '../components/EmptyItem';

import ProductInWishlistBlock from '../components/ProductInWishlistBlock';

const Wishlist = () => {
  const { productInWishlist } = useSelector((state) => state.productWishlistSlice);
  return (
    <section className="cart universal">
      <div className="cart__container universal__container">
        <div className="cart__body body-cart universal-body">
          <div className="body-cart__content universal-body__content">
            <div className="body-cart__content-breadcrumbs universal-body__content-breadcrumbs">
              <ul>
                <li>
                  <p>Начальная страница</p>
                </li>
                <li>
                  <p>закладки</p>
                </li>
              </ul>
            </div>
            <div className="body-cart__title universal-body__title">
              <h1>Избранное</h1>
            </div>
          </div>
          {productInWishlist.length > 0 ? (
            productInWishlist.map((objWishlist) => (
              <ProductInWishlistBlock key={objWishlist.id} {...objWishlist} />
            ))
          ) : (
            <EmptyItem title={'Ваш список избранных товаров пуст'} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
