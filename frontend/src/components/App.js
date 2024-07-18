import React from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../utils/api";
import { CurrentUserContextProvider } from "shared";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth.js";
import { eventEmitter, PopupWithForm } from "shared";

const Login = React.lazy(() =>
    import("auth/Login").catch(() => <>Сервис не доступен!</>)
);
const Register = React.lazy(() =>
    import("auth/Register").catch(() => <>Сервис не доступен!</>)
);
function App() {

  React.useEffect(() => {
    eventEmitter.subscribe('Authorized', (e) => onLogin(e));
    eventEmitter.subscribe('AuthorizedFailed', (e) => onLoginFailed(e));
    eventEmitter.subscribe('Registered', (e) => onRegister(e));
    eventEmitter.subscribe('RegisterFailed', (e) => onRegisterFailed(e));
  });
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //В компоненты добавлены новые стейт-переменные: email — в компонент App
  const [email, setEmail] = React.useState("");

  const history = useHistory();
  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [history]);

  function onRegister(e) {
    setTooltipStatus("success");
    setIsInfoToolTipOpen(true);
    history.push("/signin");
  }

  function onRegisterFailed(ev){
    setTooltipStatus("fail");
    setIsInfoToolTipOpen(true);
  }

  function onLogin(e) {
    setEmail(e.Email)
    setIsLoggedIn(true);
    history.push("/");
  }

  function onLoginFailed(e) {
    setTooltipStatus("fail");
    setIsInfoToolTipOpen(true);
  }

  function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    history.push("/signin");
  }

  return (
    // В компонент App внедрён контекст через CurrentUserContext.Provider
    <CurrentUserContextProvider>
      <div className="page__content">
        <Header email={email} onSignOut={onSignOut} />
        <React.Suspense fallback={"Loading"}>
        <Switch>
          {/*Роут / защищён HOC-компонентом ProtectedRoute*/}
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={isLoggedIn}
          />
          {/*Роут /signup и /signin не является защищёнными, т.е оборачивать их в HOC ProtectedRoute не нужно.*/}
          {/*<AuthApp />*/}
          {/*<Route path="/signup">
            <Register />
          </Route>
          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>*/}
          <Route path="/signup">
            <Register onRegister={onRegister}  onRegisterFailed={onRegisterFailed} onEnterClick={() => history.push("/signin")} />
          </Route>
          <Route path="/signin">
            <Login onLogin={onLogin} onLoginFailed={onLoginFailed} />
          </Route>
        </Switch>
        <Footer />
        <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
        </React.Suspense>
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={() => setIsInfoToolTipOpen(false)}
          status={tooltipStatus} />
      </div>
    </CurrentUserContextProvider>
  );
}

export default App;
