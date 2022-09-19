import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addProductToCart } from '../../redux/productCart/slice';
import { addProductToWishlist } from '../../redux/productWishlist/slice';
import AppContext from '../../context';

const ProductItem = ({
  id,
  title,
  price,
  defaultPrice,
  image,
  sale,
  categoryName,
  category,
  rating,
  text,
  imageSlider,
  setProductInModal,
  iconModalProductRef,
}) => {
  const dispatch = useDispatch();

  const selectProduct = useSelector((state) =>
    state.productCartSlice.productInCart.find((objToCart) => objToCart.id === id),
  );

  const selectProductInWishlist = useSelector((state) =>
    state.productWishlistSlice.productInWishlist.find((objToWishlist) => objToWishlist.id === id),
  );
  const { setOpenProductModal } = React.useContext(AppContext);

  const onClickToOpenModal = () => {
    setProductInModal({
      id,
      title,
      price,
      defaultPrice,
      image,
      categoryName,
      category,
      sale,
      rating,
      imageSlider,
      text,
    });
    setOpenProductModal(true);
  };

  const onClickToAdd = async () => {
    const productCart = {
      id,
      title,
      price,
      defaultPrice: defaultPrice || 0,
      image,
      categoryName,
      category,
      sale: sale || 0,
      rating,
      text,
    };
    dispatch(addProductToCart(productCart));
  };

  const onClickToAddToWishlist = () => {
    const productWishlist = {
      id,
      title,
      price,
      image,
      categoryName,
      category,
      sale,
      rating,
      text,
    };
    dispatch(addProductToWishlist(productWishlist));
  };

  return (
    <div className="item-grid item-grid__sale">
      <div className="item-grid__body">
        <div className="item-grid__image">
          <div className="item-grid__image-sale-text">{`${sale ? 'Sale!' : ''}`} </div>
          <Link to={`/product/${id}`}>
            <img src={image} alt={title} />
          </Link>
          <div ref={iconModalProductRef} className="item-grid__groups-buttons">
            <div
              onClick={onClickToAddToWishlist}
              className={`${
                selectProductInWishlist
                  ? 'item-grid__groups-buttons-favorites item-grid__groups-buttons-favorites_active'
                  : 'item-grid__groups-buttons-favorites'
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
            <div onClick={onClickToOpenModal} className="item-grid__groups-buttons-quick-view">
              <svg
                width="22"
                height="24"
                viewBox="0 0 22 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21.6655 21.6636L16.2421 15.7763C17.6366 14.0461 18.4006 11.8691 18.4006 9.60286C18.4006 4.30793 14.2733 0 9.2003 0C4.12733 0 0 4.30793 0 9.60286C0 14.8978 4.12733 19.2057 9.2003 19.2057C11.1048 19.2057 12.9196 18.6062 14.4713 17.468L19.9358 23.4001C20.1643 23.6477 20.4715 23.7842 20.8007 23.7842C21.1123 23.7842 21.4079 23.6602 21.6323 23.4347C22.1091 22.9559 22.1243 22.1617 21.6655 21.6636ZM9.2003 2.50509C12.95 2.50509 16.0005 5.68907 16.0005 9.60286C16.0005 13.5167 12.95 16.7006 9.2003 16.7006C5.45058 16.7006 2.40008 13.5167 2.40008 9.60286C2.40008 5.68907 5.45058 2.50509 9.2003 2.50509Z"
                  fill="#272727"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="item-grid__title">
          <h3>{title}</h3>
        </div>
        <div className="item-grid__clear-fix">
          <div className="item-grid__sale-body">
            <div className={`${sale ? 'item-grid__sale-text' : ''}`}>{price} ₽</div>
            <div className={`${sale ? 'item-grid__text sale' : ''}`}>
              {`${sale ? sale + ' ₽' : ''}`}
            </div>
          </div>
          <div className="item-grid__add-cart">
            <div className="item-grid__add-cart-icon">
              <svg
                width="17"
                height="20"
                viewBox="0 0 17 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.92262 0.207061C6.54306 0.308289 5.78592 0.769734 5.23995 1.23235C4.20124 2.11288 3.76786 2.94304 3.76786 4.05255C3.76786 4.62489 3.73236 4.65858 3.12704 4.65925C2.7745 4.65958 2.2027 4.806 1.85607 4.98478C0.641289 5.61132 0.609544 5.72806 0.307475 10.6929C-0.100672 17.4029 -0.101658 18.3997 0.299588 18.9175C0.483748 19.1555 0.918119 19.4962 1.26455 19.675C1.85607 19.98 2.29991 20 8.5 20C14.7001 20 15.1439 19.98 15.7354 19.675C16.0819 19.4962 16.5163 19.1555 16.7004 18.9175C17.1017 18.3997 17.1007 17.4029 16.6925 10.6929C16.3905 5.72806 16.3587 5.61132 15.1439 4.98478C14.7973 4.806 14.2253 4.65958 13.873 4.65925C13.2676 4.65858 13.2321 4.62489 13.2321 4.05255C13.2321 3.0426 12.8074 2.16458 11.9109 1.32123C10.6348 0.120842 8.79122 -0.291073 6.92262 0.207061ZM10.2278 1.76884C11.0958 2.317 11.5083 2.9272 11.6088 3.8124L11.7048 4.65858H8.52504H5.34524V4.08573C5.34524 2.97356 6.06295 2.00181 7.21838 1.54937C8.00411 1.24169 9.57439 1.35625 10.2278 1.76884ZM14.5073 6.21819C14.8381 6.42281 14.9008 6.97114 15.1871 12.1668C15.4077 16.172 15.4411 17.9941 15.2981 18.2368C15.0982 18.5763 14.9544 18.5846 8.54988 18.6275L2.00592 18.6715L1.73244 18.294C1.4984 17.9711 1.50767 17.0866 1.79613 12.1784C2.10076 6.99732 2.16859 6.41881 2.4953 6.21652C3.02471 5.88932 13.9777 5.89066 14.5073 6.21819ZM4.17837 7.13457C3.87374 7.61586 4.57114 8.32579 5.08635 8.05913C5.2987 7.94923 5.44382 7.6784 5.44382 7.39206C5.44382 6.99299 5.35253 6.9011 4.91481 6.85824C4.54886 6.82255 4.32191 6.9076 4.17837 7.13457ZM11.5333 7.06703C11.3631 7.44209 11.5221 7.85718 11.9137 8.05946C12.4212 8.32162 13.1263 7.61603 12.8279 7.14458C12.5907 6.76952 11.6926 6.71565 11.5333 7.06703Z"
                  fill="#272727"
                />
              </svg>
            </div>
            <div className="item-grid__add-cart-text">
              {selectProduct ? (
                <Link to="/cart">
                  <p>Посмотреть корзину</p>
                </Link>
              ) : (
                <p onClick={onClickToAdd}>Добавить в корзину</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
