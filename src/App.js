import './App.css';
import ReportContainer from "./components/Reports/ReportContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import DailyReportContainer from "./components/DailyReports/DailyReportContainer";
import {Route} from "react-router-dom";
import UpdateReportContainer from "./components/Reports/UpdateReport/UpdateReportContainer";
import LoginContainer from "./components/Account/Login/LoginContainer";
import AddReportContainer from "./components/Reports/AddReport/AddReportContainer";

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
        </div>
    </div>
  );
}

export default App;
