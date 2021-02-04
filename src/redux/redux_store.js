import {applyMiddleware, combineReducers, createStore } from 'redux'
import consultReducer from './consult_reducer'
import cardsReducer from './cards_reduсer'
import localeReducer from './locale_reducer'
import menuActiveReducer from './menu_reducer'
import fullCardsReducer from './fullCard_reducer'
import thunkMiddleware from 'redux-thunk'
import shoppingReducer from './shopping_reducer'
import linePreloaderReducer from './preloader_reducer'
import searchReducer from './search_reducer'
import storageReducer from './storage_reducer'
import userRoomReducer from './user_room_reducer'
import { reducer as formReducer } from 'redux-form'

let rootReducer = combineReducers({
    storage: storageReducer,
    consult: consultReducer,
    full_card: fullCardsReducer,
    shopping: shoppingReducer,
    preloader: linePreloaderReducer,
    search: searchReducer,
    cards: cardsReducer,
    locale: localeReducer,
    menuActive: menuActiveReducer,
    userRoom: userRoomReducer,
    form: formReducer
})

const store = createStore( rootReducer, applyMiddleware(thunkMiddleware) )

window.store = store

export default store
