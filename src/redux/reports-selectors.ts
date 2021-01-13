import {createSelector} from "reselect";
import {AppStoreType} from "./redux-store";
import {ReportType} from "./report-reducer";

export const getTotalReportCount = (state: AppStoreType) => {
    return Number(state.reportPage.totalReportCount);
}

export const getPageSize = (state: AppStoreType) => {
    return state.reportPage.pageSize;
}

export const getPageNumber = (state: AppStoreType) => {
    return state.reportPage.pageNumber;
}

export const getCurrentPage = (state: AppStoreType) => {
    return state.reportPage.currentPage;
}

export const getReports = (state: AppStoreType) => {
    return state.reportPage.reports;
}

export const getReport = (state: AppStoreType) => {
    return state.reportPage.report;
}

export const getIsFetching = (state: AppStoreType) => {
    return state.reportPage.isFetching;
}

export const getTotalPageCount = createSelector(getTotalReportCount, getPageSize, (totalReportCount: number, pageSize: number) => {
    return Math.ceil(Number(totalReportCount) / pageSize);
})