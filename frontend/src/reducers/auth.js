import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    VERIFY_SUCCESS,
    VERIFY_FAIL,
} from "../actions/types";

const initialState = {
    access: localStorage.getItem("access"),
    refresh: localStorage.getItem("refresh"),
    isAuthenticated: null,
    user: null,
};

// TODO: Implementer un systeme de messages qui indique a l'utilisateur si qqchose a fail (register, login, etc.)

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
            localStorage.setItem("access", payload.access);
            localStorage.setItem("refresh", payload.refresh);
            return {
                ...state,
                access: payload.access,
                refresh: payload.refresh,
                isAuthenticated: true,
            };
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user: payload,
            };
        case LOAD_USER_FAIL:
            return {
                ...state,
                user: null,
            };
        case LOGOUT:
        case LOGIN_FAIL:
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: null,
            };
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            };
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
            };
        // TODO: Implementer d'autres states, peut-etre ajouter des messages pour l'utilisateur au lieu de ne rien faire avec ces types d'actions
        case REGISTER_SUCCESS:
        case REGISTER_FAIL:
        case VERIFY_SUCCESS:
        case VERIFY_FAIL:
        default:
            return state;
    }
}
