import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { addProductToWishlist } from '../redux/productWishlist/slice';
import { addProductToCart } from '../redux/productCart/slice';
import Loader from '../components/Loader';

const ProductCard = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const selectProductInWishlist = useSelector((state) =>
    state.productWishlistSlice.productInWishlist.find((obj) => obj.id === id),
  );
  const selectProductInCart = useSelector((state) =>
    state.productCartSlice.productInCart.find((obj) => obj.id === id),
  );

  const [productById, setProductById] = React.useState([]);
  const [loadingPage, setLoadingPage] = React.useState(false);

  const onClickToAddToWishlist = () => {
    dispatch(addProductToWishlist(productById));
  };
  const onClickToAddFromProductCard = () => {
    dispatch(addProductToCart(productById));
  };

  React.useEffect(() => {
    async function fetchPizzaById() {
      try {
        const { data } = await axios.get(
          'https://630b2463f280658a59d6a747.mockapi.io/product/' + id,
        );
        setProductById(data);
        setLoadingPage(true);
      } catch (error) {
        alert('Произошла ошибка при получении товара с сервера.');
        console.error('error');
      }
    }
    fetchPizzaById();
  }, []);

  return (
    <>
      {loadingPage ? (
        <section className="product-cart">
          <div className="product-cart__container">
            <div className="product-cart__body">
              <div className="product-cart-body__breadcrumb-nav">
                <div className="product-body__breadcrumb universal-body__content-breadcrumbs ">
                  <ul>
                    <Link to="/">
                      <li>
                        <p>Начальная страница</p>
                      </li>
                    </Link>
                    <li>
                      <p>Какой то текс</p>
                    </li>
                    <li>
                      <p>{productById.title}</p>
                    </li>
                  </ul>
                </div>
                <div className="product-body__nav">
                  <div className="product-body__nav-left-arrow">назад</div>
                  <div className="product-body__nav-right-arrow"> вперед</div>
                </div>
              </div>
              <div className="product-cart__body-item">
                <div className="product-cart-item__row">
                  <div className="product-cart-item__image-block">
                    <img src={productById.image} alt="#" />
                  </div>
                  <div className="product-cart-item__main-description">
                    <div className="product-main-description">
                      <div className="product-main-description__title">
                        <h1>{productById.title}</h1>
                      </div>
                      <div className="product-main-description__body">
                        <div className="product-main-description__price">
                          <p>{productById.price} р </p>
                        </div>
                        <div
                          onClick={onClickToAddToWishlist}
                          className={`${
                            selectProductInWishlist
                              ? 'product-main-description__favorite item-grid__groups-buttons-favorites_active'
                              : 'product-main-description__favorite '
                          }`}>
                          <svg
                            width="25"
                            height="22"
                            viewBox="0 0 25 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.01371 0.289544C3.00641 0.992906 1.54555 2.33909 0.576816 4.37829C0.0802108 5.42376 -0.00263165 5.89993 6.24121e-05 7.69059C0.00365449 10.1313 0.510362 11.6745 1.78959 13.1401C3.07735 14.615 11.9615 22 12.4484 22C12.8691 22 21.5256 14.8895 22.7965 13.5C26.3899 9.57085 25.4591 3.16772 20.9446 0.758232C20.0221 0.265988 19.3865 0.106163 18.0507 0.0302133C16.0358 -0.0840419 14.8641 0.318603 13.3756 1.63749L12.4489 2.45841L11.5255 1.64035C10.1796 0.448048 9.00675 -0.00567035 7.28525 5.3413e-05C6.48264 0.00269515 5.46047 0.133021 5.01371 0.289544ZM9.05906 2.31399C9.54579 2.50508 10.4456 3.19832 11.059 3.85501C11.6723 4.5117 12.2978 5.04885 12.4489 5.04885C12.6 5.04885 13.2254 4.5117 13.8388 3.85501C15.6355 1.93138 17.57 1.48427 19.7453 2.49011C21.0968 3.11532 21.7054 3.72931 22.3177 5.08672C23.2731 7.20495 23.1216 9.36457 21.883 11.2798C21.346 12.1104 12.8637 19.5784 12.4576 19.5784C12.054 19.5784 3.54073 12.0933 3.00888 11.2708C1.77612 9.36479 1.62615 7.20143 2.58007 5.08672C3.1923 3.72931 3.80093 3.11532 5.15245 2.49011C6.46087 1.88515 7.81081 1.82417 9.05906 2.31399Z"
                              fill="#272727"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="product-main-description__text">
                        <p>{productById.text}</p>
                      </div>
                      <div className="product-main-description__buttons">
                        <div
                          className={`${
                            selectProductInCart
                              ? 'product-main-description-buttons__black-button black-button black-button_active '
                              : 'product-main-description-buttons__black-button black-button'
                          }`}>
                          {selectProductInCart ? (
                            <Link to="/cart">
                              <p>Посмотреть корзину</p>
                            </Link>
                          ) : (
                            <p onClick={onClickToAddFromProductCard}>Добавить в корзину</p>
                          )}
                        </div>
                      </div>
                      <div className="product-main-description__category">
                        <p>Категория:</p>
                        {productById.categoryName.map((obj, index) => (
                          <span key={index}>{obj}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProductCard;
