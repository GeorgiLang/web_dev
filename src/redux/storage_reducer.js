
const BASE_STORAGE = 'BASE_STORAGE'
const SEARCHED_STORAGE = 'SEARCHED_STORAGE'
const TEMPORARY_STORAGE = 'TEMPORARY_STORAGE'

let initialState = {
    base_storage: [],
    searched_storage: [],
    temporary_storage: []
}

const storageReducer = (state = initialState, action) => {

    switch (action.type) {
        case BASE_STORAGE :
            if (state.base_storage.length === 0
                || !state.base_storage.find(category => category.category === action.base_storage.category)) {
    
                return {
                    ...state,
                    base_storage: [
                        ...state.base_storage,
                        action.base_storage
                    ]
                }
            } else {
                return state
            }
        case SEARCHED_STORAGE :
            return {
                ...state,
                searched_storage: action.searched_storage
            }
        case TEMPORARY_STORAGE :
            return {
                ...state,
                temporary_storage: action.temporary_storage
            }
        default : return state       
    }
}

export const baseStorageAC = base_storage => ({ type: 'BASE_STORAGE', base_storage })
export const searchStorageAC = searched_storage => ({ type: 'SEARCHED_STORAGE', searched_storage })
export const temporaryStorageAC = temporary_storage => ({ type: 'TEMPORARY_STORAGE', temporary_storage })

export default storageReducer