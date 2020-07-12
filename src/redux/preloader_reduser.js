const LINE_PRELOADER = 'LINE_PRELOADER'

let initialState = {
    linePreloader: false
}

const linePreloaderReducer = (state = initialState, action) => {

    if (action.type === LINE_PRELOADER) {
        
        return {
            ...state,
            linePreloader: action.linePreloader
        }
    } 
    return state;
}

export const linePreloaderAC = linePreloader => 
({ type: 'LINE_PRELOADER', linePreloader});

export default linePreloaderReducer;