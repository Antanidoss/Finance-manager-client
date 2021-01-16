import React from "react"
import AddReport from "./AddReport";
import {connect} from "react-redux";
import {
    addReportThunkCreator
} from "../../../redux/report-reducer";
import {AppStoreType} from "../../../redux/redux-store";

const AddReportContainer = (props: PropsType) => {
    return <AddReport {...props}></AddReport>
}

type MapDispatchToPropsType = {
    addReport: typeof addReportThunkCreator,
}

type PathParamsType = {}

type PropsType = MapDispatchToPropsType;

export default connect<null, MapDispatchToPropsType, null, AppStoreType>
(null, {addReport: addReportThunkCreator})(AddReportContainer);