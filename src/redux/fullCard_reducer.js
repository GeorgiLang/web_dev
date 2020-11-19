import { linePreloaderAC } from './preloader_reducer'
import { api } from '../Api/api'

const SET_FULL_CARD = 'SET_FULL_CARD'
const CURRENT_ID = 'CURRENT_ID'
const PARENT_ID = 'PARENT_ID'
const IS_PRELOADER = 'IS_PRELOADER'
const IS_LOADING_BASKET = 'IS_LOADING_BASKET'
const ADD_CARD = 'ADD_CARD'

const initialState = {
    full_card: [],
    isLoadingFullCard: false,
    current_id: '',
    isSpinerPreloader: false
}

const fullCardsReducer = (state = initialState, action) => {

    if (action.type === CURRENT_ID) {

        return {
            ...state,
            current_id: action.current_id
        }
    } else if (action.type === PARENT_ID) {

        return {
            ...state,
            parent_id: +action.id
        }
    } else if (action.type === IS_LOADING_BASKET) {

        return {
            ...state,
            isLoadingFullCard: action.isLoadingFullCard
        }
    } else if (action.type === SET_FULL_CARD) {

        return {
            ...state,
            full_card: action.purchase
        }
    } else if (action.type === ADD_CARD) {

        return {
            ...state,
            full_card: {
                ...state.full_card,
                id: action.purchase.id,
                full_media: action.purchase.full_media,
                product_name: action.purchase.product_name,
                price: action.purchase.price,
                old_price: action.purchase.old_price
            }
        }
    } else if (action.type === IS_PRELOADER) {

        return {
            ...state,
            isSpinerPreloader: action.isSpinerPreloader
        }
    }
    return state
}

export const currentIDAC = current_id =>
    ({ type: "CURRENT_ID", current_id })

export const parentIDAC = id =>
    ({ type: "PARENT_ID", id })

export const isLoadingBasketAC = isLoadingFullCard =>
    ({ type: "IS_LOADING_BASKET", isLoadingFullCard })

export const setFullCardAC = purchase =>
    ({ type: "SET_FULL_CARD", purchase })

export const addCardAC = purchase =>
    ({ type: "ADD_CARD", purchase })

export const spinerPreloaderAC = isSpinerPreloader =>
    ({ type: 'IS_PRELOADER', isSpinerPreloader })


export const getExtraCardThunkAC = (id, category) => dispatch => {

    dispatch(linePreloaderAC(true))
    
    api.getFullMedia(id, category).then((res) => {

        let purchase = {
            id: res.data.id,
            product_name: res.data.acf.product_name,
            full_media: res.data.acf.full_media,
            old_price: res.data.acf.old_price,
            price: res.data.acf.price,
        }

        dispatch(addCardAC(purchase))
        dispatch(linePreloaderAC(false))
    })
}

export default fullCardsReducer