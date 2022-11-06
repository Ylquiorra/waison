import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import 'firebase/firestore';

import { setMakeOrder, setOrderPrice, setNumberOfOrder } from '../redux/makeOrder/slice';
import { clearProductInCart } from '../redux/productCart/slice';
import { setUserInformation } from '../redux/useInformation/slice';

const Checkout = () => {
  const dispatch = useDispatch();
  const { productInCart, totalPrice } = useSelector((state) => state.productCartSlice);
  const { numberOfOrder } = useSelector((state) => state.makeOrdersSlice);
  const { id } = useSelector((state) => state.userSlice);

  const [firstName, setFistName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [streetAddress, setStreetAddress] = React.useState('');
  const [cityAddress, setCityAddress] = React.useState('');
  const [postIndex, setPostIndex] = React.useState('');
  const [telNumber, setTelNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [otherNotes, setOtherNotes] = React.useState('');

  const clickToCreateOrder = () => {
    const personInformation = {
      firstName: firstName,
      lastName: lastName,
      country: country,
      streetAddress: streetAddress,
      cityAddress: cityAddress,
      postIndex: postIndex,
      telNumber: telNumber,
      email: email,
      otherNotes: otherNotes,
    };
    dispatch(setUserInformation(personInformation));
    dispatch(setOrderPrice(totalPrice));
    dispatch(setNumberOfOrder(numberOfOrder + 1));
    dispatch(setMakeOrder(productInCart));
    dispatch(clearProductInCart());
  };

  const sendingOrderToServer = async () => {
    const ordersRef = doc(collection(db, 'user', id.uid, 'orders'));
    const deleveryInformationRef = doc(db, `user/${id.uid}/informationAboutUser/infoUser`);
    try {
      await setDoc(ordersRef, {
        orderItems: productInCart,
        orderInformation: {
          orderPrice: totalPrice,
          orderNumber: numberOfOrder + 1,
          // orderDate: serverTimestamp(),
        },
      });
      await setDoc(deleveryInformationRef, {
        firstName: firstName,
        lastName: lastName,
        country: country,
        streetAddress: streetAddress,
        cityAddress: cityAddress,
        postIndex: postIndex,
        telNumber: telNumber,
        email: email,
        otherNotes: otherNotes,
      });
    } catch (ERR) {
      alert('Произошла ошибка при оформлении заказа. Повторите попытку позже.');
    }
  };

  const createOrder = () => {
    sendingOrderToServer();
    clickToCreateOrder();
  };

  return (
    <main className="checkout universal">
      <div className="checkout__container universal__container">
        <div className="checkout__body body-checkout universal-body">
          <div className="body-checkout__content universal-body__content">
            <div className="body-checkout__content-breadcrumbs universal-body__content-breadcrumbs">
              <ul>
                <Link to="/">
                  <li>
                    <p>Начальная страница</p>
                  </li>
                </Link>
                <li>
                  <p>Оформление</p>
                </li>
              </ul>
            </div>
            <div className="body-checkout__main-title universal-body__title">
              <h1>Оформление</h1>
            </div>
          </div>
          <section className="body-checkout__flex">
            <div className="body-checkout__billing-details">
              <div className="billing-details-checkout__title">
                <h3 className="checkout-title">Оформление заказа</h3>
              </div>
              <div className="billing-details-checkout__row">
                <div className="billing-details-checkout-row__first-name">
                  <h6 className="universal-black-text">
                    Имя <span className="universal-asterisk"> *</span>
                  </h6>
                  <input
                    value={firstName}
                    onChange={(e) => setFistName(e.target.value)}
                    className="universal-input"
                    type="text"
                    required
                  />
                </div>
                <div className="billing-details-checkout-row__last-name">
                  <h6 className="universal-black-text">
                    Фамилия <span className="universal-asterisk"> *</span>
                  </h6>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="universal-input"
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="billing-details-checkout__county">
                <h6 className="universal-black-text">
                  Страна <span className="universal-asterisk"> *</span>
                </h6>
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="universal-input"
                  type="text"
                  required
                />
              </div>
              <div className="billing-details-checkout__street-address">
                <h6 className="universal-black-text">
                  Адрес <span className="universal-asterisk"> *</span>
                </h6>
                <input
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="universal-input"
                  type="text"
                  placeholder="Введите название улицы и номер квартиры"
                  required
                />
              </div>
              <div className="billing-details-checkout__city">
                <h6 className="universal-black-text">
                  Город <span className="universal-asterisk"> *</span>
                </h6>
                <input
                  value={cityAddress}
                  onChange={(e) => setCityAddress(e.target.value)}
                  className="universal-input"
                  type="text"
                  required
                />
              </div>
              <div className="billing-details-checkout__post-index">
                <h6 className="universal-black-text">
                  Почтовый индекс <span className="universal-asterisk"> *</span>
                </h6>
                <input
                  value={postIndex}
                  onChange={(e) => setPostIndex(e.target.value)}
                  className="universal-input"
                  type="text"
                  required
                />
              </div>
              <div className="billing-details-checkout__tel-number">
                <h6 className="universal-black-text">
                  Номер телефона <span className="universal-asterisk"> *</span>
                </h6>
                <input
                  value={telNumber}
                  onChange={(e) => setTelNumber(e.target.value)}
                  className="universal-input"
                  type="phone"
                  required
                />
              </div>
              <div className="billing-details-checkout__email">
                <h6 className="universal-black-text">
                  Адрес электронной почты <span className="universal-asterisk"> *</span>
                </h6>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="universal-input"
                  type="email"
                  required
                />
              </div>
              <div className="billing-details-checkout__other-notes">
                <h6 className="universal-black-text">Комментарии к заказу</h6>
                <textarea
                  value={otherNotes}
                  onChange={(e) => setOtherNotes(e.target.value)}
                  className="universal-input"
                  name="other-comment"
                  cols="2"
                  rows="5"
                  placeholder="Комментарии к заказу"
                />
              </div>
            </div>
            <section className="body-checkout__order-information">
              <div className="order-information-checkout__title">
                <h3 className="checkout-title">Ваш заказ</h3>
              </div>
              <div className="order-information-checkout__body">
                <div className="body-order-information-checkout">
                  <div className="body-order-information-checkout__main-text">
                    <h6 className="universal-black-text">Продукт</h6>
                    <p>Цена</p>
                  </div>
                  {productInCart.map((objProduct) => (
                    <div
                      key={objProduct.id}
                      className="body-order-information-checkout__product-items">
                      <div className="body-order-information-checkout-product-items__item">
                        <h6 className="universal-black-text body-order-information-checkout-product-item__text">
                          {objProduct.title} × {objProduct.count}
                        </h6>
                        {objProduct.sale ? (
                          <div className="body-order-information-checkout-product-item__row-price">
                            <p className="row-price-item-product-checkout-information__price">
                              {objProduct.price * objProduct.count} ₽.
                            </p>
                            <p className="row-price-item-product-checkout-information__sale-price">
                              {objProduct.sale * objProduct.count} ₽.
                            </p>
                          </div>
                        ) : (
                          <p>{objProduct.price * objProduct.count} ₽.</p>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="body-order-information-checkout__shipping">
                    <h6 className="universal-black-text">Доставка</h6>
                    <p>Быстрая доставка</p>
                  </div>
                  <div className="body-order-information-checkout__total-price">
                    <h6 className="universal-black-text">Общая стоимость</h6>
                    <p>{totalPrice} ₽.</p>
                  </div>
                </div>
              </div>
              <div
                onClick={createOrder}
                className="body-order-information-checkout__button black-button">
                <p>Заказать</p>
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
