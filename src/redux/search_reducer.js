import { api } from '../Api/api'
import { reset } from 'redux-form'
import {
    setAllCardsAC,
    currentCategoryAC,
    isLoadingAC,
    setCategoriesList,
    deleteAllCardsAC
} from './cards_reduсer'
import { nextCardThunk } from './cards_functions'
import { linePreloaderAC } from './preloader_reducer'
import { setCards } from './cards_functions'
import { isDisabledAC } from './shopping_reducer'

const IS_SEARCH = 'IS_SEARCH'
const IS_NOT_FOUND = 'IS_NOT_FOUND'
const MODEL = 'MODEL'

let initialState = {
    isSearch: false,
    isNotFound: false,
    model: ''
}

const searchReducer = (state = initialState, action) => {

    switch (action.type) {
        case IS_SEARCH:
            return {
                ...state,
                isSearch: action.isSearch
            }
        case MODEL:
            return {
                ...state,
                model: action.model
            }
        case IS_NOT_FOUND:
            return {
                ...state,
                isNotFound: action.isNotFound
            }
        default: return state
    }
}

export const searchAC = isSearch => ({ type: 'IS_SEARCH', isSearch })
export const searchModelAC = model => ({ type: 'MODEL', model })
export const isNotFoundAC = isNotFound => ({ type: 'IS_NOT_FOUND', isNotFound })

export const searchModelThunk = path => dispatch => {

    dispatch(searchAC(true))
    dispatch(searchModelAC(path))
    dispatch(searchThunk(path))
}

export const searchThunk = model => (dispatch, getState) => {

    let categories = getState().cards.categories

    dispatch(linePreloaderAC(true))
    dispatch(deleteAllCardsAC())
    dispatch(isDisabledAC(true))
    let searching = categories => {

        dispatch(currentCategoryAC("all_categories"))

        let qty = 0
        let all_search = []

        const searchProduct = (card, model) => {

            let search = new Promise((resolve, reject) => {

                api.searchProduct(card.acf.category, model).then((res) => {

                    qty = qty + res.data.length

                    if (res.data.length > 0) {

                        let _cards = setCards(res.data)
                        let category = card.acf.category
                        let total_cards = qty

                        dispatch(setAllCardsAC({ category, total_cards, _cards }))
                        dispatch(nextCardThunk(0, _cards, true))
                        dispatch(isLoadingAC(true))
                        dispatch(linePreloaderAC(false))
                        dispatch(searchModelAC(model))
                        dispatch(searchAC(true))
                    }
                    resolve()
                })
            })
            all_search.push(search)
        }

        categories.forEach(card => {

            searchProduct(card, model)
        })

        Promise.all(all_search).then(() => {

            if (qty !== 0) {
                dispatch(isNotFoundAC(false))
                dispatch(reset('search'))

            } else {
                dispatch(isNotFoundAC(true))
                dispatch(reset('search'))
                dispatch(linePreloaderAC(false))
            }
            dispatch(isDisabledAC(false))
        })
    }

    if (categories.length === 0) {

        api.getCategoriesList().then((res) => {

            dispatch(setCategoriesList(res.data))
            searching(res.data)
        })
    } else {

        searching(categories)
    }
}

export default searchReducer