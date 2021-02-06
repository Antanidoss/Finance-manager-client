import './App.css';
import ReportContainer from "./components/Reports/ReportContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import DailyReportContainer from "./components/DailyReports/DailyReportContainer";
import {Route} from "react-router-dom";
import UpdateReportContainer from "./components/Reports/UpdateReport/UpdateReportContainer";
import LoginContainer from "./components/Users/Login/LoginContainer";
import ProfileContainer from "./components/Users/Profile/ProfileContainer";
import {useEffect} from "react";
import {connect} from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import {initializeThunkCreator} from "./redux/app-reducer";
import RegistrationContainer from "./components/Users/Registration/RegistrationContainer";
import AddReportContainer from "./components/Reports/AddReport/AddReportContainer";
import {AppStoreType} from "./redux/redux-store";
import {getInitialized} from "./redux/app-selectors";
import React from 'react';
import {compose} from "redux";

const App: React.FC<PropsType> = (props) => {
    useEffect(() => {
        props.initialize();
    }, [])

    if (!props.initialized) {
        return <Preloader></Preloader>
    }
    return (
        <>{
            <div className="wrapper">
                <Navbar></Navbar>
                <HeaderContainer></HeaderContainer>
                <div className="content">
                    <Route path="/dailyReports" render={() => (<DailyReportContainer></DailyReportContainer>)}></Route>
                    <Route path="/reports/:dailyReportId" render={() => (<ReportContainer></ReportContainer>)}></Route>
                    <Route path="/auth" render={() => (<LoginContainer></LoginContainer>)}></Route>
                    <Route path="/updateReport/:reportId" render={() => (<UpdateReportContainer></UpdateReportContainer>)}></Route>
                    <Route path="/addReport" render={() => (<AddReportContainer></AddReportContainer>)}></Route>
                    <Route path="/profile" render={() => (<ProfileContainer></ProfileContainer>)}></Route>
                    <Route path="/reg" render={() => (<RegistrationContainer></RegistrationContainer>)}></Route>
                </div>
            </div>
        }</>
    );

}

type MapStateToPropsType = {
    initialized: boolean
}

type MapDispatchToPropsType = {
    initialize: typeof initializeThunkCreator
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStoreType) => ({
    initialized: getInitialized(state)
})

export default compose<React.ComponentType>(connect<MapStateToPropsType, MapDispatchToPropsType, null, AppStoreType>
(mapStateToProps, {initialize: initializeThunkCreator}))(App)

