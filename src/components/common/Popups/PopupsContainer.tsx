import React from "react";
import { toggleIsPopupsActive } from "../../../redux/app-reducer";
import Popups from "./Popups";
import {connect} from "react-redux";
import { AppStoreType } from "../../../redux/redux-store";
import {getIsPopupsActive, getPopupsMessages} from "../../../redux/app-selectors";
import {compose} from "redux";

export type PropsType = {
    message: string,
    toggleIsPopupsActive: typeof toggleIsPopupsActive,
    isPopupsActive: boolean
}

const PopupsContainer: React.FC<PropsType> = (props) => {
    return props.isPopupsActive ? <Popups {...props}></Popups> : null;
}

type MapStateToPropsType = {
    message: string,
    isPopupsActive: boolean
}

type MapDispatchToPropsType = {
    toggleIsPopupsActive: typeof toggleIsPopupsActive,
}

const mapStateToPropsType = (state: AppStoreType): MapStateToPropsType => ({
    message: getPopupsMessages(state),
    isPopupsActive: getIsPopupsActive(state)
})

export default compose<React.ComponentType>(connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>(mapStateToPropsType,
    {toggleIsPopupsActive: toggleIsPopupsActive}))
(PopupsContainer);