import React from 'react';
import dayjs from 'dayjs';
import { collection, getDocs } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { db } from '../firebase';

import { setOpenOrder } from '../redux/order/slice';
import Loader from './Loader';

const AccountOrders = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useSelector((state) => state.userSlice);
  const location = useLocation();

  React.useEffect(() => {
    const getOrders = async () => {
      const querySnapshot = await getDocs(collection(db, 'user', id.uid, 'orders'));
      const ordersArr = [];

      querySnapshot.forEach((doc) => {
        const a = doc.data();
        a.orderInformation.orderValue = doc.id;
        a.orderInformation.orderDate = dayjs
          .unix(doc.data().orderInformation.orderDate?.seconds)
          .locale('ru')
          .format('HH:mm:ss DD MMMM YYYY');
        ordersArr.push({ ...a });
        setOrders(ordersArr);
      });
      setIsLoading(false);
    };
    getOrders();
  }, []);

  //!!!нужно вынести куда то
  //* вылезает ошибка
  // if (orders.length > 0 && 'orderItems' in orders[0]) {
  //   dispatch(setOrder(orders));
  // }

  const handleOpenOrder = (value) => {
    const findOrdersArr = orders.find((objOrder) => objOrder.orderInformation.orderValue === value);
    console.log(findOrdersArr);
    console.log(orders);

    dispatch(setOpenOrder(findOrdersArr));
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        location.pathname !== '/account/view-order' &&
        (orders.length > 0 && 'orderItems' in orders[0] ? (
          orders.map((objOrder, index) => (
            <table key={index} className="account-body-content-navigation__orders">
              <thead className="account-body-content-navigation__orders-head-text">
                <tr>
                  <th>Номер заказа</th>
                  <th>Дата</th>
                  <th>Статус</th>
                  <th>Цена</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody className="account-body-content-navigation__orders-body-text">
                <tr>
                  <td># {index} </td>
                  <td>19 Сентября, 2022</td>
                  <td>В обработке</td>
                  <td> {objOrder.orderInformation.orderPrice} р.</td>
                  <td>
                    <Link to="view-order">
                      <button
                        onClick={() => handleOpenOrder(objOrder.orderInformation.orderValue)}
                        className="account-body-content-navigation__orders-body-text-button black-button">
                        Перейти
                      </button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          ))
        ) : (
          <div className="">Вы пока не сделали ни одного заказа</div>
        ))
      )}
    </>
  );
};

export default AccountOrders;
