
const BASE_STORAGE = 'BASE_STORAGE'

let initialState = {
    base_storage: []
}

const storageReducer = (state = initialState, action) => {

    if (action.type === BASE_STORAGE) {

        if (state.base_storage.length === 0
            || !state.base_storage.find(category => category.category === action.base_storage.category)) {

            return {
                ...state,
                base_storage: [
                    ...state.base_storage,
                    action.base_storage
                ]
            }
        }
    }
    return state;
}

export const baseStorageAC = base_storage => ({ type: 'BASE_STORAGE', base_storage })

export default storageReducer;