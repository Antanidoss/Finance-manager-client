import {reportsApi} from "../api/reportsApi";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./redux-store";
import {Dispatch} from "redux";
import {ReportType} from "../types/types";
import { toggleIsPopupsActive, ToggleIsPopupsActiveType } from "./app-reducer";

export type InitialStateType = {
    pageSize: number
    pageNumber: number
    totalReportCount: number | null
    currentPage: number
    reports: Array<ReportType>,
    report: ReportType,
    isFetching: boolean,
}

let initialState : InitialStateType = {
    pageSize: 5,
    pageNumber: 1,
    totalReportCount: 0,
    currentPage: 1,
    reports: [] as Array<ReportType>,
    report: {} as ReportType,
    isFetching: false,
}

const SET_REPORTS_DATA = "SET_REPORTS_DATA";
const SET_REPORT_DATA = "SET_REPORT_DATA";
const REMOVE_REPORT = "REMOVE_REPORT";
const UPDATE_CURRENT_PAGE = "UPDATE_CURRENT_PAGE";
const UPDATE_REPORT = "UPDATE_REPORT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

const reportReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
export const updateCurrentPage = (newCurrentPage: number): UpdateCurrentPageType => ({
    type: UPDATE_CURRENT_PAGE, newCurrentPage: newCurrentPage
})

type SetReportsDataType = {
    type: typeof SET_REPORTS_DATA, reports: Array<ReportType>, totalReportCount: number
}
export const setReportsData = (reports: Array<ReportType>, totalReportCount: number): SetReportsDataType => ({
    type: SET_REPORTS_DATA, reports: reports, totalReportCount: totalReportCount
})

type RemoveReportType = {
    type: typeof REMOVE_REPORT, reportId: number
}
export const removeReport = (reportId: number): RemoveReportType => ({
    type: REMOVE_REPORT, reportId: reportId
})

type UpdateReportType = {
    type: typeof UPDATE_REPORT
}
export const updateReport = (): UpdateReportType => ({
    type: UPDATE_REPORT
})

type SetReportDataType = {
    type: typeof SET_REPORT_DATA, report: ReportType
}
export const setReportData = (data: any): SetReportDataType => ({
    type: SET_REPORT_DATA, report: {id: data.id, amountSpent: data.amountSpent, descriptionsOfExpenses: data.descriptionsOfExpenses,
    timeOfCreate: data.timeOfCreate}
})

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING, isFetching: boolean
}
export const toggleIsFetching = (isFetching : boolean): ToggleIsFetchingType => ({
    type: TOGGLE_IS_FETCHING, isFetching: isFetching
})

type ActionsTypes = UpdateCurrentPageType | SetReportsDataType | RemoveReportType | UpdateReportType | SetReportDataType
    | ToggleIsFetchingType | ToggleIsPopupsActiveType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>;
type GetStateType = () => AppStoreType;

export const requestReportsThunkCreator = (currentPage: number, pageSize: number, dailyReportId: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        dispatch(toggleIsFetching(true));
        let skip = (currentPage - 1) * pageSize;
        let response = await reportsApi.getReports(skip, pageSize, dailyReportId);
        dispatch(toggleIsFetching(false));
        dispatch(setReportsData(response.reports, response.totalReportCount))
    }
}

export const removeReportThunkCreator = (reportId: number): ThunkType => {
        return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
            let response = await reportsApi.removeReport(reportId);
            if (response.succeeded) {
                dispatch(removeReport(reportId))
                dispatch(toggleIsPopupsActive(true, "Отчет удалён"))
            }
    }
}

export const updateReportThunkCreator = (amountSpent: number, descriptionsOfExpenses: string, reportId: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        let response = await reportsApi.updateReport(amountSpent, descriptionsOfExpenses, reportId);
        if (!response.succeeded) {
            let action = stopSubmit("updateReport", {_error: response.errors});
            dispatch(action);
        }
        else{
            dispatch(toggleIsPopupsActive(true, "Отчет обновлён"))
        }
    }
}

export const requestReportByIdThunkCreator = (reportId: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        let response = await reportsApi.getReportById(reportId);
        dispatch(setReportData({
            id: response.data.id, amountSpent: response.data.amountSpent,
            descriptionsOfExpenses: response.data.descriptionsOfExpenses, timeOfCreate: response.data.timeOfCreate
        }))
    }
}

export const addReportThunkCreator = (amountSpent: number, descriptionsOfExpenses: string): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        let response = await reportsApi.addReport(amountSpent, descriptionsOfExpenses);
        if (!response.succeeded) {
            let action = stopSubmit("addReport", {_error: response.errors});
            dispatch(action);
        }
        else{
            dispatch(toggleIsPopupsActive(true, "Отчет создан"))
        }
    }
}

export default reportReducer;
