import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { setCurrentNavigate, removeUser } from '../redux/user/slice';
import { useAuth } from '../hooks/useAuth';

const navigateList = ['Общее', 'Заказы', 'Адрес', 'Редактирование аккаунта'];

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const { currentNavigate } = useSelector((state) => state.userSlice);

  const handleClickToSingOut = () => {
    signOut(auth).then();
    dispatch(removeUser()).catch(() => alert('Не получилось выйти из аккаунта.'));
    navigate('/login');
  };

  const { isAuth, email } = useAuth();

  return isAuth ? (
    <main className="account universal">
      <div className="account__container universal__container">
        <div className="account-body universal-body">
          <div className="body-account universal-body__content">
            <div className="body-account-breadcrumbs universal-body__content-breadcrumbs">
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
            <div className="body-login__main-title universal-body__title">
              <h1>Аккаунт</h1>
            </div>
          </div>
          <nav className="account-body__navigation">
            <ul className="account-body__navigation-list">
              {navigateList.map((listName, index) => (
                <li key={index}>
                  <a
                    onClick={() => dispatch(setCurrentNavigate(index))}
                    className={
                      currentNavigate === index ? 'account-body__navigation-list_active' : ''
                    }>
                    {listName}
                  </a>
                </li>
              ))}
              <li>
                <a onClick={handleClickToSingOut}>Выход</a>
              </li>
            </ul>
            <div className="account-body__navigation-content">
              <h6>
                Привет, <span>{email}</span>{' '}
              </h6>
              <p>
                Здесь Вы можете просматривать свои последние заказы, управлять адресами доставки, а
                также изменять свой пароль и редактировать данные учетной записи.
              </p>
            </div>
          </nav>
        </div>
      </div>
    </main>
  ) : (
    <Navigate to="/login" />
  );
};

export default Account;
