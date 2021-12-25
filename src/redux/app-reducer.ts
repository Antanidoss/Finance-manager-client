import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./redux-store";
import {getCurrentUserThunkCreator} from "./user-reducer";

type InitialStateType = {
    initialized: boolean
    isPopupsActive: boolean,
    popupsMessage: string,
}

let initialState: InitialStateType = {
    initialized: false,
    isPopupsActive: false,
    popupsMessage: "",
}

const INITIALIZED_SUCCESS  = "SET_INITIALIZED_SUCCESS"
const TOGGLE_IS_POPUPS_ACTIVE = "TOGGLE_IS_POPUPS_ACTIVE";

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        case TOGGLE_IS_POPUPS_ACTIVE:
            return {
                ...state,
                isPopupsActive: action.isPopupsActive,
                popupsMessage: action.newMessage
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

export type ToggleIsPopupsActiveType = {
    type: typeof TOGGLE_IS_POPUPS_ACTIVE, isPopupsActive: boolean, newMessage: string
}
export const toggleIsPopupsActive = (isPopupsActive: boolean, message: string = ""): ToggleIsPopupsActiveType => ({
    type: TOGGLE_IS_POPUPS_ACTIVE, isPopupsActive: isPopupsActive, newMessage: message
})

type ActionsTypes = InitializedSuccessType | ToggleIsPopupsActiveType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>;

export const initializeThunkCreator = (): ThunkType => {
    return async (dispatch, getState) => {
        var promise = dispatch(getCurrentUserThunkCreator());

        Promise.all([promise]).then(() => {
            dispatch(initializedSuccess())
        })
    }
}

export default appReducer;