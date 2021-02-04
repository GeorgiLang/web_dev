import { linePreloaderAC } from './preloader_reducer'
import { api } from '../Api/api'

const SET_FULL_CARD = 'SET_FULL_CARD'
const CURRENT_ID = 'CURRENT_ID'
const IS_LOADING_FULL_CARD = 'IS_LOADING_FULL_CARD'
const ADD_CARD = 'ADD_CARD'
const FULL_DESCRIPTION = 'FULL_DESCRIPTION'

const initialState = {
    full_card: {
        id: 0,
        product_name: '',
        price: 0,
        old_price: 0,
        parent_id: 0,
        category: '',
        category_name: '',
        current_model: '',
        variants_name: '',
        models: [],
        full_media: {
            img1: false,
            thumb: false
        },
        quentity: 1
    },
    isLoadingFullCard: false,
    full_description: {
        fld_name1: '',
        fld_value1: ''
    },
    current_id: ''
}

const fullCardsReducer = (state = initialState, action) => {

    switch (action.type) {
        case CURRENT_ID:
            return {
                ...state,
                current_id: action.current_id
            }
        case IS_LOADING_FULL_CARD:
            return {
                ...state,
                isLoadingFullCard: action.isLoadingFullCard
            }
        case SET_FULL_CARD:
            return {
                ...state,
                full_card: action.purchase
            }
        case FULL_DESCRIPTION:
            return {
                ...state,
                full_description: action.full_description 
            }
        case ADD_CARD:
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
        default: return state
    }

}

export const currentIDAC = current_id =>
    ({ type: "CURRENT_ID", current_id })

export const isLoadingFullCardAC = isLoadingFullCard =>
    ({ type: "IS_LOADING_FULL_CARD", isLoadingFullCard })

export const setFullCardAC = purchase =>
    ({ type: "SET_FULL_CARD", purchase })

export const setFullDescriptionAC = full_description =>
    ({ type: "FULL_DESCRIPTION", full_description })

export const addCardAC = purchase =>
    ({ type: "ADD_CARD", purchase })


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

export const getFullDescriptionThunk = (id, category) => dispatch => {

    api.getFullDescription(id, category).then((res) => {
        
        dispatch(setFullDescriptionAC(res.data.acf.full_description))
        dispatch(isLoadingFullCardAC(false))
    })
}

export default fullCardsReducer