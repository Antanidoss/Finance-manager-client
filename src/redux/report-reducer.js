import {reportsApi} from "../api/reportsApi";
import {stopSubmit} from "redux-form";

let initialState = {
    pageSize: 5,
    pageNumber: 1,
    totalReportCount: 0,
    currentPage: 1,
    reports:[],
    report: {}
}

const SET_REPORTS_DATA = "SET_REPORTS_DATA";
const SET_REPORT_DATA = "SET_REPORT_DATA";
const REMOVE_REPORT = "REMOVE_REPORT";
const UPDATE_CURRENT_PAGE = "UPDATE_CURRENT_PAGE";
const UPDATE_REPORT = "UPDATE_REPORT";

const reportReducer = (state = initialState, action) =>{
    switch (action.type) {
        case SET_REPORTS_DATA:
            return {
                ...state,
                reports: action.reports,
                totalReportCount: action.totalReportCount
            };
        case SET_REPORT_DATA:
            return {
                ...state,
                report: action.report
            }
        case REMOVE_REPORT:
            let reports = state.reports.filter((r) => r.id !== action.reportId);
            return {
                ...state,
                reports: reports
            }
        default:
            return state;
    }
}

export const updateCurrentPage = (newCurrentPage) => ({
    type: UPDATE_CURRENT_PAGE, newCurrentPage: newCurrentPage})

export const setReportsData = (data) => ({
    type: SET_REPORTS_DATA, reports: data.reports, totalReportCount: data.totalReportCount})

export const removeReport = (reportId) => ({
    type: REMOVE_REPORT, reportId: reportId})

export const updateReport = () => (
    {type: UPDATE_REPORT})

export const setReportData = (data) => ({
    type: SET_REPORT_DATA, report: {id: data.id, amountSpent: data.amountSpent, descriptionsOfExpenses: data.descriptionsOfExpenses,
            timeOfCreate: data.timeOfCreate}
    })

export const getReportsThunkCreator = (currentPage, pageSize, dailyReportId) => dispatch => {
    let skip = (currentPage - 1) * pageSize;
    reportsApi.getReports(skip, pageSize, dailyReportId)
        .then(res => {
            dispatch(setReportsData(res))
        })
}

export const removeReportThunkCreator = (reportId) => dispatch => {
    reportsApi.removeReport(reportId)
        .then(res => {
            if(res.succeeded) {
                dispatch(removeReport(reportId))
            }
        })
}

export const updateReportThunkCreator = (amountSpent, descriptionsOfExpenses, reportId) => dispatch => {
    reportsApi.updateReport(amountSpent, descriptionsOfExpenses, reportId)
        .then(res => {
            if(!res.succeeded) {
                let action = stopSubmit("updateReport", {_error: res.errors});
                dispatch(action);
            }
        })
}

export const getReportByIdThunkCreator = (reportId) => dispatch => {
    reportsApi.getReportById(reportId)
        .then(res => {
            dispatch(setReportData({id: res.id, amountSpent: res.amountSpent,
                descriptionsOfExpenses: res.descriptionsOfExpenses, timeOfCreate: res.timeOfCreate}))
        })
}

export const addReportThunkCreator = (amountSpent, descriptionsOfExpenses) => dispatch => {
    reportsApi.addReport(amountSpent, descriptionsOfExpenses)
        .then( res => {
            if(!res.succeeded) {
                let action = stopSubmit("addReport", {_error: res.errors});
                dispatch(action);
            }
        })
}

export default reportReducer;