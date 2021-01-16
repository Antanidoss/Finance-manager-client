import {dailyReportsApi} from "../api/dailyReportsApi";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStoreType} from "./redux-store";

export type DailyReportType = {
    id: number | null,
    timeOfCreate: string | null,
}

export type InitialStateType = {
    pageSize: number,
    pageNumber: number,
    totalDailyReportCount: number,
    currentPage: number,
    dailyReports: Array<DailyReportType> | null,
    isFetching: boolean
}

const initialState: InitialStateType = {
    pageSize: 5,
    pageNumber: 1,
    totalDailyReportCount: 0,
    currentPage: 1,
    dailyReports: null,
    isFetching: false
};

const UPDATE_CURRENT_PAGE = "UPDATE_CURRENT_PAGE";
const SET_DAILY_REPORTS_DATA = "SET_DAILY_REPORTS_DATA";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

const dailyReportReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case UPDATE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.newCurrentPage
            }
        case SET_DAILY_REPORTS_DATA:
            return {
                ...state,
                dailyReports: action.dailyReports,
                totalDailyReportCount: action.totalDailyReportCount
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

type ActionsTypes = UpdateCurrentPageType | SetDailyReportsDataType | ToggleIsFetchingType;

type UpdateCurrentPageType = {
    type: typeof UPDATE_CURRENT_PAGE
    newCurrentPage: number
}
export const updateCurrentPage = (newCurrentPage: number): UpdateCurrentPageType => ({
    type: UPDATE_CURRENT_PAGE, newCurrentPage: newCurrentPage
})

type SetDailyReportsDataType = {
    type: typeof SET_DAILY_REPORTS_DATA, dailyReports: Array<DailyReportType> | null, totalDailyReportCount: number
}
export const setDailyReportsData = (dailyReports: Array<DailyReportType> | null, totalDailyReportCount: number): SetDailyReportsDataType => ({
    type: SET_DAILY_REPORTS_DATA, dailyReports: dailyReports, totalDailyReportCount: totalDailyReportCount
});

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING, isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({
    type: TOGGLE_IS_FETCHING, isFetching: isFetching
})

type GetStateType = () => AppStoreType;
type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>;

export const requestDailyReportsThunkCreator = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        dispatch(toggleIsFetching(true));
        let skip = (currentPage - 1) * pageSize;
        let data = await dailyReportsApi.getDailyReports(skip, pageSize)

        dispatch(setDailyReportsData(data.dailyReports, data.totalDailyReportCount))
        dispatch(toggleIsFetching(false))
    }
}

export default dailyReportReducer;