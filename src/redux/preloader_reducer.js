const LINE_PRELOADER = 'LINE_PRELOADER'

let initialState = {
    linePreloader: false
}

const linePreloaderReducer = (state = initialState, action) => {

    switch (action.type) {
        case LINE_PRELOADER:
            return {
                ...state,
                linePreloader: action.linePreloader
            }
        default: return state
    }
}

export const linePreloaderAC = linePreloader =>
    ({ type: 'LINE_PRELOADER', linePreloader })

export default linePreloaderReducer