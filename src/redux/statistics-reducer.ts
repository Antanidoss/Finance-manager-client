import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";
import { AppStoreType } from "./redux-store";
import {statisticsApi} from "../api/statisticsApi";

export type MonthlyStatisticsType = {
    year: number,
    monthNumber: number,
    amountSpentPerMonth: number,
    numberOfReportsPerMonth: number
}

export type InitialStateType = {
    monthlyStatistics: MonthlyStatisticsType | null
}

const SET_MONTHLY_STATISTICS_DATA = "SET_MONTHLY_STATISTICS_DATA";

let initialState: InitialStateType = {
    monthlyStatistics: null
}

export const statisticsReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case "SET_MONTHLY_STATISTICS_DATA":
            return {
                ...state,
                monthlyStatistics: action.monthlyStatistics
            }
        default:
            return state;
    }
}

type SetMonthlyStatisticsData = {
    type: typeof SET_MONTHLY_STATISTICS_DATA, monthlyStatistics: MonthlyStatisticsType
}
export const setMonthlyStatisticsData = (monthlyStatistics: MonthlyStatisticsType): SetMonthlyStatisticsData => ({
    type: SET_MONTHLY_STATISTICS_DATA, monthlyStatistics: monthlyStatistics
})

type ActionsTypes = SetMonthlyStatisticsData;

type ThunkType = ThunkAction<Promise<void>, AppStoreType, unknown, ActionsTypes>;
type GetStateType = () => AppStoreType;

export const requestMonthlyStatistics = (year: number, monthNumber: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: GetStateType) => {
        let response = await statisticsApi.getMonthlyStatistics(year, monthNumber);
        if(!response.result?.succeeded){

        }
        debugger
        dispatch(setMonthlyStatisticsData({
                year: response.data.year,
                monthNumber: response.data.monthNumber,
                amountSpentPerMonth: response.data.amountSpentPerMonth,
                numberOfReportsPerMonth: response.data.numberOfReportsPerMonth
            }));
    }
}