const SET_AUTHORIZED = "SET_AUTHORIZED";

const initialState = {
    email: null
};

export function setAuthorized(email) {
    return {
        type: SET_AUTHORIZED,
        user: email
    };
}

export function authReducer(state=initialState, action) {
    switch (action.type) {
        case SET_AUTHORIZED:   return { ...state, email: action.email };
        default: return state;
    }
}