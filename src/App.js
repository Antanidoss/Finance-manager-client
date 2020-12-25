import './App.css';
import ReportContainer from "./components/Reports/ReportContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import DailyReportContainer from "./components/DailyReports/DailyReportContainer";
import {Route} from "react-router-dom";
import UpdateReportContainer from "./components/Reports/UpdateReport/UpdateReportContainer";
import LoginContainer from "./components/Users/Login/LoginContainer";
import AddReportContainer from "./components/Reports/AddReport/AddReportContainer";
import ProfileContainer from "./components/Users/Profile/ProfileContainer";
import {Component} from "react";
import {connect} from "react-redux";
import Preloader from "./components/common/Preloader/Preloader";
import {initializeThunkCreator} from "./redux/app-reducer";

class App extends Component {
    componentDidMount() {
        this.props.initialize();
    }
    render() {
        debugger
        if (!this.props.initialized) {
            return <Preloader></Preloader>
        }
        return (
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
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default connect(mapStateToProps, {initialize: initializeThunkCreator})(App)
