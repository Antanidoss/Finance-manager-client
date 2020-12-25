import {dailyReportsApi} from "../api/dailyReportsApi";

const initialState = {
    pageSize: 5,
    pageNumber: 1,
    totalDailyReportCount: 0,
    currentPage: 1,
    dailyReports:[],
    isFetching: false
};

const UPDATE_CURRENT_PAGE = "UPDATE_CURRENT_PAGE";
const SET_DAILY_REPORTS_DATA = "SET_DAILY_REPORTS_DATA";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

const dailyReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.newCurrentPage
            }
        case SET_DAILY_REPORTS_DATA:
            debugger;
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

export const updateCurrentPage = (newCurrentPage) => ({
  type: UPDATE_CURRENT_PAGE, newCurrentPage: newCurrentPage
});

export const setDailyReportsData = (data) => ({
    type: SET_DAILY_REPORTS_DATA, dailyReports: data.dailyReports, totalDailyReportCount: data.totalDailyReportCount
});

export const toggleIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING, isFetching: isFetching
})

export const requestDailyReportsThunkCreator = (currentPage, pageSize) => dispatch => {
    dispatch(toggleIsFetching(true));
    debugger
    let skip = (currentPage - 1) * pageSize;
    dailyReportsApi.getDailyReports(skip, pageSize)
        .then(res => {
            dispatch(setDailyReportsData(res))
            dispatch(toggleIsFetching(false))
        })
}

export default dailyReportReducer;