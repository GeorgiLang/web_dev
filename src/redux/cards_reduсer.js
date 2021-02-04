
const ADD_PURCHASE_TO_BASKET = 'ADD_PURCHASE_TO_BASKET'
const DELETE_ALL_CARDS = 'DELETE_ALL_CARDS'
const CLEAR_PURCHASE = 'CLEAR_PURCHASE'
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
const TOTAL_CARDS = 'TOTAL_CARDS'
const PER_PAGE = 'PER_PAGE'
const IS_DELETE = 'IS_DELETE'
const FILTER = 'FILTER'
const SET_PAGE_CARDS = 'SET_PAGE_CARDS'
const IS_ONLINE = 'IS_ONLINE'
const CATEGORY_NAME = 'CATEGORY_NAME'

const initialState = {
    cards: [],
    isOnline: true,
    purchase: [],
    filter: 'relevant',
    categories: [
        {
            acf: {
                category: "",
                category_name: ""
            },
            id: 0
        }
    ],
    page_to_back: false,
    category: '',
    category_name: '',
    current_page: 1,
    per_page: 2,
    total_cards: 0,
    isDisabled: false,
    isLoading: false,
    isDelete: true,
    isLoadingCard: false,
    total_price: 0,
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
            } else {
                return {
                    ...state
                }
            }
        case SET_CATEGORIES_LIST:
            return {
                ...state,
                categories: action.categories
            }
        case SET_CARDS:
            return {
                ...state,
                cards: [
                    ...state.cards,
                    action.card
                ]
            }
        case IS_ONLINE:
            return {
                ...state,
                isOnline: action.isOnline
            }
        case SET_PAGE_CARDS:
            return {
                ...state,
                cards: action.card
            }
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case IS_DELETE:
            return {
                ...state,
                isDelete: action.isDelete
            }
        case IS_LOADING_CARD:
            return {
                ...state,
                isLoadingCard: action.isLoadingCard
            }
        case DELETE_ALL_CARDS:
            return {
                ...state,
                cards: []
            }
        case CLEAR_PURCHASE:
            return {
                ...state,
                purchase: action.id ? state.purchase.filter(card => card.id !== action.id) : []
            }
        case CURRENT_PAGE:
            return {
                ...state,
                page_to_back: state.current_page > action.page  ? true : false,
                current_page: action.page
            }
        case PER_PAGE:
            return {
                ...state,
                per_page: action.per_page
            }
        case TOTAL_CARDS:
            return {
                ...state,
                total_cards: action.total_cards
            }
        case CURRENT_CATEGORY:
            return {
                ...state,
                category: action.category
            }
        case CATEGORY_NAME:
            return {
                ...state,
                category_name: action.category_name
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
        case FILTER:
            return {
                ...state,
                filter: action.filter
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

export const addPurchaseToBasketAC = purchase =>
    ({ type: "ADD_PURCHASE_TO_BASKET", purchase })

export const setCardsAC = card =>
    ({ type: "SET_CARDS", card })

export const isOnlineAC = isOnline =>
    ({ type: "IS_ONLINE", isOnline })

export const setPageCardsAC = card =>
    ({ type: "SET_PAGE_CARDS", card })

export const isDeleteAC = isDelete =>
    ({ type: "IS_DELETE", isDelete })//ability to delete, deleted always but is block when use pagination on Cards.js. Special, when use the browser pagination

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

export const clearPurchasesAC = id =>
    ({ type: "CLEAR_PURCHASE", id })

export const getTotalCostAC = () =>
    ({ type: "GET_TOTAL_COST" })

export const setQuentityAC = (id, action) =>
    ({ type: "SET_QUENTITY", id, action })

export const currentPageAC = (page, scroll_up) =>
    ({ type: "CURRENT_PAGE", page, scroll_up })

export const perPageAC = per_page =>
    ({ type: "PER_PAGE", per_page })

export const totalCardsAC = total_cards =>
    ({ type: "TOTAL_CARDS", total_cards })

export const currentCategoryAC = category =>
    ({ type: "CURRENT_CATEGORY", category })

export const categoryNameAC = category_name =>
    ({ type: "CATEGORY_NAME", category_name })

export const setCategoriesList = categories =>
    ({ type: "SET_CATEGORIES_LIST", categories })

export const setFilterAC = filter =>
    ({ type: "FILTER", filter })


export default cardsReducer


