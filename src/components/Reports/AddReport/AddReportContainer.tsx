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

type MapStateTpPropsType = {
    report: ReportType
}

type MapDispatchToPropsType = {
    addReport: typeof addReportThunkCreator
}

export type PropsType = MapStateTpPropsType & MapDispatchToPropsType;

const AddReportContainer: React.FC<PropsType> = (props) => {
    return (
        <AddReport {...props}></AddReport>
    )
}

const mapStateToProps = (state: AppStoreType) => ({
    report: getReport(state),
    isAuthenticated: getIsAuthenticated(state)
})

export default compose<React.ComponentType>(
    connect<MapStateTpPropsType, MapDispatchToPropsType, null, AppStoreType>(mapStateToProps, {addReport: addReportThunkCreator}),
    withAuthRedirect,
)(AddReportContainer)