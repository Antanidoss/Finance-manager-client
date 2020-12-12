import {reportsApi} from "../api/reportsApi";

let initialState = {
    pageSize: 5,
    pageNumber: 1,
    totalReportCount: 0,
    currentPage: 1,
    reportAmountSpentUpdateForm: 0,
    reportDescriptionsOfExpensesUpdateForm: "",
    reports:[],
    report: {}
}

const SET_REPORTS_DATA = "SET_REPORTS_DATA";
const SET_REPORT_DATA = "SET_REPORT_DATA";
const CHANGE_AMOUNT_SPENT_UPDATE_FORM = "CHANGE_AMOUNT_SPENT_UPDATE_FORM"
const CHANGE_DESCRIPTIONS_OF_EXPENSES_UPDATE_FORM = "CHANGE_DESCRIPTIONS_OF_EXPENSES_UPDATE_FORM"
const REMOVE_REPORT = "REMOVE_REPORT";
const UPDATE_CURRENT_PAGE = "UPDATE_CURRENT_PAGE";
const UPDATE_REPORT = "UPDATE_REPORT";

const reportReducer = (state = initialState, action) =>{
    switch (action.type) {
        case CHANGE_AMOUNT_SPENT_UPDATE_FORM:
            return {
                ...state,
                reportAmountSpentUpdateForm: action.newReportAmountSpent
            };
        case CHANGE_DESCRIPTIONS_OF_EXPENSES_UPDATE_FORM:
            return {
                ...state,
                reportDescriptionsOfExpensesUpdateForm: action.newReportDescriptionsOfExpenses
            }
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
        case UPDATE_REPORT:
            return {
                ...state,
                reportAmountSpentUpdateForm: "",
                reportDescriptionsOfExpensesUpdateForm: ""
            }
        default:
            return state;
    }
}

export const updateCurrentPage = (newCurrentPage) => (
    {type: UPDATE_CURRENT_PAGE, newCurrentPage: newCurrentPage})

export const setReportsData = (data) => (
    {type: SET_REPORTS_DATA, reports: data.reports, totalReportCount: data.totalReportCount})

export const changeAmountSpentUpdateForm = (newReportAmountSpent) => (
    {type: CHANGE_AMOUNT_SPENT_UPDATE_FORM, newReportAmountSpent: newReportAmountSpent});

export const changeDescriptionsOfExpensesUpdateForm = (newReportDescriptionsOfExpenses) => (
    {type: CHANGE_DESCRIPTIONS_OF_EXPENSES_UPDATE_FORM, newReportDescriptionsOfExpenses: newReportDescriptionsOfExpenses});

export const removeReport = (reportId) => (
    {type: REMOVE_REPORT, reportId: reportId})

export const updateReport = () => (
    {type: UPDATE_REPORT})

export const setReportData = (data) => (
    {type: SET_REPORT_DATA, report: {id: data.id, amountSpent: data.amountSpent, descriptionsOfExpenses: data.descriptionsOfExpenses,
            timeOfCreate: data.timeOfCreate}})

export const getReportsThunkCreator = (currentPage, pageSize, dailyReportId) => {
    return (dispatch) => {
        let skip = (currentPage - 1) * pageSize;
        reportsApi.getReports(skip, pageSize, dailyReportId)
            .then(res => {
                dispatch(setReportsData(res))
            })
    }
}

export const removeReportThunkCreator = (reportId) => {
    return (dispatch) => {
        reportsApi.removeReport(reportId)
            .then(res => {
                if(res.succeeded === true)
                dispatch(removeReport(reportId))
            })
    }
}

export const updateReportThunkCreator = (amountSpent, descriptionsOfExpenses, reportId) => {
    return (dispatch) => {
        reportsApi.updateReport(amountSpent, descriptionsOfExpenses, reportId)
            .then(res => {
                if(res.succeeded === true)
                dispatch(updateReport())
            })
    }
}

export const getReportByIdThunkCreator = (reportId) => {
    return (dispatch) => {
        reportsApi.getReportById(reportId)
            .then(res => {
                dispatch(setReportData({id: res.id, amountSpent: res.amountSpent,
                    descriptionsOfExpenses: res.descriptionsOfExpenses, timeOfCreate: res.timeOfCreate}))
            })
    }
}

export default reportReducer;