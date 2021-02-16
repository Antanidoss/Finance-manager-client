import {AppStoreType} from "./redux-store";

export const getInitialized = (state: AppStoreType) => {
    return state.app.initialized
}
export const getPopupsMessages = (state: AppStoreType) => {
    return state.app.popupsMessage;
}

export const getIsPopupsActive = (state: AppStoreType) => {
    return state.app.isPopupsActive;
}

export const getPrevPath = (state: AppStoreType) => {
    return state.app.prevPath;
}