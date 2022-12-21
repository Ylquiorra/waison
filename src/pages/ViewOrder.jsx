import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import AccountNavigate from '../components/AccountNavagate/AccountNavigate';

const ViewOrder = () => {
  const navigate = useNavigate();
  const { userInformation } = useSelector((state) => state.userInformationSlice);
  const { openOrder } = useSelector((state) => state.orderSlice);

  React.useEffect(() => {
    if (!openOrder.orderInformation) {
      navigate('/account');
    }
  }, []);

  return (
    openOrder.orderInformation && (
      <main className="view-order universal">
        <div className="view-order__container universal__container">
          <div className="view-order-body universal-body">
            <div className="body-view-order universal-body__content">
              <div className="body-view-order-breadcrumbs universal-body__content-breadcrumbs">
                <ul>
                  <Link to="/">
                    <li>
                      <p>Начальная страница</p>
                    </li>
                  </Link>
                  <li>
                    <p>аккаунт</p>
                  </li>
                </ul>
              </div>
              <div className="universal-body__title">
                <h1>Аккаунт</h1>
              </div>
              <AccountNavigate />
              <section className="body-view-order__content">
                <div className="body-view-order__main-information">
                  <h6>
                    Ваш заказ был сделан
                    <span>{openOrder.orderInformation.orderDate}</span>, который в настоящее время
                    <span>в обработке</span>
                  </h6>
                </div>
                <div className="body-view-order__details">
                  <h3>Детали заказа</h3>
                  <table className="body-view-order__details-table">
                    <thead>
                      <tr>
                        <th className="details-table-view-order__name">Товар</th>
                        <th className="details-table-view-order__total">Цена</th>
                      </tr>
                    </thead>
                    <tbody>
                      {openOrder.orderItems.map((objOrderItems, index) => (
                        <tr key={index}>
                          <td className="details-table-view-order__name-product">
                            {objOrderItems.title} × {objOrderItems.count}
                          </td>
                          {objOrderItems.sale ? (
                            <td className="details-table-view-order__price-product details-table-view-order__price-product-sale">
                              {objOrderItems.sale * objOrderItems.count} ₽.
                            </td>
                          ) : (
                            <td className="details-table-view-order__price-product">
                              {objOrderItems.price} ₽.
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Первичная цена:</th>
                        <td>{openOrder.orderInformation.orderPrice} ₽.</td>
                      </tr>
                      <tr>
                        <th>Доставка</th>
                        <td>Обычная доставка</td>
                      </tr>
                      <tr>
                        <th>Тип оплаты:</th>
                        <td>Наличными</td>
                      </tr>
                      <tr>
                        <th>Итоговая цена</th>
                        <td>{openOrder.orderInformation.orderPrice} ₽.</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </section>
              <section className="body-view-order__castomer-details">
                <div className="castomer-details-biling-address-view-order__body">
                  <h3>Адресс для выставления счета</h3>
                  <div className="castomer-details-biling-address-view-order__content ">
                    <div className="castomer-details-biling-address-view-order__name castomer-details-universal-view-order table-universal-flex">
                      <p className="castomer-details-universal-view-order__text">Имя</p>
                      <p className="castomer-details-universal-view-order__text">
                        {userInformation.lastName} {userInformation.firstName}
                      </p>
                    </div>
                    <div className="castomer-details-biling-address-view-order__street table-universal-flex">
                      <p className="castomer-details-universal-view-order__text">Улица</p>
                      <p className="castomer-details-universal-view-order__text">
                        {userInformation.streetAddress}
                      </p>
                    </div>
                    <div className="castomer-details-biling-address-view-order__city table-universal-flex">
                      <p className="castomer-details-universal-view-order__text">Город</p>
                      <p className="castomer-details-universal-view-order__text">
                        {userInformation.cityAddress}
                      </p>
                    </div>
                    <div className="castomer-details-biling-address-view-order__region table-universal-flex">
                      <p className="castomer-details-universal-view-order__text">Область</p>
                      <p className="castomer-details-universal-view-order__text">
                        Кемероская область
                      </p>
                    </div>
                    <div className="castomer-details-biling-address-view-order__index table-universal-flex">
                      <p className="castomer-details-universal-view-order__text">Почтовый индекс</p>
                      <p className="castomer-details-universal-view-order__text">
                        {userInformation.postIndex}
                      </p>
                    </div>
                    <div className="castomer-details-biling-address-view-order__country table-universal-flex">
                      <p className="castomer-details-universal-view-order__text">Страна</p>
                      <p className="castomer-details-universal-view-order__text">
                        {userInformation.country}
                      </p>
                    </div>
                    <div className="castomer-details-biling-address-view-order__phone-number table-universal-flex">
                      <p className="castomer-details-universal-view-order__text">Номер телефона</p>
                      <p className="castomer-details-universal-view-order__text">
                        {userInformation.telNumber}
                      </p>
                    </div>
                    <div className="castomer-details-biling-address-view-order__email table-universal-flex">
                      <p className="castomer-details-universal-view-order__text">
                        Электронная почта
                      </p>
                      <p className="castomer-details-universal-view-order__text">
                        {userInformation.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="castomer-details-shipping-address-view-order__body">
                  <h3>Адрес доставки</h3>
                  <div className="castomer-details-shipping-address-view-order__content ">
                    <div className="castomer-details-shipping-address-view-order__name table-universal-flex">
                      <p className="castomer-details-universal-view-order__text">Имя</p>
                      <p className="castomer-details-universal-view-order__text">
                        {userInformation.lastName} {userInformation.firstName}
                      </p>
                    </div>
                    <div className="castomer-details-shipping-address-view-order__street table-universal-flex">
                      <p className="castomer-details-universal-view-order__text">Улица</p>
                      <p className="castomer-details-universal-view-order__text">
                        {userInformation.streetAddress}
                      </p>
                    </div>
                    <div className="castomer-details-shipping-address-view-order__city table-universal-flex">
                      <p className="castomer-details-universal-view-order__text">Город</p>
                      <p className="castomer-details-universal-view-order__text">
                        {userInformation.cityAddress}
                      </p>
                    </div>
                    <div className="castomer-details-shipping-address-view-order__region table-universal-flex">
                      <p className="castomer-details-universal-view-order__text">Область</p>
                      <p className="castomer-details-universal-view-order__text">
                        Кемероская область
                      </p>
                    </div>
                    <div className="castomer-details-shipping-address-view-order__index table-universal-flex">
                      <p className="castomer-details-universal-view-order__text">Почтовый индекс</p>
                      <p className="castomer-details-universal-view-order__text">
                        {userInformation.postIndex}
                      </p>
                    </div>
                    <div className="castomer-details-shipping-address-view-order__country table-universal-flex">
                      <p className="castomer-details-universal-view-order__text">Страна</p>
                      <p className="castomer-details-universal-view-order__text">
                        {userInformation.country}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    )
  );
};

export default ViewOrder;
