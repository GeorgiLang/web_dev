const MENU_ACTIVE = 'MENU_ACTIVE'

let initialState = {
    active: false
}

const menuActiveReducer = (state = initialState, action) => {

    switch (action.type) {
        case MENU_ACTIVE:
            return {
                ...state,
                active: state.active ? false : true
            }
        default: return state
    }
}

export const menuActiveAC = (active) => ({ type: 'MENU_ACTIVE', active })

export default menuActiveReducer