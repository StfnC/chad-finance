import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL
} from './types';

export const loadUser = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const url = 'http://localhost:8000/auth/users/me/'
        const body = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }

        const res = await fetch(url, body);

        if (res.ok) {
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: res.json()
            });
        } else {
            dispatch({
                type: LOAD_USER_FAIL
            });
        }
    } else {
        dispatch({
            type: LOAD_USER_FAIL
        });
    }
};

export const login = (email, password) => async dispatch => {
    // TODO: Remplacer le base url par une variable dans .env
    const url = 'http://localhost:8000/auth/jwt/create/'
    const body = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }

    const res = await fetch(url, body);

    if (res.ok) {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.json()
        });

        dispatch(loadUser());
    } else {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};
