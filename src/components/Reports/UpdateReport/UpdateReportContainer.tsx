import React, {useEffect} from "react"
import UpdateReport from "./UpdateReport";
import {connect} from "react-redux";
import {
    requestReportByIdThunkCreator,
    updateReportThunkCreator
} from "../../../redux/report-reducer";
import {RouteComponentProps} from "react-router";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";
import {getReport} from "../../../redux/reports-selectors";
import {getIsAuthenticated} from "../../../redux/users-selectors";
import {AppStoreType} from "../../../redux/redux-store";
import { withRouter } from "react-router-dom";
import { ReportType } from "../../../types/types";
import {throws} from "assert";

const UpdateReportContainer = (props: PropsType) => {
    useEffect(() => {
        props.getReportById(Number(props.match.params.reportId));
    })

    return <UpdateReport {...props}></UpdateReport>
}

type MapDispatchToPropsType = {
    updateReport: typeof updateReportThunkCreator,
    getReportById: typeof requestReportByIdThunkCreator
}

type MapStateToPropsType = {
    report: ReportType,
    isAuthenticated: boolean
}

let mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    report: getReport(state),
    isAuthenticated: getIsAuthenticated(state)
})

type PathParamsType = {
    reportId: string
}

type OwnPropsType = RouteComponentProps<PathParamsType>;

export type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>
    (mapStateToProps, {updateReport: updateReportThunkCreator, getReportById: requestReportByIdThunkCreator}),
    withRouter,
    withAuthRedirect
)(UpdateReportContainer);
