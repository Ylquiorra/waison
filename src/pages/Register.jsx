import React from 'react';
import { Link } from 'react-router-dom';

import SingUp from '../components/Authorization/SingUp/SingUp';

const Register = () => {
  return (
    <main className="register universal">
      <div className="register__container universal__container">
        <div className="register__body body-register universal-body">
          <div className="body-register__content universal-body__content">
            <div className="body-register__content-breadcrumbs universal-body__content-breadcrumbs">
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
            <div className="body-register__main-title universal-body__title">
              <h1>Аккаунт</h1>
            </div>
          </div>
          <div className="register__main">
            <div className="body-register__title">
              <h2>Регистрация</h2>
            </div>
            <SingUp />
            <div className="register-button__text">
              <p>или</p>
            </div>
            <Link to="/login">
              <div className="register-button__return">
                <p>Войти</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
