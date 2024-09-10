import React from "react";
import "../blocks/places/places.css";
import api from "../services/api.js";
import Card from "./Card.js";
import ImagePopup from "./ImagePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { eventEmitter, useCurrentUserContext } from "shared";

function CardContent(){
    const [cards, setCards] = React.useState([]);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [showAddPlacePopup, setShowAddPlacePopup] = React.useState(false);

    const currentUserService = useCurrentUserContext();
    const toggleAddPlacePopup = () => {
        setShowAddPlacePopup(!showAddPlacePopup);
    };

    React.useEffect(() => {
        getCardList();
        eventEmitter.subscribe("addPlace", (ev) => toggleAddPlacePopup());
        eventEmitter.subscribe("getCardList", (ev) => getCardList());
    }, []);

    const getCardList = () => {
        api
            .getCardList()
            .then((cards) => {
                setCards(cards);
            })
            .catch((err) => console.log(err));
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUserService._id);
        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((cards) =>
                    cards.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => console.log(err));
    }

    function handleCardDelete(card) {
        api
            .removeCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id));
            })
            .catch((err) => console.log(err));
    }
    function handleCardClick(card) {
        setSelectedCard(card);
    }
    function handleClose() {
        setSelectedCard(null);
    }
    return (<>
        <section className="places page__section">
            <ul className="places__list">
                {cards.map((card) => (
                    <Card
                        currentUserId={currentUserService._id}
                        key={card._id}
                        card={card}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                ))}
            </ul>
        </section>
        <ImagePopup card={selectedCard} onClose={handleClose} />

        <AddPlacePopup
            isOpen={showAddPlacePopup}
            onClose={() => toggleAddPlacePopup()}
            callBack={() => getCardList()}
        />
    </>)
}

export default CardContent;