import {createSelector} from "reselect";

export const getPageSize = (state) => {
    return state.dailyReportPage.pageSize
}

export const getPageNumber = (state) => {
    return state.dailyReportPage.pageNumber
}

export const getTotalDailyReportCount = (state) => {
    return state.dailyReportPage.totalDailyReportCount
}

export const getCurrentPage = (state) => {
    return state.dailyReportPage.currentPage
}

export const getDailyReports = (state) => {
    return state.dailyReportPage.dailyReports
}

export const getIsFetching = (state) => {
    return state.dailyReportPage.isFetching
}

export const getTotalPageCount = createSelector(getTotalDailyReportCount, getPageSize, (totalDailyReportCount, pageSize) => {
    return Math.ceil(totalDailyReportCount / pageSize);
})