import {AppStoreType} from "./redux-store";

export const getInitialized = (state: AppStoreType) => {
    return state.app.initialized
}