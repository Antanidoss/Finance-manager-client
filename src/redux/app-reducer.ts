import {authMeThunkCreator} from "./user-reducer";

type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

const INITIALIZED_SUCCESS  = "SET_INITIALIZED_SUCCESS"

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type InitializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): InitializedSuccessType => ({
    type: INITIALIZED_SUCCESS
})

export const initializeThunkCreator = () => (dispatch: any) => {
    let promise = authMeThunkCreator()(dispatch)
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess())
        })
}

export default appReducer;