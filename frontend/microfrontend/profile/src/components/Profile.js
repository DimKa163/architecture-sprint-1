import React from "react";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import "../blocks/profile/profile.css";
import {useCurrentUserContext, CurrentUserContext, eventEmitter} from "shared";
import {api} from "../services/api";

function Profile() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
        React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
        React.useState(false);
    const handleEditProfilePopupOpen = () =>
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    const handleEditAvatarPopupOpen = () =>
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);

    const currentUser = useCurrentUserContext()
    React.useEffect(() => {
        api.getUserInfo().then((data) => {
            currentUser.setCurrentUser(data);
        });
    }, []);

    if (!currentUser?.name) return <></>;

    return (
        <div>
            <section className="profile page__section">
                <div
                    className="profile__image"
                    onClick={handleEditAvatarPopupOpen}
                    style={{ backgroundImage: `url(${currentUser.avatar})` }}
                ></div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button
                        className="profile__edit-button"
                        type="button"
                        onClick={handleEditProfilePopupOpen}
                    ></button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>

                <button
                    className="profile__add-button"
                    type="button"
                    onClick={() => eventEmitter.publish("addPlace", {})}
                ></button>
            </section>
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={handleEditProfilePopupOpen}
            />
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={handleEditAvatarPopupOpen}
            />
        </div>
    );
}

export default Profile;