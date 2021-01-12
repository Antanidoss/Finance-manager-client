import {reportsApi} from "../api/reportsApi";
import {stopSubmit} from "redux-form";

export type InitialStateType = {
    pageSize: number | null
    pageNumber: number | null
    totalReportCount: number | null
    currentPage: number | null
    reports: Array<ReportType> | null,
    report: ReportType | null,
    isFetching: boolean
}

export type ReportType = {
    id: number | null,
    amountSpent: number | null,
    descriptionsOfExpenses: string | null
    timeOfCreate: string | null

}

let initialState : InitialStateType = {
    pageSize: 5,
    pageNumber: 1,
    totalReportCount: 0,
    currentPage: 1,
    reports: null,
    report: null,
    isFetching: false
}

const SET_REPORTS_DATA:string = "SET_REPORTS_DATA";
const SET_REPORT_DATA:string = "SET_REPORT_DATA";
const REMOVE_REPORT:string = "REMOVE_REPORT";
const UPDATE_CURRENT_PAGE:string = "UPDATE_CURRENT_PAGE";
const UPDATE_REPORT:string = "UPDATE_REPORT";
const TOGGLE_IS_FETCHING:string = "TOGGLE_IS_FETCHING";

const reportReducer = (state = initialState, action : any) : InitialStateType => {
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
            return {
                ...state,
                reports: state.reports?.filter((r) => r.id !== action.reportId) as Array<ReportType>
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}

type UpdateCurrentPageType = {
    type: typeof UPDATE_CURRENT_PAGE, newCurrentPage: number
}
export const updateCurrentPage = (newCurrentPage: number) : UpdateCurrentPageType => ({
    type: UPDATE_CURRENT_PAGE, newCurrentPage: newCurrentPage
})

type SetReportsDataType = {
    type: typeof SET_REPORTS_DATA, reports: Array<ReportType>, totalReportCount: number
}
export const setReportsData = (data: any) : SetReportsDataType => ({
    type: SET_REPORTS_DATA, reports: data.reports, totalReportCount: data.totalReportCount
})

type RemoveReportType = {
    type: typeof REMOVE_REPORT, reportId: number
}
export const removeReport = (reportId: number) : RemoveReportType => ({
    type: REMOVE_REPORT, reportId: reportId
})

type UpdateReportType = {
    type: typeof UPDATE_REPORT
}
export const updateReport = () : UpdateReportType => ({
    type: UPDATE_REPORT
})

type SetReportDataType = {
    type: typeof SET_REPORT_DATA, report: ReportType
}
export const setReportData = (data: any) : SetReportDataType => ({
    type: SET_REPORT_DATA, report: {id: data.id, amountSpent: data.amountSpent, descriptionsOfExpenses: data.descriptionsOfExpenses,
    timeOfCreate: data.timeOfCreate}
})

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING, isFetching: boolean
}
export const toggleIsFetching = (isFetching : boolean) : ToggleIsFetchingType => ({
    type: TOGGLE_IS_FETCHING, isFetching: isFetching
})

export const requestReportsThunkCreator = (currentPage : number, pageSize : number, dailyReportId : number) => (dispatch : any) => {
    dispatch(toggleIsFetching(true));
    let skip = (currentPage - 1) * pageSize;
    reportsApi.getReports(skip, pageSize, dailyReportId)
        .then((res: any) => {
            dispatch(toggleIsFetching(false));
            dispatch(setReportsData(res))
        })
}

export const removeReportThunkCreator = (reportId : number) => (dispatch : any) => {
    reportsApi.removeReport(reportId)
        .then((res: any) => {
            if(res.succeeded) {
                dispatch(removeReport(reportId))
            }
        })
}

export const updateReportThunkCreator = (amountSpent : number, descriptionsOfExpenses : string, reportId : number) => (dispatch: any) => {
    reportsApi.updateReport(amountSpent, descriptionsOfExpenses, reportId)
        .then((res : any) => {
            if(!res.succeeded) {
                let action = stopSubmit("updateReport", {_error: res.errors});
                dispatch(action);
            }
        })
}

export const requestReportByIdThunkCreator = (reportId : number) => (dispatch: any) => {
    reportsApi.getReportById(reportId)
        .then((res : any) => {
            dispatch(setReportData({id: res.id, amountSpent: res.amountSpent,
                descriptionsOfExpenses: res.descriptionsOfExpenses, timeOfCreate: res.timeOfCreate}))
        })
}

export const addReportThunkCreator = (amountSpent: number, descriptionsOfExpenses : string) => (dispatch : any) => {
    reportsApi.addReport(amountSpent, descriptionsOfExpenses)
        .then( (res : any) => {
            if(!res.succeeded) {
                let action = stopSubmit("addReport", {_error: res.errors});
                dispatch(action);
            }
        })
}

export default reportReducer;
