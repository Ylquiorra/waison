import React from 'react';

import { getAuth, signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCurrentNavigate, removeUser } from '../redux/user/slice';

import AccountDashboard from './AccountDashboard';
import AccountOrders from './AccountOrders';
import AccountDetails from './AccountDetails';

const navigateList = ['Общее', 'Заказы', 'Адрес', 'Редактирование аккаунта'];

const AccountNavigate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const { currentNavigate } = useSelector((state) => state.userSlice);

  const handleClickToSingOut = () => {
    if (window.confirm('Вы действительно хотите выйти из аккаунта?')) {
      signOut(auth).then();
      // dispatch(removeUser());
      dispatch(removeUser()).catch(alert('Не получилось выйти из аккаунта.')); //!описанный в firebase способ
      navigate('/login');
    }
  };

  const handleClickToChangeNavPoint = (index) => {
    dispatch(setCurrentNavigate(index));
    navigate('/account');
  };

  return (
    <nav className="account-body__navigation">
      <ul className="account-body__navigation-list">
        {navigateList.map((listName, index) => (
          <li key={index}>
            <a
              onClick={() => handleClickToChangeNavPoint(index)}
              className={currentNavigate === index ? 'account-body__navigation-list_active' : ''}>
              {listName}
            </a>
          </li>
        ))}
        <li>
          <a onClick={handleClickToSingOut}>Выход</a>
        </li>
      </ul>
      <div className="account-body__navigation-content">
        {currentNavigate === 0 ? <AccountDashboard /> : ''}
        {currentNavigate === 1 ? <AccountOrders /> : ''}
        {currentNavigate === 3 ? <AccountDetails /> : ''}
      </div>
    </nav>
  );
};

export default AccountNavigate;
