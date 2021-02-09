import { api } from '../Api/api.js'
import { clearPurchasesThunk, setPurchaseToUserData } from './cards_functions'
import { reset } from 'redux-form'
import { popupMessageAC, isPopupAC, editButtonAC, getLocalStorageValue } from './user_room_reducer'

const IS_DISABLED = 'IS_DISABLED'
const PRELOADER = 'PRELOADER'

const initialState = {
    preloader: false,
    isDisabled: false,
    isVisible: false
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
                isDisabled: action.isDisabled
            }
        default:
            return state
    }
}

export const isDisabledAC = isDisabled => ({ type: "IS_DISABLED", isDisabled })
export const preloaderAC = bool => ({ type: "PRELOADER", bool })

const clearSentOrder = message_id => dispatch => {

    dispatch(preloaderAC(false))
    dispatch(isDisabledAC(false))
    dispatch(popupMessageAC(message_id))
    dispatch(isPopupAC(true))
}

export const submitOrderThunk = () => (dispatch, getState) => {

    let values = getState().userRoom.userData
    let purchases = getState().cards.purchase

    if (purchases.length > 0) { 

        dispatch(preloaderAC(true))
        dispatch(isDisabledAC(true))

        const { first_name, last_name, second_name, email, tel } = values
        
        let order = ''

        for (let i = 0; i < purchases.length; i++) {
            order += `<b>ID:</b><span style="color:darkred"> ${purchases[i].id}</span><br>
            <b>Наименование товара:</b><span style="color:darkblue"> <a href='https://react.langovets.com.ua/shop/${purchases[i].category}/fullcard/${purchases[i].parent_id}/${purchases[i].id}'>${purchases[i].product_name}</a></span><br>
            <b>Количество:</b> ${purchases[i].quentity}<br>
            <b>Цена:</b><span style="color:darkgreen"> ${purchases[i].price}</span><br>`
        }

        const fileData = new FormData()

        fileData.append('first_name', first_name)
        fileData.append('last_name', last_name)
        fileData.append('second_name', second_name)
        fileData.append('email', email)
        fileData.append('tel', tel)
        fileData.append('order', order)

        if (first_name && last_name && email && tel) {
        
            api.sendOrder(fileData).then(response => {

                if (response.data === 200) {

                    dispatch(clearPurchasesThunk())
                    dispatch(setPurchaseToUserData())
                    setPurchasedToUserData(purchases)
                    dispatch(reset('order'))
                    dispatch(clearSentOrder("order.success"))
                } else if (response.data === 404) {

                    dispatch(clearSentOrder("order.error"))
                }
                return response

            }).catch(error => {
                console.log(error.message)
                dispatch(clearSentOrder("order.error"))
            })
        } else {
            dispatch(editButtonAC(true))
            dispatch(clearSentOrder("login.personal"))
        }
    } else {
        dispatch(clearSentOrder("order.empty"))
    }
}

const setPurchasedToUserData = purchase => {

    let token = getLocalStorageValue('token')
    let user_ID = getLocalStorageValue('user_ID')

    let purchase_list = []

    for (let i = 0; i < purchase.length; i++) {

        let arr = {
            category: purchase[i].category,
            id: purchase[i].id,
            parent_id: purchase[i].parent_id
        }
        purchase_list.push(arr)
    }

    api.userData(user_ID, token).then(response => {

        let json_purchased = []

        if (response.data.purchased) {
            json_purchased = JSON.parse(response.data.purchased) 
        }

        for (let i = 0; i < json_purchased.length; i++) {

            purchase_list.push(json_purchased[i])
        }
        
        let purchased = JSON.stringify(purchase_list)

        api.userData(user_ID, token, {"purchased": `${purchased}`}, false).then((res) => {

        })
    })
}

export default shoppingReducer