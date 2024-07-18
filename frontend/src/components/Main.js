import React from 'react';
const Profile = React.lazy(() =>
    import("profile/Profile").catch(() => <>Сервис не доступен!</>)
);

const CardContent = React.lazy(() =>
    import("cardContent/CardContent").catch(() => <>Сервис не доступен!</>)
);

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {


  return (
    <main className="content">
        <React.Suspense fallback={"Loading"}>
        <Profile/>
      <CardContent/>
        </React.Suspense>
    </main>
  );
}

export default Main;
