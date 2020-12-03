
const ADD_PURCHASE_TO_BASKET = 'ADD_PURCHASE_TO_BASKET'
const DELETE_ALL_CARDS = 'DELETE_ALL_CARDS'
const CLEAN_PURCHASE = 'CLEAN_PURCHASE'
const SET_ALL_CARDS = 'SET_ALL_CARDS'
const SET_CARDS = 'SET_CARDS'
const CURRENT_PAGE = 'CURRENT_PAGE'
const IS_DISABLED = 'IS_DISABLED'
const SET_BASKET_ICON_TO_CARD = 'SET_BASKET_ICON_TO_CARD'
const SET_QUENTITY = 'SET_QUENTITY'
const GET_TOTAL_COST = 'GET_TOTAL_COST'
const CURRENT_CATEGORY = 'CURRENT_CATEGORY'
const SET_CATEGORIES_LIST = 'SET_CATEGORIES_LIST'
const IS_LOADING_CARD = 'IS_LOADING_CARD'
const IS_LOADING = 'IS_LOADING'
const SCREEN_WIDTH = 'SCREEN_WIDTH'

const initialState = {
    screenWidth: 0,
    cards: [],
    all_cards: [],
    purchase: [],
    categories: [],
    category: '',
    current_page: 0,
    isDisabled: false,
    isLoading: false,
    isLoadingCard: false,
    total_price: 0,
    page: 0,
    total: 0
};

const cardsReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_PURCHASE_TO_BASKET:
            if (state.purchase.length === 0 || !state.purchase.find(purchase => purchase.id === action.purchase.id)) {
                return {
                    ...state,
                    purchase: [
                        ...state.purchase,
                        action.purchase
                    ]
                }
            }
        case SET_CATEGORIES_LIST:
            return {
                ...state,
                categories: action.categories
            }
        case SCREEN_WIDTH:
            return {
                ...state,
                screenWidth: action.screenWidth
            }
        case SET_ALL_CARDS:
            return {
                ...state,
                all_cards: action.payload
            }
        case SET_CARDS:
            return {
                ...state,
                cards: [
                    ...state.cards,
                    action.card
                ]
            }
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case IS_LOADING_CARD:
            return {
                ...state,
                isLoadingCard: action.isLoadingCard
            }
        case DELETE_ALL_CARDS:
            return {
                ...state,
                cards: [],
                all_cards: [],
                isLoading: false
            }
        case CLEAN_PURCHASE:
            return {
                ...state,
                purchase: action.id ? state.purchase.filter(card => card.id !== action.id) : []
            }
        case CURRENT_PAGE:
            return {
                ...state,
                current_page: action.page
            }
        case CURRENT_CATEGORY:
            return {
                ...state,
                category: action.category
            }
        case IS_DISABLED:
            return {
                ...state,
                isDisabled: action.isDisabled
            }
        case SET_BASKET_ICON_TO_CARD:
            return {
                ...state,
                cards: state.cards.reduce((cards_arr, card) => {

                    if (card.id === +action.id && !card.acf.basket) {

                        cards_arr.push({ ...card, ...card.acf.basket = true })
                    } else {

                        cards_arr.push(card)
                    }
                    return cards_arr
                }, [])
            }
        case SET_QUENTITY:
            return {
                ...state,
                purchase: state.purchase.map(card => card.id === action.id

                    ? {
                        ...card.quentity = action.action
                            ? card.quentity + 1
                            : (card.quentity <= 1 ? 2 : card.quentity) - 1, ...card
                    }
                    : card)
            }
        case GET_TOTAL_COST:
            return {
                ...state,
                total_price: state.purchase.reduce((total, card) => {

                    return total + +card.price * card.quentity
                }, 0)
            }
        default: return state
    }
}

export const screenWidthAC = screenWidth =>
    ({ type: "SCREEN_WIDTH", screenWidth })

export const addPurchaseToBasketAC = purchase =>
    ({ type: "ADD_PURCHASE_TO_BASKET", purchase })

export const setAllCardsAC = payload =>
    ({ type: "SET_ALL_CARDS", payload })

export const setCardsAC = card =>
    ({ type: "SET_CARDS", card })

export const isLoadingAC = isLoading =>
    ({ type: "IS_LOADING", isLoading })

export const isLoadingCardAC = isLoadingCard =>
    ({ type: "IS_LOADING_CARD", isLoadingCard })

export const setCardInBasketAC = id =>
    ({ type: "SET_BASKET_ICON_TO_CARD", id })

export const isDisabledAC = isDisabled =>
    ({ type: "IS_DISABLED", isDisabled })

export const deleteAllCardsAC = () =>
    ({ type: "DELETE_ALL_CARDS" })

export const cleanPurchasesAC = id =>
    ({ type: "CLEAN_PURCHASE", id })

export const getTotalCostAC = () =>
    ({ type: "GET_TOTAL_COST" })

export const setQuentityAC = (id, action) =>
    ({ type: "SET_QUENTITY", id, action })

export const currentPageAC = page =>
    ({ type: "CURRENT_PAGE", page })

export const currentCategoryAC = category =>
    ({ type: "CURRENT_CATEGORY", category })

export const setCategoriesList = categories =>
    ({ type: "SET_CATEGORIES_LIST", categories })

export default cardsReducer


