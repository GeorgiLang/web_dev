import {applyMiddleware, combineReducers, createStore } from 'redux'
import consultReduser from './consult_reduser'
import cardsReducer from './cards_reduser'
import localeReducer from './locale_reducer'
import menuActiveReducer from './menu_reducer'
import isOrderReducer from './order_reduser'
import fullCardsReducer from './fullCard_reduser'
import thunkMiddleware from 'redux-thunk'
import shoppingReduser from './shopping_reduser'
import isPreloaderReducer from './preloader_reduser'
import searchReducer from './search_reduser'
import storageReduser from './storage_reduser'
import { reducer as formReducer } from 'redux-form'

let rootReducer = combineReducers({
    storage: storageReduser,
    consult: consultReduser,
    full_card: fullCardsReducer,
    shopping: shoppingReduser,
    preloader: isPreloaderReducer,
    search: searchReducer,
    form: formReducer,
    order: isOrderReducer,
    cards: cardsReducer,
    locale: localeReducer,
    menuActive: menuActiveReducer
});

const store = createStore( rootReducer, applyMiddleware(thunkMiddleware) );

window.store = store;

export default store;
