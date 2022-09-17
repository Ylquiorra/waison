import React from 'react';

const Form = ({ handleClick, buttonText }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <>
      <div className="body-form__input-email input-email">
        <div className="form-input-email__title input-email__title">
          <h5>Введите email</h5>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input-email__input input-email__input"
          required
        />
      </div>
      <div className="body-form__input-password input-password">
        <div className="form-input-password__title input-password__title">
          <h5>Придумайте пароль </h5>
        </div>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-input-password__input input-password__input"
          required
        />
      </div>
      <div className="body-form__additional-elements">
        <div className="form-additional-elements__remember-checkbox">
          <input type="checkbox" />
          <p>Запомнить пароль</p>
        </div>
        <div className="form-additional-elements__forget">
          <p>Забыли пароль?</p>
        </div>
      </div>
      <div className="body-form__buttons">
        <button
          onClick={() => handleClick(email, password)}
          className="form-button__black-button black-button">
          {buttonText}
        </button>
      </div>
    </>
  );
};

export default Form;
