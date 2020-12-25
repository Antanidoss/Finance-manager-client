export const getTotalReportCount = (state) => {
    return state.reportPage.totalReportCount;
}

export const getPageSize = (state) => {
    return state.reportPage.pageSize;
}

export const getPageNumber = (state) => {
    return state.reportPage.pageNumber;
}

export const getCurrentPage = (state) => {
    return state.reportPage.currentPage;
}

export const getReports = (state) => {
    return state.reportPage.reports;
}

export const getReport = (state) => {
    return state.reportPage.report;
}

export const getIsFetching = (state) => {
    return state.reportPage.isFetching;
}
