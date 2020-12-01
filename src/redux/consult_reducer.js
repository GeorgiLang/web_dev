import { api } from '../Api/api.js'
import { reset } from 'redux-form'

const IS_DISABLED = 'IS_DISABLED'
const PRELOADER = 'PRELOADER'
const CONSULT = 'CONSULT'
const POPUP = 'POPUP'
const MESSAGE_ID = 'MESSAGE_ID'

const initialState = {
    preloader: false,
    isDisabled: false,
    isVisible: false,
    popup: false,
    messageID: "consult.default"
}

const consultReducer = (state = initialState, action) => {

    switch (action.type) {
        case PRELOADER:
            return {
                ...state,
                preloader: action.bool
            }
        case IS_DISABLED:
            return {
                ...state,
                isDisabled: action.bool
            }
        case CONSULT:
            return {
                ...state,
                isVisible: action.bool
            }
        case POPUP:
            return {
                ...state,
                popup: action.bool
            }
        case MESSAGE_ID:
            return {
                ...state,
                popup: action.bool,
                messageID: action.messageID
            }
        default: return state
    }
}

const messageAC = (bool, messageID) => ({ type: "MESSAGE_ID", bool, messageID })
const isDisabledAC = (bool) => ({ type: "IS_DISABLED", bool })
export const preloaderAC = (bool) => ({ type: "PRELOADER", bool })
export const consultAC = (bool) => ({ type: 'CONSULT', bool });
export const popupAC = (bool) => ({ type: "POPUP", bool })

export const sendMessageThunk = (values) => (dispatch) => {

    const { name, tel, text, myfile } = values

    dispatch(preloaderAC(true))
    dispatch(isDisabledAC(true))

    const fileData = new FormData();

    fileData.append('name', name);
    fileData.append('tel', tel);

    if (myfile) {
        for (var i = 0; i < myfile.length; i++) {
            let files = myfile[i];
            fileData.append('myfile[' + i + ']', files)
        }
    }

    if (text) {
        fileData.append('text', text);
    }

    api.sendMessage(fileData).then((response) => {

        if (response.data === 200) {

            dispatch(preloaderAC(false))
            dispatch(messageAC(true, "consult.success"))
        } else if (response.data === 404) {

            dispatch(preloaderAC(false))
            dispatch(messageAC(true, "consult.error"))
        }
    }).catch((error) => {

        dispatch(preloaderAC(false))
        dispatch(messageAC(true, "consult.error"))
    }).then(() => {

        setTimeout(() => {

            dispatch(reset('sendMessage'))
            dispatch(isDisabledAC(false))
        }, 5000)

    })
}

export default consultReducer