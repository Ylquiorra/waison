import React from 'react';
import { Link } from 'react-router-dom';

import SingIn from '../components/SingIn';

const Login = () => {
  return (
    <main className="login universal">
      <div className="login__container universal__container">
        <div className="login__body body-login universal-body">
          <div className="body-login__content universal-body__content">
            <div className="body-login__content-breadcrumbs universal-body__content-breadcrumbs">
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
          <div className="login__main">
            <div className="body-login__title">
              <h2>Войти</h2>
            </div>
            <SingIn />
            <div className="login-button__text">
              <p>или</p>
            </div>
            <Link to="/register">
              <div className="login-button__create-account">
                <p>Создать аккаунт</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
