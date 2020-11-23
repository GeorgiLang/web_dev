import { api } from '../Api/api.js'
import { cleanPurchasesAC } from './cards_reduсer'
import { reset } from 'redux-form'

const IS_DISABLED = 'IS_DISABLED'
const PRELOADER = 'PRELOADER'
const CONSULT = 'CONSULT'
const POPUP = 'POPUP'
const MESSAGE_ID = 'MESSAGE_ID'

const initialState = {
    preloader: false,
    isDisabled: false,
    isVisible: false,
    popup: false,
    messageID: "consult.default"
}

const shoppingReducer = (state = initialState, action) => {

    switch (action.type) {
        case PRELOADER:
            return {
                ...state,
                preloader: action.bool
            }
        case IS_DISABLED:
            return {
                ...state,
                isDisabled: action.bool
            }
        case CONSULT:
            return {
                ...state,
                isVisible: action.bool
            }
        case POPUP:
            return {
                ...state,
                popup: action.bool
            }
        case MESSAGE_ID:
            return {
                ...state,
                popup: action.bool,
                messageID: action.messageID
            }
        default:
            return state
    }
}

const messageAC = (bool, messageID) => ({ type: "MESSAGE_ID", bool, messageID })
const isDisabledAC = (bool) => ({ type: "IS_DISABLED", bool })
const preloaderAC = (bool) => ({ type: "PRELOADER", bool })

export const popupMessageAC = bool =>
    ({ type: "POPUP", bool })

export const sendOrderThunk = values => (dispatch, getState) => {

    let purchases = getState().cards.purchase
console.log(purchases)
    if (purchases.length === 0) {

        dispatch(messageAC(true, "order.empty"))
    } else {

        dispatch(preloaderAC(true))
        dispatch(isDisabledAC(true))

        const { first_name, last_name, patronymic, email, tel } = values
        let order = ''

        for (let i = 0; i < purchases.length; i++) {
            order += `<b>ID:</b><span style="color:darkred"> ${purchases[i].id}</span><br>
            <b>Наименование товара:</b><span style="color:darkblue"> <a href='https://react.langovets.com.ua/fullcard/${purchases[i].category}/${purchases[i].parent_id}/${purchases[i].id}'>${purchases[i].product_name}</a></span><br>
            <b>Количество:</b> ${purchases[i].quentity}<br>
            <b>Цена:</b><span style="color:darkgreen"> ${purchases[i].price}</span><br>`
        }

        const fileData = new FormData();

        fileData.append('first_name', first_name)
        fileData.append('last_name', last_name)
        fileData.append('patronymic', patronymic)
        fileData.append('email', email)
        fileData.append('tel', tel)
        fileData.append('order', order)

        api.sendOrder(fileData).then((response) => {

            if (response.data === 200) {

                dispatch(preloaderAC(false))
                dispatch(messageAC(true, "order.success"))
                dispatch(cleanPurchasesAC())
                dispatch(reset('order'))
                dispatch(isDisabledAC(false))

            } else if (response.data === 404) {

                dispatch(preloaderAC(false))
                dispatch(messageAC(true, "consult.error"))
                dispatch(isDisabledAC(false))
            }
        }).catch(() => {

            dispatch(preloaderAC(false))
            dispatch(messageAC(true, "consult.error"))
            dispatch(isDisabledAC(false))
        })
    }
}

export default shoppingReducer;