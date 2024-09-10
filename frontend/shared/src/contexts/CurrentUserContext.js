import React from 'react';

// Объект контекста CurrentUserContext экспортируется из отдельного файла директории contexts
export const CurrentUserContext = React.createContext();

function useCurrentUserService() {
    const [currentUser, setCurrentUser] = React.useState(null);

    return {
        ...currentUser,
        setCurrentUser,
    };
}

export function useCurrentUserContext() {
    const context = React.useContext(CurrentUserContext);

    if (context === undefined) {
        throw new Error();
    }

    return context;
}

export function CurrentUserContextProvider(props) {
    const value = useCurrentUserService();
    return <CurrentUserContext.Provider value={value}>{props.children}</CurrentUserContext.Provider>;
}