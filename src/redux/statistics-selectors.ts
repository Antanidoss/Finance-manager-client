import {AppStoreType} from "./redux-store";

export const getMonthlyStatistics = (state: AppStoreType) => {
    return state.statisticsPage.monthlyStatistics
}