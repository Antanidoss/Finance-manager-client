import {reportsApi} from "../api/reportsApi";

let initialState = {
    pageSize: 5,
    pageNumber: 1,
    totalReportCount: 0,
    currentPage: 1,
    newReportAmountSpent: 0,
    newReportDescriptionsOfExpenses: "",
    reports:[]
}

const SET_REPORT_DATA = "SET_REPORT_DATA";
const UPDATE_NEW_REPORT_AMOUNT_SPENT = "UPDATE_NEW_REPORT_AMOUNT_SPENT"
const UPDATE_NEW_REPORT_DESCRIPTIONS_OF_EXPENSES = "UPDATE_NEW_REPORT_DESCRIPTIONS_OF_EXPENSES"
const REMOVE_REPORT = "REMOVE_REPORT";
const UPDATE_CURRENT_PAGE = "UPDATE_CURRENT_PAGE";

const reportReducer = (state = initialState, action) =>{
    switch (action.type) {
        case UPDATE_NEW_REPORT_AMOUNT_SPENT:
            return {
                ...state,
                newReportAmountSpent: action.newReportAmountSpent
            };
        case UPDATE_NEW_REPORT_DESCRIPTIONS_OF_EXPENSES:
            return {
                ...state,
                newReportDescriptionsOfExpenses: action.newReportDescriptionsOfExpenses
            }
        case SET_REPORT_DATA:
            return {
                ...state,
                reports: action.reports,
                totalReportCount: action.totalReportCount
            };
        case REMOVE_REPORT:
            break;
        default:
            return state;
    }
}

export const updateCurrentPage = (newCurrentPage) => (
    {type: UPDATE_CURRENT_PAGE, newCurrentPage: newCurrentPage})


export const setReportData = (data) => (
    {type: SET_REPORT_DATA, reports: data.reports, totalReportCount: data.totalReportCount})

export const updateNewReportAmountSpent = (newReportAmountSpent) => (
    {type: UPDATE_NEW_REPORT_AMOUNT_SPENT, newReportAmountSpent: newReportAmountSpent});

export const updateNewReportDescriptionsOfExpenses = (newReportDescriptionsOfExpenses) => (
    {type: UPDATE_NEW_REPORT_DESCRIPTIONS_OF_EXPENSES, newReportDescriptionsOfExpenses: newReportDescriptionsOfExpenses});

export const getReportsThunkCreator = (currentPage, pageSize, dailyReportId) => {
    debugger
    return (dispatch) => {
        let skip = (currentPage - 1) * pageSize;
        reportsApi.getReports(skip, pageSize, dailyReportId)
            .then(res => {
                dispatch(setReportData(res))
            })
    }
}

export default reportReducer;