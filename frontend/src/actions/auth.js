import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    VERIFY_SUCCESS,
    VERIFY_FAIL,
} from "./types";

export const verify = (uid, token) => async (dispatch) => {
    const url = "http://localhost:8000/auth/users/activation/";
    const body = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid, token }),
    };

    try {
        const res = await fetch(url, body);

        if (res.ok) {
            dispatch({
                type: VERIFY_SUCCESS,
            });
        } else {
            dispatch({
                type: VERIFY_FAIL,
            });
        }
    } catch (error) {
        dispatch({
            type: VERIFY_FAIL,
        });
    }
};

export const loadUser = () => async (dispatch) => {
    if (localStorage.getItem("access")) {
        const url = "http://localhost:8000/auth/users/me/";
        const body = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `JWT ${localStorage.getItem("access")}`,
                Accept: "application/json",
            },
        };
        try {
            const res = await fetch(url, body);

            if (res.ok) {
                dispatch({
                    type: LOAD_USER_SUCCESS,
                    payload: await res.json(),
                });
            } else {
                dispatch({
                    type: LOAD_USER_FAIL,
                });
            }
        } catch (error) {
            dispatch({
                type: LOAD_USER_FAIL,
            });
        }
    } else {
        dispatch({
            type: LOAD_USER_FAIL,
        });
    }
};

export const login = (email, password) => async (dispatch) => {
    // TODO: Remplacer le base url par une variable dans .env
    const url = "http://localhost:8000/auth/jwt/create/";
    const body = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    };

    try {
        const res = await fetch(url, body);

        if (res.ok) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: await res.json(),
            });

            dispatch(loadUser());
        } else {
            dispatch({
                type: LOGIN_FAIL,
            });
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

export const checkAuthenticated = () => async (dispatch) => {
    if (localStorage.getItem("access")) {
        const url = "http://localhost:8000/auth/jwt/verify/";
        const body = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: localStorage.getItem("access") }),
        };

        try {
            const res = await fetch(url, body);

            // Ce code est renvoyé par /verify/ lorsqu'on send un token invalide
            if ((await res.json().code) !== "token_not_valid") {
                dispatch({
                    type: AUTHENTICATED_SUCCESS,
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL,
                });
            }
        } catch (error) {
            dispatch({
                type: AUTHENTICATED_FAIL,
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL,
        });
    }
};

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
};
