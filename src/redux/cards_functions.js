import { api } from '../Api/api'
import { linePreloaderAC } from './preloader_reducer'
import { isNotFoundAC } from './search_reducer'
import {
    currentPageAC,
    deleteAllCardsAC,
    currentCategoryAC,
    setCategoriesList,
    isDisabledAC,
    isLoadingCardAC,
    setCardsAC,
    setPageCardsAC,
    isLoadingAC,
    addPurchaseToBasketAC,
    setCardInBasketAC,
    setQuentityAC,
    getTotalCostAC,
    clearPurchasesAC,
    totalCardsAC,
    isDeleteAC,
    setFilterAC,
    isOnlineAC
} from './cards_reduсer'
import { setFullCardAC, isLoadingFullCardAC } from './fullCard_reducer'
import { baseStorageAC } from './storage_reducer'
import { getLocalStorageValue } from './user_room_reducer'


export const sortingCards = (data, per_page, filter = "relevant") => {

    data.sort((a, b) => {

        if (filter === 'priceUp') {

            return Number(b.acf.price) - Number(a.acf.price)
        } else if (filter === 'priceDown') {

            return Number(a.acf.price) - Number(b.acf.price)
        } else if (filter === 'A-Z') {

            if (a.acf.product_name.split(' ')[1].toLowerCase() > b.acf.product_name.split(' ')[1].toLowerCase()) {
                return -1
            } else {
                return 1
            }
        } else if (filter === 'Z-A') {

            if (a.acf.product_name.split(' ')[1].toLowerCase() > b.acf.product_name.split(' ')[1].toLowerCase()) {
                return 1
            } else {
                return -1
            }
        }else if (filter === 'relevant') {

            return b.id - a.id
        }
        return 0
    })

    let cards = []

    data.forEach(card => {

        if (card.acf.in_stock) {

            cards.unshift(card)
        } else {
            
            cards.push(card)
        }
    })

    let _cards = cards.reduce((p, card) => {

        if (p[p.length - 1].length === per_page) {

            p.push([])
        }

        p[p.length - 1].push(card)

        return p
    }, [[]])

    return _cards
}

export const setCardsThunk = (category, page = 1, filter = "relevant") => (dispatch, getState) => {

    let data_length = 1
    let total_cards = 0
    dispatch(isLoadingAC(true))
    dispatch(currentCategoryAC(category))
    dispatch(setFilterAC(filter))
    dispatch(isOnlineAC(true))

    let cards = getState().storage.base_storage
    let temporary_storage = getState().storage.temporary_storage
    let per_page = getState().cards.per_page

    if (temporary_storage.length !== 0) { //record from the storage
 
                let sorted_cards = sortingCards(temporary_storage, per_page, filter)
                temporary_storage.filter = filter
                dispatch(isLoadingAC(false))
                dispatch(nextCardThunk(page, sorted_cards))
                dispatch(totalCardsAC(temporary_storage.length))

    } else if (cards.length !== 0 && cards.find(card => card.category === category)) { //record from the storage

        cards.forEach(cat => {

            if (cat.category === category) {
 
                let sorted_cards = sortingCards(cat.cards, per_page, filter)
                cat.filter = filter
                dispatch(isLoadingAC(false))
                dispatch(nextCardThunk(page, sorted_cards))
                dispatch(totalCardsAC(cat.total_cards))
            }
        })
    } else {
        // for sceleton---------------------
        for (let i = 0; i < per_page; i++) {

            dispatch(setCardsAC({
                id: `${category}${i}`,
                acf: {
                    in_stock: false
                }
            }))
        }
        //-----------------------------------
        api.getNumberOfCard(category).then((res) => {

            total_cards = +res.headers['x-wp-total']

            const getAllCards = _page => {

                api.getCardData(category, _page).then((res) => {

                    data_length = +res.data.length

                    let cards = sortingCards(res.data, per_page, filter)

                    dispatch(deleteAllCardsThunk())
                    dispatch(baseStorageAC({ category, total_cards, cards: res.data, filter: filter}))
                    dispatch(totalCardsAC(total_cards))
                    dispatch(isLoadingAC(false))
                    dispatch(nextCardThunk(page, cards))
                })
            }

            if (total_cards >= data_length) {

                for (let page = 1; page <= Math.ceil(total_cards / 100); page++) {

                    getAllCards(page)
                }
            }
        }).catch(() => {
            dispatch(isOnlineAC(false))
        })
    }
}

export const deleteAllCardsThunk = () => (dispatch, getState) => {

    let isDelete = getState().cards.isDelete

    if (isDelete) {
        dispatch(deleteAllCardsAC())
    }
}

export const getCategoriesListThunk = () => (dispatch, getState) => {

    dispatch(isNotFoundAC(false))
    dispatch(linePreloaderAC(true))
    dispatch(deleteAllCardsThunk())
    dispatch(isOnlineAC(true))

    let categories = getState().cards.categories

    if (categories.length > 1) {

        dispatch(linePreloaderAC(false))
        return
    } else {

        api.getCategoriesList().then((res) => {

            dispatch(setCategoriesList(res.data))
            dispatch(linePreloaderAC(false))

        }).catch(() => {
            dispatch(isOnlineAC(false))
        })
    }

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

export const nextCardThunk = (page = 1, cards) => (dispatch, getState) => {

    let isDelete = getState().cards.isDelete
    dispatch(currentPageAC(page))
    dispatch(isDisabledAC(false))

    let arr = []

    if (isDelete) {

        cards[page - 1].forEach(card => {

            arr.push({ ...card, child_id: existId(card.acf.models.color1.models_vars) })
        })
        dispatch(setPageCardsAC(arr))
    } else {

        cards[page - 1].forEach(card => {

            dispatch(setCardsAC({ ...card, child_id: existId(card.acf.models.color1.models_vars) }))
        })
        
    }
    dispatch(isDeleteAC(true))
    if (cards.length < 2) {

        dispatch(isDisabledAC(true))
    }
}

export const setPageThunk = (page, arrow, top_pagination) => (dispatch, getState) => {
    
    let current_page = getState().cards.current_page
    dispatch(currentPageAC(page))

    if (page === current_page) {

        return
    } else if (arrow === "next") {

        if (top_pagination) {
            return
        } else {
            dispatch(isDeleteAC(false))
        }

    } else if (arrow === "pages" || arrow === "prev") {

        if (page < current_page) {

            return
        } else if (page > current_page) {

            if (top_pagination) {
                return
            } else {
                dispatch(isDeleteAC(false))
            }
        }
    }
}

export const setCardInBasketThunk = (parent_id, category, full, id) => dispatch => {

    let current_category = category
    let ID = id;

    dispatch(isNotFoundAC(false))
    dispatch(isOnlineAC(true))
    if (full) {

        dispatch(isLoadingFullCardAC(true))
    } else {

        dispatch(setCardInBasketAC(parent_id))
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
                category_name: response.data.acf.category_name,
                parent_id: +parent_id,
                category: current_category,
                current_model: response.data.acf.models.color1.color,
                variants_name: response.data.acf.variants_name,
                models: all_models,
                full_media: res.data.acf.full_media,
                old_price: res.data.acf.old_price,
                price: res.data.acf.price,
                quentity: 1
            }

            if (full) {
                dispatch(setFullCardAC(purchase))
                dispatch(isLoadingFullCardAC(false))
            } else {
                dispatch(addPurchaseToBasketAC(purchase))
                dispatch(isLoadingCardAC(false))
            }
            dispatch(updatePurchaseInStorage())
            dispatch(setPurchaseToUserData())
        }).catch(() => {
            dispatch(isOnlineAC(false))
        })
    })
}

export const clearPurchasesThunk = id => dispatch => {

    dispatch(clearPurchasesAC(id))
    dispatch(updatePurchaseInStorage())
}

export const updatePurchaseInStorage = () => (dispatch, getState) => {

    sessionStorage.getItem('purchase') && sessionStorage.removeItem('purchase')
    let purchase = getState().cards.purchase

    let json_purchase = JSON.stringify(purchase)
    sessionStorage.setItem('purchase', json_purchase)
}

export const setPurchaseToUserData = () => (dispatch, getState) => {

    let isValidToken = getState().userRoom.isValidToken
    if (isValidToken) {

        let purchase = getState().cards.purchase

        let token = getLocalStorageValue('token')
        let user_ID = getLocalStorageValue('user_ID')

        if (purchase.length > 0) {

            let purchase_list = []

            for (let i = 0; i < purchase.length; i++) {

                let arr = {
                    category: purchase[i].category,
                    id: purchase[i].id,
                    parent_id: purchase[i].parent_id
                }
                purchase_list.push(arr)
            }

            let purchases = JSON.stringify(purchase_list)

            api.userData(user_ID, token, { "purchases": `${purchases}` }, false).then((res) => {

            })
        } else {
            api.userData(user_ID, token, { "purchases": "" }, false).then((res) => {

            })
        }
    }
}

export const addPurchaseToBasketThunk = purchase => (dispatch, getState) => {

    dispatch(addPurchaseToBasketAC(purchase))
    dispatch(updatePurchaseInStorage())
}

export const setQuentityThunk = (id, action) => dispatch => {

    dispatch(setQuentityAC(id, action))
    dispatch(getTotalCostAC())
}

