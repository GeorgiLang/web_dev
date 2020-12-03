import { api } from '../Api/api'
import { preloaderAC, isDisabledAC, submitOrderThunk } from './shopping_reducer'
import { linePreloaderAC } from './preloader_reducer'
import { reset } from 'redux-form'
import { cleanPurchasesThunk, addPurchaseToBasketThunk } from './cards_functions'

const POPUP_MESSAGE = 'POPUP_MESSAGE'
const IS_POPUP = 'IS_POPUP'
const IS_VALID_TOKEN = 'IS_VALID_TOKEN'
const IS_VERIFY_EMAIL = 'IS_VERIFY_EMAIL'
const USER_DATA = 'USER_DATA'
const LIKED = 'LIKED'
const MODAL_NAME = 'MODAL_NAME'
const CLEAN_USER_DATA = 'CLEAN_USER_DATA'
const SUBMIT_NAME = 'SUBMIT_NAME'
const EDIT_BUTTON = 'EDIT_BUTTON'

let initialState = {
    isValidToken: false,
    isVerifyEmail: false,
    modal_name: 'login',
    popup_message: 'login.wait',
    isPopup: false,
    submit_name: 'login.sign_in',
    liked: '',
    editButton: false,
    userData: {
        first_name: '',
        last_name: '',
        email: '',
        tel: '',
        user_ID: 0,
        checkbox: false
    }
}

const userRoomReducer = (state = initialState, action) => {

    switch (action.type) {
        case IS_VALID_TOKEN:
            return {
                ...state,
                isValidToken: action.isValidToken
            }
        case IS_VERIFY_EMAIL:
            return {
                ...state,
                isVerifyEmail: action.isVerifyEmail
            }
        case LIKED:
            return {
                ...state,
                liked: action.liked
            }
        case MODAL_NAME:
            return {
                ...state,
                modal_name: action.modal_name
            }
        case SUBMIT_NAME:
            return {
                ...state,
                submit_name: action.submit_name
            }
        case USER_DATA:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    first_name: action.userData.first_name ? action.userData.first_name : state.userData.first_name,
                    last_name: action.userData.last_name ? action.userData.last_name : state.userData.last_name,
                    user_ID: action.userData.user_ID ? action.userData.user_ID : state.userData.user_ID,
                    email: action.userData.email ? action.userData.email : state.userData.email,
                    tel: action.userData.tel ? action.userData.tel : state.userData.tel,
                    checkbox: (action.checkbox !== undefined) ? action.checkbox : state.userData.checkbox
                }
            }
        case POPUP_MESSAGE:
            return {
                ...state,
                popup_message: action.popup_message
            }
        case IS_POPUP:
            return {
                ...state,
                isPopup: action.isPopup
            }
        case EDIT_BUTTON:
            return {
                ...state,
                editButton: action.editButton
            }
        case CLEAN_USER_DATA:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    first_name: '',
                    last_name: '',
                    email: '',
                    tel: '',
                    user_ID: 0,
                    checkbox: false
                }
            }
        default: return state
    }
}

export const isValidTokenAC = isValidToken =>
    ({ type: 'IS_VALID_TOKEN', isValidToken })

export const isVerifyEmailAC = isVerifyEmail =>
    ({ type: 'IS_VERIFY_EMAIL', isVerifyEmail })

export const setModalNameAC = modal_name =>
    ({ type: 'MODAL_NAME', modal_name })

export const setSubmitNameAC = submit_name =>
    ({ type: 'SUBMIT_NAME', submit_name })

export const userDataAC = (userData, checkbox) =>
    ({ type: 'USER_DATA', userData, checkbox })

export const isCheckedAC = isChecked =>
    ({ type: 'IS_CHECKED', isChecked })

export const likedAC = liked =>
    ({ type: 'LIKED', liked })

export const popupMessageAC = popup_message =>
    ({ type: 'POPUP_MESSAGE', popup_message })

export const isPopupAC = isPopup =>
    ({ type: 'IS_POPUP', isPopup })

export const cleanUserDataAC = () =>
    ({ type: 'CLEAN_USER_DATA' })

export const editButtonAC = editButton =>
    ({ type: 'EDIT_BUTTON', editButton })    

const cleanAndReport = (dispatch, message) => {

    dispatch(preloaderAC(false))
    dispatch(isDisabledAC(false))
    dispatch(reset('order'))
    dispatch(popupMessageAC(message))
    dispatch(isPopupAC(true))
}

export const isValidTokenThunk = checkbox => dispatch => {

    let token = localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')
    let user_email = localStorage.getItem('user_email') ? localStorage.getItem('user_email') : sessionStorage.getItem('user_email')

    if (token && user_email) {

        let data = {
            'user_email': `${user_email}`
        }

        api.validateToken(data, token).then((res) => {

            if (res.data.data.status === 200) {

                dispatch(isValidTokenAC(true))
                dispatch(getUserDataThunk(checkbox))
                dispatch(linePreloaderAC(false))
            } else {

                dispatch(isValidTokenAC(false))
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('user_email')
            }

        }).catch((error) => {

            dispatch(isValidTokenAC(false))
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('user_email')
            console.log(error.message)
        })
    }
}

const setPurchaseToBasketFromStorage = () => dispatch => {

    let purchases = JSON.parse(sessionStorage.getItem('purchase'))

    if (purchases) {

        for (let i = 0; i < purchases.length; i++) {

            dispatch(addPurchaseToBasketThunk(purchases[i]))
        }
    }
}

export const tokenListenerThunk = path => dispatch => {

    dispatch(setPurchaseToBasketFromStorage())
    
    if (path[3] === 'token') {

        dispatch(linePreloaderAC(true))

        let token = path[2]
        let username = path[4]
        let user_email = path[5]
        let user_ID = path[6]

        sessionStorage.setItem('token', token)
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('user_email', user_email)
        sessionStorage.setItem('user_ID', user_ID)

        let data = {
            "verified_email": true,
            "first_name": username
        }

        api.setUserData(data, user_ID, token).then((res) => {

            dispatch(isVerifyEmailAC(true))
            let userData = {
                email: res.data.email,
                first_name: username,
                user_ID: res.data.id
            }
            let user_data = JSON.stringify(userData)
            sessionStorage.setItem('userData', user_data)
            dispatch(userDataAC(userData))
            dispatch(isValidTokenThunk())

        }).catch((error) => {

            dispatch(isPopupAC(true))
            console.log(error.message)
        })
    } else {

        dispatch(isValidTokenThunk())
    }
}

export const setUserDataThunk = values => dispatch => {

    let token = values.checkbox ? localStorage.getItem('token') : sessionStorage.getItem('token')
    let user_ID = values.checkbox ? localStorage.getItem('user_ID') : sessionStorage.getItem('user_ID')

    console.log(token, user_ID)

    if (token && user_ID) {

        let data = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            tel: values.tel
        }

        api.setUserData(data, user_ID, token).then((res) => {

            localStorage.removeItem('userData') 
            sessionStorage.removeItem('userData')

            dispatch(likedAC(res.data.liked))
            dispatch(isVerifyEmailAC(+res.data.verified_email))
            let userData = {
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                email: res.data.email,
                user_ID: res.data.id,
                tel: res.data.tel
            }
            let user_data = JSON.stringify(userData)

            if (values.checkbox) {
                localStorage.setItem('userData', user_data)
            } else {
                sessionStorage.setItem('userData', user_data)
            }
            dispatch(userDataAC(userData))
            dispatch(preloaderAC(false))
            dispatch(isDisabledAC(false))

        }).catch((error) => {
            
            dispatch(preloaderAC(false))
            dispatch(isDisabledAC(false))
            console.log(error.message)
        })
    }
}

export const getUserDataThunk = (checkbox)=> dispatch => {

    let token = localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token')
    let user_ID = localStorage.getItem('user_ID') ? localStorage.getItem('user_ID') : sessionStorage.getItem('user_ID')

    //token was inspect for valid at first load
    if (token && user_ID) {

        api.getUserData(user_ID, token).then((res) => {

            dispatch(likedAC(res.data.liked))
            dispatch(isVerifyEmailAC(+res.data.verified_email))
            let userData = {
                first_name: res.data.first_name,
                last_name: res.data.last_name,
                email: res.data.email,
                user_ID: res.data.id,
                tel: res.data.tel
            }
            let user_data = JSON.stringify(userData)

            if (checkbox) {
                localStorage.setItem('userData', user_data)
            } else {
                sessionStorage.setItem('userData', user_data)
            }
            
            dispatch(userDataAC(userData))

        }).catch((error) => {

            let message = "login.error"
            cleanAndReport(dispatch, message)
            console.log(error.response.data.message)
        })
    }
}

export const formThunk = values => (dispatch, getState) => {
 
    dispatch(preloaderAC(true))
    dispatch(isDisabledAC(true))

    let modal_name = getState().userRoom.modal_name

    const { first_name, email, password, checkbox } = values

    //register username latin only
    if (modal_name === 'register') {

        let data = {
            "username": `${email}`,
            "email": `${email}`,
            "password": `${password}`
        }

        api.registerUser(data, 'register').then(response => {

            if (response.data.code === 200) {

                let _data = {
                    "username": `${email}`,
                    "password": `${password}`
                }

                api.getToken(_data).then(res => {

                    const verify = new FormData()

                    verify.append('first_name', first_name)
                    verify.append('email', email)
                    verify.append('token', res.data.token)
                    verify.append('user_id', response.data.id)

                    api.verifyEmail(verify).then(() => {

                        cleanAndReport(dispatch, "login.check_email")
                    }).catch((error) => {

                        cleanAndReport(dispatch, "login.error")
                        console.log(error.response.data.message)
                    })
                })
            }
        }).catch((error) => {

            let message = "login.error"
            if (error.response.data.code === 406) {
                message = "login.exists"
            }

            cleanAndReport(dispatch, message)
            console.log(error.response.data.message)
        })
    } else if (modal_name === 'login') {

        let _data = {
            "username": `${email}`,
            "password": `${password}`
        }

        api.getToken(_data).then(res => {

            api.getUserData(res.data.id, res.data.token).then((response) => {

                if (response.data.verified_email === "1") {
                    
                    if (checkbox) {
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('user_email', res.data.user_email)
                        localStorage.setItem('user_ID', res.data.id)
                    } else {
                        sessionStorage.setItem('token', res.data.token)
                        sessionStorage.setItem('user_email', res.data.user_email)
                        sessionStorage.setItem('user_ID', res.data.id)
                    }
                    dispatch(isValidTokenThunk(checkbox))
                } else {

                    dispatch(popupMessageAC("login.check_email"))
                    dispatch(isPopupAC(true))
                }

                dispatch(preloaderAC(false))
                dispatch(isDisabledAC(false))
                dispatch(reset('order'))
            }).catch((error) => {

                cleanAndReport(dispatch, "login.invalid")
                console.log(error.message)
            })

        }).catch((error) => {

            cleanAndReport(dispatch, "login.invalid")
            console.log(error.message)
        })

    } else if (modal_name === 'edit_user_data') {

        dispatch(setUserDataThunk(values))
        dispatch(preloaderAC(false))
        dispatch(isDisabledAC(false))
        dispatch(setModalNameAC("login.sign_in"))
    }
}

export const exitThunk = () => dispatch => {

    dispatch(cleanUserDataAC())
    dispatch(isVerifyEmailAC(false))
    dispatch(isValidTokenAC(false))
    dispatch(cleanPurchasesThunk())
    dispatch(setModalNameAC('login'))
    dispatch(setSubmitNameAC('login.sign_in'))
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user_email')
    sessionStorage.removeItem('userData')
    sessionStorage.removeItem('user_ID')
    sessionStorage.removeItem('username')
    localStorage.removeItem('token')
    localStorage.removeItem('user_email')
    localStorage.removeItem('userData')
    localStorage.removeItem('user_ID')
    localStorage.removeItem('username')
}

export default userRoomReducer