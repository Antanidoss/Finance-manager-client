import React from "react";
import {AppStoreType} from "../../redux/redux-store";
import { getMonthlyStatistics } from "../../redux/statistics-selectors";
import {
    MonthlyStatisticsType,
    requestMonthlyStatistics,
} from "../../redux/statistics-reducer";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import Statistics from "./Statistics";
import {getIsAuthenticated} from "../../redux/users-selectors";

type MapStateToPropsType = {
    monthlyStatistics: MonthlyStatisticsType | null,
    isAuthenticated: boolean,
}

type MapDispatchToPropsType = {
    requestMonthlyStatistics: typeof requestMonthlyStatistics
}

export type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const StatisticsContainer: React.FC<PropsType> = (props) => {
    return <Statistics {...props}></Statistics>
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    monthlyStatistics: getMonthlyStatistics(state),
    isAuthenticated: getIsAuthenticated(state),
})

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>(mapStateToProps,
        {requestMonthlyStatistics: requestMonthlyStatistics}),
    withAuthRedirect
)(StatisticsContainer);