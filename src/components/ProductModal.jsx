import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { addProductToCart } from '../redux/productCart/slice';
import AppContext from '../context';

const ProductModal = ({ id, image, title, price, category, categoryName, rating, text }) => {
  const dispatch = useDispatch();
  const selectProductInCart = useSelector((state) =>
    state.productCartSlice.productInCart.find((obj) => obj.id === id),
  );
  const [valueCount, setValueCount] = React.useState(1);

  const { setOpenProductModal } = React.useContext(AppContext);

  const handleClickToInput = (event) => {
    setValueCount(event.target.value);
  };

  const onClickToAddFromProductModal = () => {
    dispatch(
      addProductToCart({
        id,
        image,
        title,
        price,
        category,
        categoryName,
        rating,
        text,
        formCounter: Number(valueCount),
      }),
    );
  };

  return (
    <section className="modal-window">
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
            <div className="modal-body-row__image">
              <img src={image} alt={title} />
            </div>
            <div className="modal-body-row__info">
              <div className="modal-body-row__info-title">
                <h1>{title}</h1>
              </div>
              <div className="modal-body-row__info-price">
                <p>{price} р</p>
              </div>
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
