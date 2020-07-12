import { api } from '../Api/api'
import { linePreloaderAC } from './preloader_reduser'
import { isNotFoundAC } from './search_reduser'
import {
    currentPageAC,
    deleteAllCardsAC,
    currentCategoryAC,
    setAllCardsAC,
    setCategoriesList,
    isDisabledAC,
    isLoadingCardAC,
    setCardsAC,
    isLoadingAC,
    addPurchaseToBasketAC,
    setCardInBasketAC,
    setQuentityAC,
    getTotalCostAC
} from './cards_reduser'
import { setFullCardAC, isLoadingBasketAC } from './fullCard_reduser'
import { baseStorageAC } from './storage_reduser'

let per_page = 3
let total_cards = 0
let _cards = []

export const setCards = data => {

    let cards = []

    data.forEach(card => {

        if (card.acf.in_stock === "Есть в наличии") {
            cards.unshift(card)
        } else {
            cards.push(card)
        }
    })
    _cards = cards.reduce((p, card) => {

        if (p[p.length - 1].length === per_page) {

            p.push([])
        }

        p[p.length - 1].push(card)

        return p;
    }, [[]])

    return _cards
}

export const setCardsThunk = category => (dispatch, getState) => {

    let data_length = 1
    dispatch(linePreloaderAC(true))
    dispatch(deleteAllCardsAC())
    dispatch(isLoadingAC(false))
    dispatch(currentCategoryAC(category))
    dispatch(currentPageAC(0))


    let cards = getState().storage.base_storage

    if (cards.length !== 0 && cards.find(card => card.category === category)) { //record to storage

        cards.forEach(cat => {

            if (cat.category === category) {

                total_cards = cat.total_cards
                dispatch(setAllCardsAC(cat._cards))
                dispatch(linePreloaderAC(false))
                dispatch(isLoadingAC(true))
                dispatch(nextCardThunk(0, cat._cards))
            }
        })
    } else {

        api.getNumberOfCard(category).then((res) => {

            total_cards = +res.headers['x-wp-total']

        }).then(() => {

            let once = true

            const getAllCards = (page) => {

                api.getCardData(category, page).then((res) => {

                    data_length = +res.data.length

                    setCards(res.data)

                    dispatch(baseStorageAC({ category, total_cards, _cards }))
                    dispatch(setAllCardsAC({ category, total_cards, _cards }))
                    dispatch(linePreloaderAC(false))
                    dispatch(isLoadingAC(true))
                    if (once) {
                        dispatch(nextCardThunk(0, _cards))
                        once = false
                    }
                    _cards = []
                })
            }

            if (total_cards >= data_length) {

                for (let page = 1; page <= Math.ceil(total_cards / 100); page++) {

                    getAllCards(page)
                }
            }
        })
    }
}

export const getCategoriesListThunk = () => (dispatch, getState) => {

    dispatch(isNotFoundAC(false))
    dispatch(linePreloaderAC(true))

    if (getState().cards.categories.length > 0) {

        dispatch(linePreloaderAC(false))
        return
    }
    api.getCategoriesList().then((res) => {

        dispatch(setCategoriesList(res.data))
        dispatch(linePreloaderAC(false))
    })
}

const existId = (card) => {

    let exist_ids = []

    for (let key in card) {
        if (card[key]) {
            if (card[key].id) {
                exist_ids.push(+card[key].id)
            }
        }
    }
    return exist_ids[0]
}

export const nextCardThunk = (page, cards) => dispatch => {

    dispatch(isDisabledAC(false))

    cards[page].forEach(card => {

        dispatch(setCardsAC({ ...card, child_id: existId(card.acf.models.color1.models_vars) }))
    })

    if (cards.length < 2 && cards[0].length <= per_page) {

        dispatch(isDisabledAC(true))
    }
    dispatch(currentPageAC(page + 1))
}

export const nextCardsThunk = () => (dispatch, getState) => {

    let page = getState().cards.current_page
    let category = getState().cards.category
    let _cards = []
    category !== 'all_categories'
    ? _cards = getState().storage.base_storage
    : _cards = [getState().cards.all_cards]
    
    console.log(_cards)
    dispatch(isDisabledAC(false))

    if (_cards.length !== 0) {

        _cards.forEach(cat => {

            if (page < Math.ceil(cat.total_cards / per_page)) {

                dispatch(nextCardThunk(page, cat._cards))

                if (Math.ceil(cat.total_cards / per_page) - page === 1) {
                    dispatch(isDisabledAC(true))
                }
            }
        })
    }
}

export const setCardInBasketThunk = (parent_id, category, full, id) => dispatch => {

    let current_category = category
    let ID = id;
    dispatch(isNotFoundAC(false))
    if (full) {
        dispatch(isLoadingBasketAC(false))
        dispatch(linePreloaderAC(true))
    } else {
        dispatch(isLoadingCardAC(true))
    }

    api.getModelsIdCard(parent_id, category).then(response => {

        let all_models = []

        for (let key in response.data.acf.models) {
            if (response.data.acf.models[key].color) {
                all_models.push(response.data.acf.models[key])
            }
        }

        api.getFullMedia(ID ? ID : existId(response.data.acf.models.color1.models_vars), category).then((res) => {

            let purchase = {
                id: res.data.id,
                product_name: res.data.acf.product_name,
                parent_id: +parent_id,
                category: current_category,
                current_model: response.data.acf.models.color1.color,
                variants_name: response.data.acf.variants_name,
                models: all_models,
                full_media: res.data.acf.full_media,
                full_description: response.data.acf.full_description,
                old_price: res.data.acf.old_price,
                price: res.data.acf.price,
                quentity: 1
            }

            if (full) {
                dispatch(setFullCardAC(purchase))
                dispatch(linePreloaderAC(false))
                dispatch(isLoadingBasketAC(true))
            } else {
                dispatch(addPurchaseToBasketAC(purchase))
                dispatch(isLoadingCardAC(false))
            }
        })

    })
    if (!full) {
        dispatch(setCardInBasketAC(parent_id))

    }
}

export const setQuentityThunk = (id, action) => dispatch => {

    dispatch(setQuentityAC(id, action))
    dispatch(getTotalCostAC())
}

