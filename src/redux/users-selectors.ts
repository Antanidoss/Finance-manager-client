import {AppStoreType} from "./redux-store";

export const getUserId = (state: AppStoreType) => {
    return state.userPage.userId;
}

export const getUserName = (state: AppStoreType) => {
    return state.userPage.userName;
}

export const getIsAuthenticated = (state: AppStoreType) => {
    return state.userPage.isAuthenticated;
}

export const getIsFetching = (state: AppStoreType) => {
    return state.userPage.isFetching;
}
