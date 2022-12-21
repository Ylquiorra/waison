import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

import Loader from '../components/Loader';

const OrderReceived = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [numberOfTotalOrders, setNumberOfTotalOrders] = React.useState(0);
  const { order } = useSelector((state) => state.orderSlice);
  const { id } = useSelector((state) => state.userSlice);

  React.useEffect(() => {
    const getOrders = async () => {
      const querySnapshot = await getDocs(collection(db, 'user', id.uid, 'orders'));
      const ordersArr = [];
      querySnapshot.forEach((doc) => {
        const a = doc.data();
        ordersArr.push({ ...a });
      });
      setNumberOfTotalOrders(ordersArr.length);
      setIsLoading(false);
    };
    getOrders();
  }, []);

  React.useEffect(() => {
    if (order.length === 0) {
      navigate('/');
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {order.length === 0 ? (
        <main className="received-order universal">
          <div className="received-order__container universal__container">
            <div className="received-order-body universal-body">
              <div className="body-received-order universal-body__content">
                <div className="body-received-order-breadcrumbs universal-body__content-breadcrumbs">
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
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="received-order universal">
          <div className="received-order__container universal__container">
            <div className="received-order-body universal-body">
              <div className="body-received-order universal-body__content">
                <div className="body-received-order-breadcrumbs universal-body__content-breadcrumbs">
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
                <section className="body-received-order__content">
                  <div className="body-received-order__main-information">
                    <div className="body-received-order-main-information__text">
                      <p>Спасибо за заказ. Ваш заказ оформлен.</p>
                    </div>
                    <div className="body-received-order-main-information__order-details">
                      <ul className="body-received-order-main-information__list">
                        <li>
                          <p> Номер заказа</p>
                          <span>{numberOfTotalOrders}</span>
                        </li>
                        <li>
                          <p>Цена заказа</p>
                          <span>{order.orderInformation.orderPrice} ₽.</span>
                        </li>
                        <li>
                          <p>Оплата заказа</p>
                          <span>Наличными</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="body-received-order__details">
                    <h3>Детали заказа</h3>
                    <table className="body-received-order__details-table">
                      <thead>
                        <tr>
                          <th className="details-table-received-order__name">Товар</th>
                          <th className="details-table-received-order__total">Цена</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.orderItems.map((objOrderItems, index) => (
                          <tr key={index}>
                            <td className="details-table-received-order__name-product">
                              {objOrderItems.title} × {objOrderItems.count}
                            </td>
                            {objOrderItems.sale ? (
                              <td className="details-table-received-order__price-product details-table-received-order__price-product-sale">
                                {objOrderItems.sale} ₽.
                              </td>
                            ) : (
                              <td className="details-table-received-order__price-product">
                                {objOrderItems.price} ₽.
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Первичная цена:</th>
                          <td>{order.orderInformation.orderPrice} ₽.</td>
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
                          <td>{order.orderInformation.orderPrice} ₽.</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default OrderReceived;
