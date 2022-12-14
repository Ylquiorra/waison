import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EmptyItem from '../components/EmptyItem';

import ProductInWishlistBlock from '../components/Product/ProductInWishlistBlock/ProductInWishlistBlock';

const Wishlist = () => {
  const { productInWishlist } = useSelector((state) => state.productWishlistSlice);
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
    </main>
  );
};

export default Wishlist;
