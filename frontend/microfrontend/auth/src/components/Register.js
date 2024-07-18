import React from 'react';
import "../blocks/login/login.css";
import "../blocks/auth-form/auth-form.css";
import * as auth from "../services/auth.service";
import{eventEmitter} from "shared";
function Register ({ onRegister, onRegisterFailed, onEnterClick }){
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e){
    e.preventDefault();
    auth.register(email, password)
        .then(() => eventEmitter.publish("Registered", {}))
        .catch(() => eventEmitter.publish("RegisterFailed", {}))
  }
  return (
      <div className="auth-form">
        <form className="auth-form__form" onSubmit={handleSubmit}>
          <div className="auth-form__wrapper">
            <h3 className="auth-form__title">Регистрация</h3>
            <label className="auth-form__input">
              <input
                  type="text"
                  name="email"
                  id="email"
                  className="auth-form__textfield"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
            </label>
            <label className="auth-form__input">
              <input
                  type="password"
                  name="password"
                  id="password"
                  className="auth-form__textfield"
                  placeholder="Пароль"
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
            </label>
          </div>
          <div className="auth-form__wrapper">
            <button className="auth-form__button" type="submit">
              Зарегистрироваться
            </button>
            <p className="auth-form__text">
              Уже зарегистрированы?{" "}
              <a className="auth-form__link" onClick={onEnterClick}>
                Войти
              </a>
            </p>
          </div>
        </form>
      </div>
  )
}

export default Register;