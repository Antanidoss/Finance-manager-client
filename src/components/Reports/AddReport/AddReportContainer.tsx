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
import Popups from "../../common/Popups/Popups";
import { toggleIsPopupsActive } from "../../../redux/app-reducer";
import {getIsPopupsActive, getPopupsMessages } from "../../../redux/app-selectors";

type MapStateTpPropsType = {
    report: ReportType,
    isAuthenticated: boolean,

    popupsMessages: string,
    isActivePopups: boolean
}

type MapDispatchToPropsType = {
    addReport: typeof addReportThunkCreator,
    toggleIsPopupsActive: typeof toggleIsPopupsActive
}

export type PropsType = MapStateTpPropsType & MapDispatchToPropsType;

const AddReportContainer: React.FC<PropsType> = (props) => {

    if (props.isActivePopups) {
        return (
            <>
                <Popups message={props.popupsMessages} toggleIsPopupsActive={props.toggleIsPopupsActive}/>
                <AddReport {...props}></AddReport>
            </>
        )
    }
    return (
        <AddReport {...props}></AddReport>
    )
}

const mapStateToProps = (state: AppStoreType): MapStateTpPropsType => ({
    report: getReport(state),
    isAuthenticated: getIsAuthenticated(state),
    popupsMessages: getPopupsMessages(state),
    isActivePopups: getIsPopupsActive(state)
})

export default compose<React.ComponentType>(
    connect<MapStateTpPropsType, MapDispatchToPropsType, null, AppStoreType>(mapStateToProps,
        {addReport: addReportThunkCreator, toggleIsPopupsActive: toggleIsPopupsActive}),
    withAuthRedirect,
)(AddReportContainer)