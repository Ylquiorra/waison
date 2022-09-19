import React from 'react';
import { Link } from 'react-router-dom';

const AccountOrders = () => {
  return (
    <table className="account-body-content-navigation__orders">
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
          <td>#245</td>
          <td>19 Сентября, 2022</td>
          <td>В обработке</td>
          <td>590 р.</td>
          <td>
            <Link to="view-order">
              <button className="account-body-content-navigation__orders-body-text-button black-button">
                Перейти
              </button>
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default AccountOrders;
