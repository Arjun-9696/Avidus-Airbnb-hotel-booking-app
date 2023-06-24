import * as types from './actionTypes';
import axios from 'axios';

const register = (payload) => (dispatch) => {
    dispatch({ type: types.REGISTER_REQUEST });

    return axios
        .post('https://avidus-assignment-production.up.railway.app/register', payload)
        .then((r) => {
            dispatch({ type: types.REGISTER_SUCCESS, payload: r.data });
            return types.REGISTER_SUCCESS;
        })
        .catch((err) => {
            dispatch({ type: types.REGISTER_FAILURE, payload: err });
            return types.REGISTER_FAILURE;
        });
};

const login = (params) => (dispatch) => {
    dispatch({ type: types.LOGIN_REQUEST });

    return axios
        .post('https://avidus-assignment-production.up.railway.app/login', params)
        .then((r) => {
            dispatch({ type: types.LOGIN_SUCCESS, payload: r.data });
            return types.LOGIN_SUCCESS;
        })
        .catch((err) => {
            dispatch({ type: types.LOGIN_FAILURE, payload: err });
            return types.LOGIN_FAILURE;
        });
};

const logout = () => (dispatch) => {
    dispatch({ type: types.LOGOUT_REQUEST });
};
export { register, login, logout };