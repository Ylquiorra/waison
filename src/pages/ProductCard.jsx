import React from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { addProductToWishlist } from '../redux/productWishlist/slice';
import { addProductToCart } from '../redux/productCart/slice';
import ProductItem from '../components/ProductItem';
import Loader from '../components/Loader';

const ProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const selectProductInWishlist = useSelector((state) =>
    state.productWishlistSlice.productInWishlist.find((obj) => obj.id === id),
  );
  const selectProductInCart = useSelector((state) =>
    state.productCartSlice.productInCart.find((obj) => obj.id === id),
  );

  //TODO немного неправильно работает переключение продуктов по стрелкам

  const [productById, setProductById] = React.useState([]);
  const [productRelated, setProductRelated] = React.useState([]);
  const [imageSlider, setImageSlider] = React.useState([]);
  const [indexImageSlider, setIndexImageSlider] = React.useState(1);
  const [indexPage, setIndexPage] = React.useState(Number(id) + 1);
  const [loadingPage, setLoadingPage] = React.useState(false);

  const onClickToAddToWishlist = () => {
    dispatch(addProductToWishlist(productById));
  };
  const onClickToAddFromProductCard = () => {
    dispatch(addProductToCart(productById));
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  });

  const nextSlide = () => {
    if (indexImageSlider !== imageSlider.length) {
      setIndexImageSlider(indexImageSlider + 1);
    } else if (indexImageSlider === imageSlider.length) {
      setIndexImageSlider(1);
    }
  };

  const moveOnImageCart = (index) => {
    setIndexImageSlider(index);
  };

  const nextProduct = () => {
    if (indexPage !== 12) {
      setIndexPage((prev) => prev + 1);
      navigate(`/product/${indexPage}`);
      setLoadingPage(false);
    } else if (indexPage === 12) {
      navigate('/product/0');
      setIndexPage(0);
      setLoadingPage(false);
    }
  };

  const prevProduct = () => {
    if (indexPage !== 12) {
      setIndexPage((prev) => prev - 1);
      navigate(`/product/${indexPage}`);
      setLoadingPage(false);
    } else if (indexPage === 12) {
      navigate('/product/0');
      setIndexPage(0);
      setLoadingPage(false);
    }
  };
  React.useEffect(() => {
    async function fetchProductById() {
      try {
        setLoadingPage(false);
        const { data } = await axios.get(
          'https://630b2463f280658a59d6a747.mockapi.io/product/' + id,
        );
        const relatedProduct = await axios.get(
          `https://630b2463f280658a59d6a747.mockapi.io/product${
            data.category.length === 1
              ? `${'?category=' + data.category}`
              : `${'?category=' + data.category[0]}`
          }${data.category.length > 1 ? `${'&category=' + data.category[1]}` : ''}${
            data.category.length === 3 ? `${'&category=' + data.category[2]}` : ''
          }`,
        );
        setProductById(data);
        setProductRelated(relatedProduct.data);
        setImageSlider(data.imageSlider);
        setLoadingPage(true);
      } catch (error) {
        alert('Произошла ошибка при получении товара с сервера.');
        console.error('error');
      }
    }
    fetchProductById();
  }, [id]);

  return (
    <>
      {loadingPage ? (
        <>
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
                      {productById.categoryName.map((objCategoryName, index) => (
                        <li key={index}>
                          <p>{objCategoryName}</p>
                        </li>
                      ))}
                      <li>
                        <p>{productById.title}</p>
                      </li>
                    </ul>
                  </div>
                  <div className="product-body__nav">
                    <div onClick={prevProduct} className="product-body__nav-left-arrow">
                      <svg
                        width="18"
                        height="31"
                        viewBox="0 0 18 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.6463 0.290625C18.5751 1.14216 18.1426 1.64857 10.5024 8.65675L3.04134 15.5L10.5024 22.3432C16.3622 27.7181 17.9633 29.319 17.9633 29.8026C17.9633 30.544 17.5195 31 16.7975 31C16.4528 31 13.4075 28.3844 8.13287 23.5581C1.725 17.6945 -7.49956e-07 15.9853 -7.49956e-07 15.5C-7.49956e-07 15.0147 1.725 13.3055 8.13287 7.44194C13.4075 2.61563 16.4528 0 16.7975 0C17.0899 0 17.4719 0.130781 17.6463 0.290625Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                    <div onClick={nextProduct} className="product-body__nav-right-arrow">
                      <svg
                        width="18"
                        height="31"
                        viewBox="0 0 18 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.353725 0.290625C-0.575082 1.14216 -0.142643 1.64857 7.49756 8.65675L14.9587 15.5L7.49756 22.3432C1.63783 27.7181 0.0367256 29.319 0.0367256 29.8026C0.0367256 30.544 0.480524 31 1.20249 31C1.54723 31 4.59253 28.3844 9.86713 23.5581C16.275 17.6945 18 15.9853 18 15.5C18 15.0147 16.275 13.3055 9.86713 7.44194C4.59253 2.61563 1.54723 0 1.20249 0C0.910057 0 0.528074 0.130781 0.353725 0.290625Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="product-cart__body-item">
                  <div className="product-cart-item__row">
                    <div className="product-cart-item__image-block">
                      <div className="image-block-cart__body">
                        <div className="image-block-cart__body-preview">
                          {imageSlider.map((obj, index) => (
                            <img
                              className={
                                indexImageSlider === index + 1
                                  ? 'image-block-cart__body-preview-active'
                                  : ''
                              }
                              onClick={() => moveOnImageCart(index + 1)}
                              key={index}
                              src={obj.sliderImage}
                              alt={productById.title}
                            />
                          ))}
                        </div>
                        <div className="image-block-cart__body-slider">
                          {imageSlider.map((obj, index) => (
                            <img
                              className={
                                indexImageSlider === index + 1
                                  ? 'image-block-cart__body-slider-active'
                                  : ''
                              }
                              key={index}
                              src={obj.sliderImage}
                              alt={productById.title}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="product-cart-item__main-description">
                      <div className="product-main-description">
                        <div className="product-main-description__title">
                          <h1>{productById.title}</h1>
                        </div>
                        {productById.sale ? (
                          <div className="product-main-description__body-sale">
                            <div className="product-main-description__sale-price">
                              <div className="product-main-description__sale-price-main">
                                <p>{productById.price} ₽ </p>
                              </div>
                              <div className="product-main-description__sale-price-sale">
                                <p>{productById.sale} ₽</p>
                              </div>
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
                        ) : (
                          <div className="product-main-description__body">
                            <div className="product-main-description__price">
                              <p>{productById.price} ₽ </p>
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
                        )}
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
          <section className="related-product">
            <div className="related-product__container">
              <div className="related-product__title">
                <h3>Похожие товары</h3>
              </div>
              <div className="related-product__grid-items">
                {productRelated.map((objRelated) => (
                  <ProductItem key={objRelated.id} {...objRelated} />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProductCard;
