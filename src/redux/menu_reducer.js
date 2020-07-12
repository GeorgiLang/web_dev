const MENU_ACTIVE = 'MENU_ACTIVE';

let initialState = {
    active: false
}

const menuActiveReducer = (state = initialState, action) => {

    if (action.type === MENU_ACTIVE) {

        return { 
            ...state, 
            active: state.active ? false : true
        };
    }
    return state;
}

export const menuActiveAC = (active) => ({ type: 'MENU_ACTIVE', active});

export default menuActiveReducer;