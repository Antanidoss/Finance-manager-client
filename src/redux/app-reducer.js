import {authMeThunkCreator} from "./user-reducer";

let initialState = {
    initialized: false
}

const INITIALIZED_SUCCESS  = "SET_INITIALIZED_SUCCESS"

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const initializedSuccess = () => ({
    type: INITIALIZED_SUCCESS
})

export const initializeThunkCreator = () => dispatch => {
    let promise = authMeThunkCreator()(dispatch)
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}

export default appReducer;