import {dailyReportsApi} from "../api/dailyReportsApi";

export type DailyReportType = {
    id: number | null,
    timeOfCreate: string | null,
}

export type InitialStateType = {
    pageSize: number,
    pageNumber: number,
    totalDailyReportCount: number | null,
    currentPage: number,
    dailyReports: Array<DailyReportType> | null,
    isFetching: boolean
}

const initialState : InitialStateType =  {
    pageSize: 5,
    pageNumber: 1,
    totalDailyReportCount: 0,
    currentPage: 1,
    dailyReports: null,
    isFetching: false
};

const UPDATE_CURRENT_PAGE: string = "UPDATE_CURRENT_PAGE";
const SET_DAILY_REPORTS_DATA: string = "SET_DAILY_REPORTS_DATA";
const TOGGLE_IS_FETCHING: string = "TOGGLE_IS_FETCHING";

const dailyReportReducer = (state = initialState, action: any) : InitialStateType => {
    switch (action.type) {
        case UPDATE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.newCurrentPage
            }
        case SET_DAILY_REPORTS_DATA:
            return  {
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

type UpdateCurrentPageType = {
    type: typeof UPDATE_CURRENT_PAGE, newCurrentPage: number
}
export const updateCurrentPage = (newCurrentPage: number): UpdateCurrentPageType => ({
    type: UPDATE_CURRENT_PAGE, newCurrentPage: newCurrentPage
})

type SetDailyReportsDataType = {
    type: typeof SET_DAILY_REPORTS_DATA, dailyReports: Array<DailyReportType>, totalDailyReportCount: number
}
export const setDailyReportsData = (data: any): SetDailyReportsDataType => ({
    type: SET_DAILY_REPORTS_DATA, dailyReports: data.dailyReports, totalDailyReportCount: data.totalDailyReportCount
});

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING, isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({
    type: TOGGLE_IS_FETCHING, isFetching: isFetching
})

export const requestDailyReportsThunkCreator = (currentPage: number, pageSize: number) => (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    let skip = (currentPage - 1) * pageSize;
    dailyReportsApi.getDailyReports(skip, pageSize)
        .then((res : any) => {
            dispatch(setDailyReportsData(res))
            dispatch(toggleIsFetching(false))
        })
}

export default dailyReportReducer;