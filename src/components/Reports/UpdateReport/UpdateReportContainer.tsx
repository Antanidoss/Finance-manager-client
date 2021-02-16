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
import Popups from "../../common/Popups/Popups";
import { toggleIsPopupsActive } from "../../../redux/app-reducer";
import {getIsPopupsActive, getPopupsMessages} from "../../../redux/app-selectors";

const UpdateReportContainer = (props: PropsType) => {
    useEffect(() => {
        props.getReportById(Number(props.match.params.reportId));
    }, [])

    if (props.isActivePopups) {
        return (
            <>
                <Popups message={props.popupsMessages} toggleIsPopupsActive={props.toggleIsPopupsActive}/>
                <UpdateReport {...props}></UpdateReport>
            </>
        )
    }
    return <UpdateReport {...props}></UpdateReport>
}

type MapDispatchToPropsType = {
    updateReport: typeof updateReportThunkCreator,
    getReportById: typeof requestReportByIdThunkCreator,
    toggleIsPopupsActive: typeof toggleIsPopupsActive
}

type MapStateToPropsType = {
    report: ReportType,
    isAuthenticated: boolean
    popupsMessages: string,
    isActivePopups: boolean
}

let mapStateToProps = (state: AppStoreType): MapStateToPropsType => ({
    report: getReport(state),
    isAuthenticated: getIsAuthenticated(state),
    popupsMessages: getPopupsMessages(state),
    isActivePopups: getIsPopupsActive(state)
})

type PathParamsType = {
    reportId: string
}

type OwnPropsType = RouteComponentProps<PathParamsType>;

export type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStoreType>
    (mapStateToProps, {updateReport: updateReportThunkCreator, getReportById: requestReportByIdThunkCreator,
        toggleIsPopupsActive: toggleIsPopupsActive}),
    withRouter,
    withAuthRedirect
)(UpdateReportContainer);
