import React from "react";
import {compose} from "redux";
import {addReportThunkCreator} from "../../../redux/report-reducer";
import AddReport from "./AddReport";
import {connect} from "react-redux";
import {AppStoreType} from "../../../redux/redux-store";
import {ReportType} from "../../../types/types";
import {getReport} from "../../../redux/reports-selectors";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {getIsAuthenticated} from "../../../redux/users-selectors";

export type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const AddReportContainer: React.FC<PropsType> = (props) => {
    return (
        <AddReport {...props}></AddReport>
    )
}

type MapStateToPropsType = {
    report: ReportType,
    isAuthenticated: boolean,
}

type MapDispatchToPropsType = {
    addReport: typeof addReportThunkCreator,
}

const mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    report: getReport(state),
    isAuthenticated: getIsAuthenticated(state),
})

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>(mapStateToProps,
        {addReport: addReportThunkCreator}),
    withAuthRedirect,
)(AddReportContainer)