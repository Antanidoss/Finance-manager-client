import './App.css';
import ReportContainer from "./components/Reports/ReportContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import DailyReportContainer from "./components/DailyReports/DailyReportContainer";
import {Route} from "react-router-dom";
import UpdateReportContainer from "./components/Reports/UpdateReport/UpdateReportContainer";
import LoginContainer from "./components/Account/Login/LoginContainer";
import AddReportContainer from "./components/Reports/AddReport/AddReportContainer";
import ProfileContainer from "./components/Account/Profile/ProfileContainer";

function App() {
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

export default App;
