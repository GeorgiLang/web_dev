import locale from '../common/locale'

const SET_LOCALE = 'SET_LOCALE'

let initialState = {

    locale: locale !== 'uk' && locale !== 'ru' && locale !== 'en' ? 'en' : locale
}

const localeReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_LOCALE:
            
            return {
                ...state,
                locale: action.locale
            }
        default: return state
    }
}

export const localeAC = locale =>

    ({ type: 'SET_LOCALE', locale })

export default localeReducer