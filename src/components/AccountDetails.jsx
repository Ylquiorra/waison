import React from 'react';

const AccountDetails = () => {
  return (
    <div className="account-body-content-navigation__details">
      <div className="details-navigation-account__main-info-form">
        <div className="details-navigation-account-main-info__name">
          <div className="details-navigation-account-main-info__name-first-name">
            <h6 className="universal-input-name">
              Имя <span className="universal-asterisk"> *</span>
            </h6>
            <input className="universal-input" type="text" />
          </div>
          <div className="details-navigation-account-main-info__name-last-name">
            <h6 className="universal-input-name">
              Фамилия <span className="universal-asterisk"> *</span>
            </h6>
            <input className="universal-input" type="text" />
          </div>
        </div>
        <div className="details-navigation-account-main-info__nickname">
          <h6 className="universal-input-name">
            Имя пользователя <span className="universal-asterisk"> *</span>
          </h6>
          <input className="universal-input" type="text" />
          <p>Под этим именем вы будете видны всем пользователям.</p>
        </div>
        <div className="details-navigation-account-main-info__email">
          <h6 className="universal-input-name">
            Электронная почта<span className="universal-asterisk"> *</span>
          </h6>
          <input className="universal-input" type="text" />
        </div>
      </div>
      <div className="details-navigation-account__change-password">
        <div className="details-navigation-account-change-password__title">
          <h2>Смена пароля</h2>
        </div>
        <div className="details-navigation-account-change-password__current-password">
          <h6 className="universal-input-name">Введите текущий пароль</h6>
          <input className="universal-input" type="password" />
        </div>
        <div className="details-navigation-account-change-password__new-password">
          <h6 className="universal-input-name">Введите новый пароль</h6>
          <input className="universal-input" type="password" />
        </div>
        <div className="details-navigation-account-change-password__confirm-new-password">
          <h6 className="universal-input-name">Подтвердите новый пароль</h6>
          <input className="universal-input" type="password" />
        </div>
      </div>
      <button className="details-navigation-account__button black-button">Сохранить</button>
    </div>
  );
};

export default AccountDetails;
