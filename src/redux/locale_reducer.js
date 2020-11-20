const SET_LOCALE = 'SET_LOCALE'

const language = window.navigator.language.slice(0, 2)

let initialState = {

    locale: language !== 'uk' && language !== 'ru' && language !== 'en' ? 'en' : language
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

export const localeAC = (locale) =>

    ({ type: 'SET_LOCALE', locale })

export default localeReducer