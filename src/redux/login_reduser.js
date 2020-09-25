import { api } from '../Api/api.js'
import { reset } from 'redux-form'

const IS_LOGIN = 'IS_LOGIN'
const IS_DISABLED = 'IS_DISABLED'
const IS_AUTH = 'IS_AUTH'
const IS_FORGET = 'IS_FORGET'
const IS_USERNAME_INPUT_VISIBLE = 'IS_USERNAME_INPUT_VISIBLE'
const IS_EMAIL_INPUT_VISIBLE = 'IS_EMAIL_INPUT_VISIBLE'
const IS_PASSWORD_INPUT_VISIBLE = 'IS_PASSWORD_INPUT_VISIBLE'
const IS_REGISTERED = 'IS_REGISTERED'

let initialState = {
    isAuth: false,
    isLogin: false,
    isForget: false,
    isDisabled: false,
    isUsernameInputVisible: true,
    isEmailInputVisible: true,
    isPasswordInputVisible: true,
    isRegistered: false,
    userId: 0
}

const isLoginReducer = (state = initialState, action) => {

    if (action.type === IS_LOGIN) {

        return {
            ...state,
            isLogin: action.isLogin
        };
    } else if (action.type === IS_DISABLED) {
        return {
            ...state,
            isDisabled: action.isDisabled
        }
    } else if (action.type === IS_AUTH) {
        return {
            ...state,
            isAuth: action.isAuth
        }
    } else if (action.type === IS_FORGET) {
        return {
            ...state,
            isForget: state.isForget === true ? false : true
        }
    
    } else if (action.type === IS_USERNAME_INPUT_VISIBLE) {
        return {
            ...state,
            isUsernameInputVisible: action.isUsernameInputVisible
        }
    } else if (action.type === IS_EMAIL_INPUT_VISIBLE) {
        return {
            ...state,
            isEmailInputVisible: action.isEmailInputVisible
        }
    } else if (action.type === IS_PASSWORD_INPUT_VISIBLE) {
        return {
            ...state,
            isPasswordInputVisible: action.isPasswordInputVisible
        }
    } else if (action.type === IS_REGISTERED) {
        return {
            ...state,
            isRegistered: action.isRegistered
        }
    }
    return state;
}

const isDisabledAC = isDisabled => ({ type: "IS_DISABLED", isDisabled })

export const isLoginAC = isLogin => ({ type: "IS_LOGIN", isLogin })
export const isAuthAC = isAuth => ({ type: "IS_AUTH", isAuth })
export const isForgetAC = () => ({ type: "IS_FORGET" })
export const isUsernameInputVisibleAC = isUsernameInputVisible => 
    ({ type: "IS_USERNAME_INPUT_VISIBLE", isUsernameInputVisible })
export const isEmailInputVisibleAC = isEmailInputVisible => 
    ({ type: "IS_EMAIL_INPUT_VISIBLE", isEmailInputVisible })
export const isPasswordInputVisibleAC = isPasswordInputVisible => 
    ({ type: "IS_PASSWORD_INPUT_VISIBLE", isPasswordInputVisible })
export const isRegisteredAC = isRegistered => ({ type: 'IS_REGISTERED', isRegistered })

export const loginFormThunk = action => (dispatch, getState) => {

    let isPasswordInputVisible = getState().login.isPasswordInputVisible
    let isRegistered = getState().login.isRegistered

    if (action === 'registered' && !isRegistered) {
        dispatch(isRegisteredAC(true))
        dispatch(isEmailInputVisibleAC(false))
    } else if (action === 'registered' && isRegistered) {
        dispatch(isRegisteredAC(false))
        dispatch(isEmailInputVisibleAC(true))
    } else if (action === 'forget_password' && isPasswordInputVisible) {
        dispatch(isUsernameInputVisibleAC(false))
        dispatch(isEmailInputVisibleAC(true))
        dispatch(isPasswordInputVisibleAC(false))
    } else if (action === 'forget_password' && !isPasswordInputVisible) {
        dispatch(isUsernameInputVisibleAC(true))
        dispatch(isEmailInputVisibleAC(false))
        dispatch(isPasswordInputVisibleAC(true))
    }
}

export const registerUserThunk = values => (dispatch, getState) => {

    dispatch(isDisabledAC(true))
    let isEmailInputVisible = getState().login.isEmailInputVisible
    let isPasswordInputVisible = getState().login.isPasswordInputVisible

    const { username, email, password, remember } = values
    const loginForm = (data, req) => {

        api.registerUser(data, req).then(res => {

            if (res.data.code === 200 && req === 'register') {

                dispatch(isDisabledAC(false))
                dispatch(isLoginAC(true))
                dispatch(reset('registerUser'))

            } else if (res.data.code === 404) {


            }
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    if (isEmailInputVisible && isPasswordInputVisible) {

        loginForm(
            {
                'username': username,
                'email': email,
                'password': password
            },
            'register')

    } else if (!isEmailInputVisible && isPasswordInputVisible) {
        api.getToken(
            {
                'username': username,
                'password': password
            }).then(res => {

                if (username === res.data.user_display_name) {

                    if (remember) {
                        localStorage.setItem(username, res.data.token);
                    }

                    dispatch(isDisabledAC(false))
                    dispatch(isLoginAC(true))
                    dispatch(reset('registerUser'))
                }
            })

    } else if (!isEmailInputVisible && !isPasswordInputVisible) {
        loginForm({ 'user_login': email }, 'lostpassword')
    }
}

export default isLoginReducer