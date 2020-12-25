export const getUserId = (state) => {
    return state.userPage.userId;
}

export const getUserName= (state) => {
    return state.userPage.userName;
}

export const getIsAuthenticated = (state) => {
    return state.userPage.isAuthenticated;
}

export const getIsFetching = (state) => {
    return state.userPage.isFetching;
}
