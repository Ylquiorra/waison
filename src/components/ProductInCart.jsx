import React from 'react';
import { useDispatch } from 'react-redux';

import {
  minusProductInCart,
  addProductToCart,
  removeProductInCart,
} from '../redux/productCart/slice';

const ProductInCart = ({ id, title, price, image, category, sale, count }) => {
  const dispatch = useDispatch();

  const onClickMinus = () => {
    dispatch(minusProductInCart(id));
  };

  const onClickRemove = () => {
    dispatch(removeProductInCart(id));
  };

  const onClickPlus = () => {
    dispatch(addProductToCart({ id }));
  };

  return (
    <div className="item-in-cart__main ">
      <div className="item-in-cart__main-image">
        <img src={image} alt={title} />
      </div>
      <div className="item-in-cart__main-body body-main-cart">
        <div className="body-main-cart__title">
          <h1>{title} </h1>
        </div>
        <div className="body-main-cart__quantity">
          <button
            onClick={onClickMinus}
            disabled={count === 1}
            className="body-main-cart__quantity-minus">
            <p>-</p>
          </button>
          <div className="body-main-cart__quantity-volue">
            <p>{count}</p>
          </div>
          <button onClick={onClickPlus} className="body-main-cart__quantity-plus">
            <p>+</p>
          </button>
        </div>
      </div>
      <div className="item-in-cart__right-side right-side-cart">
        <div onClick={onClickRemove} className="right-side-cart__cancel cancel-button">
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
        {sale ? (
          <div className="right-side-cart__price">
            <div className="right-side-cart__price-old">
              <p>{price * count} ₽.</p>
            </div>
            <div className="right-side-cart__price-sale">
              <p>{sale * count} ₽.</p>
            </div>
          </div>
        ) : (
          <div className="right-side-cart__price">
            <p>{price * count} ₽.</p>
          </div>
        )}
      </div>
    </div>
  );
};
{
}

export default ProductInCart;
