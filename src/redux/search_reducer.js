import { api } from '../Api/api'
import { isPopupAC, popupMessageAC } from './user_room_reducer'
import { nextCardThunk, sortingCards } from './cards_functions'
import { totalCardsAC, deleteAllCardsAC, isLoadingAC, setCategoriesList, currentCategoryAC, currentPageAC } from './cards_reduсer'
import { reset } from 'redux-form'
import { linePreloaderAC } from './preloader_reducer'
import { searchStorageAC, temporaryStorageAC } from './storage_reducer'


const IS_SEARCH = 'IS_SEARCH'
const IS_NOT_FOUND = 'IS_NOT_FOUND'
const LOOK_FOR = 'LOOK_FOR'
const IS_DISABLED_SEARCH = 'IS_DISABLED_SEARCH'
const IS_VISIBLE = 'IS_VISIBLE'

let initialState = {
    isSearch: false,
    isDisabled: false,
    isNotFound: false,
    isVisible: false,
    look_for: ''
}

const searchReducer = (state = initialState, action) => {

    switch (action.type) {
        case IS_SEARCH:
            return {
                ...state,
                isSearch: action.isSearch
            }
        case IS_VISIBLE:
            return {
                ...state,
                isVisible: action.isVisible
            }
        case IS_DISABLED_SEARCH:
            return {
                ...state,
                isDisabled: action.isDisabled
            }
        case LOOK_FOR:
            return {
                ...state,
                look_for: action.look_for
            }
        case IS_NOT_FOUND:
            return {
                ...state,
                isNotFound: action.isNotFound
            }
        default: return state
    }
}

export const isVisibleAC = isVisible => ({ type: 'IS_VISIBLE', isVisible })
export const isSearchAC = isSearch => ({ type: 'IS_SEARCH', isSearch })
export const lookForAC = look_for => ({ type: 'LOOK_FOR', look_for })
export const isNotFoundAC = isNotFound => ({ type: 'IS_NOT_FOUND', isNotFound })
export const isDisabledSearchAC = isDisabled => ({ type: "IS_DISABLED_SEARCH", isDisabled })




export const searching = (categories, value, all) => {

    const all_cards = []
    const all_search = []

    const searchProduct = (category, value, category_name) => {

        return new Promise((resolve, reject) => {

            api.searchProduct(category, value, all).then((res) => {

                resolve([res, category, category_name])
            })
        })
    }
    if (all === ',') {
    
        categories.forEach(card => {

            all_search.push(searchProduct(card.acf.category, value, card.acf.category_name))
        })
    } else {

        all_search.push(searchProduct(categories, value))
    }
    
    return new Promise((resolve, reject) => {

        Promise.all(all_search).then((value) => {

            value.forEach((val) => {

                if (val[0].data.length > 0) {

                    all_cards.push(val)
                }
            })
            resolve(all_cards)
        })
    })
}

export const searchThunk = value => (dispatch, getState) => {

    let categories = getState().cards.categories
    let page = getState().cards.current_page
    dispatch(isDisabledSearchAC(true))
    dispatch(deleteAllCardsAC())
    dispatch(isLoadingAC(true))
    dispatch(currentCategoryAC(value))
    dispatch(currentPageAC(page))
    dispatch(linePreloaderAC(true))
    dispatch(isSearchAC(false))

    let search = (_categories, _search_name) => {

        searching(_categories, _search_name, ',').then((response) => {

            dispatch(deleteAllCardsAC())
            dispatch(isDisabledSearchAC(false))
            dispatch(linePreloaderAC(false))

            if (response.length === 0) {
                dispatch(popupMessageAC("search.default"))
                dispatch(isNotFoundAC(true))
                dispatch(isPopupAC(true))
                dispatch(isLoadingAC(false))
                dispatch(isSearchAC(false))
            } else {
                let storage = []
                response.forEach(card => {
                    storage.push({

                        cards: card[0].data.length,
                        category: card[1],
                        category_name: card[2]
                    })
                })
                dispatch(searchStorageAC(storage))
                dispatch(reset('search'))
                dispatch(isLoadingAC(false))
                dispatch(isSearchAC(true))
            }
            
        }).catch(() => {
            
            dispatch(popupMessageAC("search.default"))
            dispatch(isNotFoundAC(true))
            dispatch(isPopupAC(true))
            dispatch(isLoadingAC(false))
            dispatch(isSearchAC(false))
            dispatch(isSearchAC(false))
        })
    }
    if (categories.length < 2) {

        api.getCategoriesList().then((res) => {

            dispatch(setCategoriesList(res.data))
            search(res.data, value)
        })
    } else {

        search(categories, value)
    }
}

export const searchExactThunk = (category, value) => (dispatch, getState) => {

    let per_page = getState().cards.per_page
    dispatch(isLoadingAC(true))
    dispatch(currentCategoryAC(value))
    dispatch(isDisabledSearchAC(true))
    dispatch(linePreloaderAC(true))

    api.searchProduct(category, value).then((res) => {
        
        dispatch(deleteAllCardsAC())
        dispatch(linePreloaderAC(false))
        dispatch(totalCardsAC(res.data.length))
        dispatch(isDisabledSearchAC(false))
        dispatch(isSearchAC(false))
        dispatch(isLoadingAC(false))
        dispatch(reset('search'))
        dispatch(temporaryStorageAC(res.data))
        let cards = sortingCards(res.data, per_page)
        dispatch(nextCardThunk(1, cards))
        dispatch(lookForAC(value))
    })
}

export default searchReducer
