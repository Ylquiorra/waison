import React from 'react';

import { useAuth } from '../hooks/useAuth';

const AccountDashboard = () => {
  const { email } = useAuth();

  return (
    <div className="account-body-content-navigation__dashboard">
      <h6>
        Привет, <span>{email}</span>.
      </h6>
      <p>
        Здесь Вы можете просматривать свои последние заказы, управлять адресами доставки, а также
        изменять свой пароль и редактировать данные учетной записи.
      </p>
    </div>
  );
};

export default AccountDashboard;
