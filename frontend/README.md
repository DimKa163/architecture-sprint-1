Решение содержит 4 пакета:
1 - основной, он же исходный. остались инфраструктурные вещи(роутинг, CurrentUserContext, localStorage)
2 - микросервис авторизации пользователя microfrontend/auth
3 - микросервис работы с контентом microfrontend/content
4 - микросервис работы профилем пользователя microfrontend/profile

и один внешний пакет, который используют несколько микросервисов:

- shared.
  В него вынес общий компонент PopupWithForm со стилями, реализацию CurrentUserContext, eventEmitter.

Описание компонентов.

microfrontend/auth экспортирует:

- компонент аутентификации Login;
- компонент регистрации Register;
- компонент утилит(проверка токена) AuthUtils;

microfrontend/content экспортирует:

- компонент карточки Card
- компонент списка карточек CardList
- попап компонент добавления места AddPlacePopup
- попап компонент просмотра места ImagePopup

microfrontend/profile экспортирует:

- компонент провиля Profile
- попап компонент редактирования аватара EditAvatarPopup
- попап компонент редактирования профиля EditProfilePopup

основной проект содержит: App, Header, Main, ProtectedRoute, Footer, InfoTooltip
Импортирует компоненты из микросервисов.
Инициализируется общий контект пользователя.
Выполняется маршрутизация

Запуск.
Во всех пакетах последовательно выполнить три команды:

- npm i
- npm run build
- npm run start