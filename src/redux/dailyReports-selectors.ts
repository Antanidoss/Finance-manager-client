import {createSelector} from "reselect";
import {AppStoreType} from "./redux-store";
import {DailyReportType} from "./dailyReport-reducer";

export const getPageSize = (state: AppStoreType) => {
    return state.dailyReportPage.pageSize
}

export const getPageNumber = (state: AppStoreType) => {
    return state.dailyReportPage.pageNumber
}

export const getTotalDailyReportCount = (state: AppStoreType) => {
    return state.dailyReportPage.totalDailyReportCount
}

export const getCurrentPage = (state: AppStoreType) => {
    return state.dailyReportPage.currentPage
}

export const getDailyReports = (state: AppStoreType) => {
    return state.dailyReportPage.dailyReports
}

export const getIsFetching = (state: AppStoreType) => {
    return state.dailyReportPage.isFetching
}

export const getTotalPageCount = createSelector(getTotalDailyReportCount, getPageSize,
    (totalDailyReportCount: number | null, pageSize: number) => {
    return Math.ceil(Number(totalDailyReportCount) / pageSize);
})