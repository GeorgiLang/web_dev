import { api } from '../Api/api'
import { preloaderAC, isDisabledAC } from './shopping_reducer'
import { linePreloaderAC } from './preloader_reducer'
import { reset } from 'redux-form'
import { clearPurchasesThunk, addPurchaseToBasketThunk, setCardInBasketThunk } from './cards_functions'

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
const EDIT_DISABLED = 'EDIT_DISABLED'
const IS_CHECKED = 'IS_CHECKED'
const PUSH_PATHES = 'PUSH_PATHES'

let initialState = {
    isValidToken: false,
    isVerifyEmail: false,
    isChecked: true,
    editDisabled: false,
    editButton: false,
    modal_name: 'login',
    popup_message: 'login.wait',
    isPopup: false,
    submit_name: 'login.sign_in',
    liked: '',
    path: [],
    userData: {
        first_name: '',
        last_name: '',
        second_name: '',
        email: '',
        tel: '',
        user_ID: 0
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
        case IS_CHECKED:
            return {
                ...state,
                isChecked: action.isChecked
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
                    first_name: action.userData.first_name,
                    last_name: action.userData.last_name,
                    second_name: action.userData.second_name,
                    user_ID: action.userData.user_ID,
                    email: action.userData.email,
                    tel: action.userData.tel
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
        case EDIT_DISABLED:
            return {
                ...state,
                editDisabled: action.editDisabled
            }
        case PUSH_PATHES:
            return {
                ...state,
                path: [
                    ...state.path,
                    action.path
                ]
            }
        case CLEAN_USER_DATA:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    first_name: '',
                    last_name: '',
                    second_name: '',
                    email: '',
                    tel: '',
                    user_ID: 0
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

export const userDataAC = userData =>
    ({ type: 'USER_DATA', userData })

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

export const editDisabledAC = editDisabled =>
    ({ type: 'EDIT_DISABLED', editDisabled })

export const pushPathesAC = path =>
    ({ type: 'PUSH_PATHES', path })


const cleanAndReport = message => dispatch => {

    dispatch(preloaderAC(false))
    dispatch(isDisabledAC(false))
    dispatch(reset('order'))
    dispatch(popupMessageAC(message))
    dispatch(isPopupAC(true))
}

export const getLocalStorageValue = value => {

    return localStorage.getItem(value) ? localStorage.getItem(value) : sessionStorage.getItem(value)
}

const setUserDataFromStorage = () => dispatch => {

    let userData = localStorage.getItem('userData') ? localStorage.getItem('userData') : sessionStorage.getItem('userData')
    let user_data = JSON.parse(userData)
    dispatch(userDataAC(user_data))
}

export const isValidTokenThunk = () => dispatch => {

    let token = getLocalStorageValue('token')
    let user_email = getLocalStorageValue('user_email')

    if (token && user_email) {

        let data = {
            'user_email': `${user_email}`
        }

        api.validateToken(data, token).then((res) => {

            if (res.data.data.status === 200) {

                dispatch(isValidTokenAC(true))
                dispatch(setUserDataFromStorage())
                dispatch(setPurchaseToBasketFromStorage())
            } else {

                dispatch(isValidTokenAC(false))
                localStorage.clear()
            }
        }).catch(() => {

            dispatch(isValidTokenAC(false))
            localStorage.clear()
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

    if (path[3] === 'token') {

        dispatch(setPurchaseToBasketFromStorage())
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

        api.userData(user_ID, token, data).then((res) => {

            dispatch(userData(user_ID, token, res.data, false))

            if (res.data.purchases) {

                let purchases = JSON.parse(res.data.purchases)

                for (let i = 0; i < purchases.length; i++) {

                    dispatch(setCardInBasketThunk(purchases[i].parent_id, purchases[i].category, false, purchases[i].id))
                }
            }
            dispatch(isValidTokenThunk())
            dispatch(linePreloaderAC(false))

        }).catch(() => {

            dispatch(isPopupAC(true))
            dispatch(linePreloaderAC(false))
        })
    } else {

        dispatch(isValidTokenThunk())
    }
}

const userData = (user_ID, token, data, isChecked) => dispatch => {

    let userData = {
        first_name: data.first_name,
        last_name: data.last_name,
        second_name: data.second_name,
        email: data.email,
        user_ID: data.id,
        tel: data.tel
    }
    let user_data = JSON.stringify(userData)

    dispatch(isValidTokenAC(true))
    dispatch(likedAC(data.liked))
    dispatch(isVerifyEmailAC(+data.verified_email))
    dispatch(userDataAC(userData))

    if (isChecked) {
        localStorage.setItem('token', token)
        localStorage.setItem('user_email', data.email)
        localStorage.setItem('user_ID', user_ID)
        localStorage.setItem('userData', user_data)
    } else {
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('user_email', data.email)
        sessionStorage.setItem('user_ID', user_ID)
        sessionStorage.setItem('userData', user_data)
    }
}

export const formThunk = values=> (dispatch, getState) => {

    dispatch(preloaderAC(true))
    dispatch(isDisabledAC(true))

    let modal_name = getState().userRoom.modal_name
    let isChecked = getState().userRoom.isChecked

    const { first_name, email, password } = values

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
                    verify.append('pathname', `/userroom/${res.data.token}/token/${first_name}/${email}/${response.data.id}`)


                    let purchase = getLocalStorageValue('purchase')

                    if (purchase) {

                        let _purchase = JSON.parse(purchase)

                        let purchase_list = []
            
                        for (let i = 0; i < _purchase.length; i++) {
            
                            let arr = {
                                category: _purchase[i].category,
                                id: _purchase[i].id,
                                parent_id: _purchase[i].parent_id
                            }
                            purchase_list.push(arr)
                        }
            
                        let purchases = JSON.stringify(purchase_list)
            
                        api.userData(response.data.id, res.data.token, { "purchases": `${purchases}` }, false).then((res) => {
                            
                        })
                    }

                    api.verifyEmail(verify).then(() => {

                        dispatch(cleanAndReport("login.check_email"))
                    }).catch(() => {

                        dispatch(cleanAndReport("login.error"))
                    })
                })
            }
        }).catch((error) => {

            if (error.response.data.code === 406) {

                dispatch(cleanAndReport("login.exists"))
            } else {
                dispatch(cleanAndReport("login.error"))
            }
        })
    } else if (modal_name === 'login') {

        let _data = {
            "username": `${email}`,
            "password": `${password}`
        }

        api.getToken(_data).then(res => {

            api.userData(res.data.id, res.data.token).then((response) => {

                if (response.data.verified_email === "1") {

                    dispatch(userData(res.data.id, res.data.token, response.data, isChecked))

                    if (response.data.purchases) {

                        let purchases = JSON.parse(response.data.purchases)

                        for (let i = 0; i < purchases.length; i++) {

                            dispatch(setCardInBasketThunk(purchases[i].parent_id, purchases[i].category, false, purchases[i].id))
                        }
                    }
                } else {

                    dispatch(popupMessageAC("login.check_email"))
                    dispatch(isPopupAC(true))
                }
                dispatch(preloaderAC(false))
                dispatch(isDisabledAC(false))
                dispatch(reset('order'))
            }).catch(() => {

                dispatch(cleanAndReport("login.invalid"))
            })
        }).catch(() => {
            dispatch(cleanAndReport("login.invalid"))
        })
    } else if (modal_name === 'forget') {

        let data = {
            "user_login": `${email}`
        }
        api.registerUser(data, 'lost-password').then(res => {

            dispatch(cleanAndReport("login.reset_password"))
        }).catch(() => {
            dispatch(cleanAndReport("login.invalid"))
        })
    }
}

export const exitThunk = () => dispatch => {

    dispatch(preloaderAC(false))
    dispatch(cleanUserDataAC())
    dispatch(isVerifyEmailAC(false))
    dispatch(isValidTokenAC(false))
    dispatch(clearPurchasesThunk())
    dispatch(setModalNameAC('login'))
    dispatch(setSubmitNameAC('login.sign_in'))
    localStorage.clear()
    sessionStorage.clear()
}

export const editFormThunk = values => (dispatch, getState) => {

    dispatch(editDisabledAC(true))
    dispatch(preloaderAC(true))

    let token = getLocalStorageValue('token')
    let user_ID = getLocalStorageValue('user_ID')
    let isChecked = getState().userRoom.isChecked

    let data = {
        "first_name": `${values.first_name}`,
        "last_name": `${values.last_name}`,
        "second_name": `${values.second_name}`,
        "email": `${values.email}`,
        "tel": `${values.tel}`
    }

    api.userData(user_ID, token, data).then((res) => {

        dispatch(editButtonAC(false))
        dispatch(preloaderAC(false))
        dispatch(editDisabledAC(false))
        dispatch(userData(user_ID, token, res.data, isChecked))

    }).catch(() => {
        dispatch(cleanAndReport("login.invalid"))
    })
}

export default userRoomReducer