const IS_ORDER = 'IS_ORDER';

let initialState = {
    isOrder: false
}

const isOrderReducer = (state = initialState, action) => {

    if (action.type === IS_ORDER) {

        return { 
            ...state, 
            isOrder: state.isOrder = true
        };
    }
    return state;
}

export const isOrderAC = isOrder => ({ type: 'IS_ORDER', isOrder});

export default isOrderReducer;