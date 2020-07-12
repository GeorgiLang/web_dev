


const BASE_STORAGE = 'BASE_STORAGE'
// const SEARCH_STORAGE = 'SEARCH_STORAGE'

let initialState = {
    base_storage: []
    // ,search_storage: []
}

const storageReduser = (state = initialState, action) => {

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
    // else if (action.type === SEARCH_STORAGE) {

    //     if (state.search_storage.length === 0
    //         || !state.search_storage.find(category => category.category === action.search_storage.category)) {

    //         return {
    //             ...state,
    //             search_storage: [
    //                 ...state.search_storage,
    //                 action.search_storage
    //             ]
    //         }
    //     }
    // }
    return state;
}

export const baseStorageAC = base_storage => ({ type: 'BASE_STORAGE', base_storage })
// export const searchStorageAC = search_storage => ({ type: 'SEARCH_STORAGE', search_storage })


export default storageReduser;