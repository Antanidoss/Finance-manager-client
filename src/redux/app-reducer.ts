import {authMeThunkCreator} from "./user-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./redux-store";
import {Dispatch} from "redux";

type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

const INITIALIZED_SUCCESS  = "SET_INITIALIZED_SUCCESS"

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

type ActionsTypes = InitializedSuccessType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>;
type GetStateType = () => AppStoreType;

export const initializeThunkCreator = ():ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        let promise = await authMeThunkCreator()
        Promise.all([promise])
            .then(() => {
                dispatch(initializedSuccess())
            })
    }
}

export default appReducer;