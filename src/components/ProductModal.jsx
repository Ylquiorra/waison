import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addProductToCart, setValueCount } from '../redux/productCart/slice';
import AppContext from '../context';

const ProductModal = ({
  id,
  image,
  title,
  price,
  category,
  defaultPrice,
  categoryName,
  sale,
  rating,
  text,
  imageSlider,
  modalProductRef,
}) => {
  const dispatch = useDispatch();
  const selectProductInCart = useSelector((state) =>
    state.productCartSlice.productInCart.find((obj) => obj.id === id),
  );
  const { valueCount } = useSelector((state) => state.productCartSlice);

  const { setOpenProductModal } = React.useContext(AppContext);
  const [indexImageSlider, setIndexImageSlider] = React.useState(1);

  const handleClickToInput = (event) => {
    dispatch(setValueCount(Number(event.target.value)));
  };

  const nextSlide = () => {
    if (indexImageSlider !== imageSlider.length) {
      setIndexImageSlider(indexImageSlider + 1);
    } else if (indexImageSlider === imageSlider.length) {
      setIndexImageSlider(1);
    }
  };
  const pastSlide = () => {
    if (indexImageSlider !== imageSlider.length && indexImageSlider < 0) {
      setIndexImageSlider(indexImageSlider - 1);
    } else if (indexImageSlider === imageSlider.length) {
      setIndexImageSlider(1);
    }
  };

  const onClickToAddFromProductModal = () => {
    dispatch(
      addProductToCart({
        id,
        title,
        price,
        defaultPrice: defaultPrice || 0, //! В этом месте можно подумать (когда убираю ИЛИ при калькуляции с более 2х товаров - NaN)
        image,
        categoryName,
        category,
        sale: sale || 0,
        rating,
        text,
        count: valueCount,
      }),
    );
    dispatch(setValueCount(1));
    setOpenProductModal(false);
  };

  return (
    <section ref={modalProductRef} className="modal-window">
      <div className="modal-window__body">
        <div onClick={() => setOpenProductModal(false)} className="modal-window__cancel">
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
        <div className="modal-body">
          <div className="modal-body__row">
            <div className="modal-body-row__image-block">
              <div className="image-block-modal-body__wrapper">
                <div className="image-block-modal-body__image ">
                  {imageSlider.map((objImageSlider, index) => (
                    <img
                      className={
                        indexImageSlider === index + 1 ? 'image-block-modal-body__image-active' : ''
                      }
                      key={objImageSlider.sliderId}
                      src={objImageSlider.sliderImage}
                      alt={title}
                    />
                  ))}
                </div>
                <div onClick={() => pastSlide()} className="image-block-modal-body__back-arrow">
                  <svg
                    width="50"
                    height="35"
                    viewBox="0 0 50 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.0454 0.365942C16.8745 1.33923 15.9276 2.8809 10.656 9.14088L4.9548 15.9105H31.8632C48.1597 15.75 49.1475 15.9107 49.6522 16.625C50.1163 17.2817 50.1157 17.7183 49.6517 18.375C49.1469 19.0893 48.906 19.25 31.8632 19.2024H4.9548L10.6971 26.0203C16.4581 32.8613 17.3418 34.6307 15.1818 34.9961C14.5125 35.1096 12.2417 32.779 7.12469 26.727C3.20599 22.0921 7.04858e-08 17.9559 7.04858e-08 17.5362C7.04858e-08 16.4861 14.112 0 15.0107 0C15.4084 0 15.8744 0.164592 16.0454 0.365942Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div onClick={() => nextSlide()} className="image-block-modal-body__next-arrow">
                  <svg
                    width="50"
                    height="35"
                    viewBox="0 0 50 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M33.9545 0.365942C33.1255 1.33923 34.0723 2.8809 39.344 9.14088L45.0452 15.9105H18.1367C1.84015 15.75 0.852361 15.9107 0.347625 16.625C-0.116451 17.2817 -0.115866 17.7183 0.34821 18.375C0.852945 19.0893 1.09389 19.25 18.1367 19.2024H45.0452L39.3029 26.0203C33.5419 32.8613 32.6581 34.6307 34.8182 34.9961C35.4874 35.1096 37.7583 32.779 42.8753 26.727C46.794 22.0921 50 17.9559 50 17.5362C50 16.4861 35.888 0 34.9893 0C34.5915 0 34.1256 0.164592 33.9545 0.365942Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="modal-body-row__info">
              <div className="modal-body-row__info-title">
                <h1>{title}</h1>
              </div>
              {sale ? (
                <div className="modal-body-row__info-price">
                  <div className="modal-body-row__info-old-price">
                    <p>{price} ₽</p>
                  </div>
                  <div className="modal-body-row__info-sale-price">
                    <p>{sale} ₽</p>
                  </div>
                </div>
              ) : (
                <div className="modal-body-row__info-price">
                  <p>{price} ₽</p>
                </div>
              )}
              <div className="modal-body-row__info-description">
                <p>{text}</p>
              </div>
              <div className="modal-body-row__quantity">
                <input type="number" min={1} value={valueCount} onChange={handleClickToInput} />
                <div
                  className={`${
                    selectProductInCart
                      ? 'modal-body-row__quantity-button black-button black-button black-button_active '
                      : 'modal-body-row__quantity-button black-button black-button'
                  }`}>
                  {' '}
                  {selectProductInCart ? (
                    <Link onClick={() => setOpenProductModal(false)} to="/cart">
                      <p>Посмотреть корзину</p>
                    </Link>
                  ) : (
                    <p onClick={onClickToAddFromProductModal}>Добавить в корзину</p>
                  )}
                </div>
              </div>
              <div className="modal-body-row__categories">
                <p>Категории:</p>
                {categoryName.map((objectCategoryName, index) => (
                  <span key={index}>{objectCategoryName}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductModal;
