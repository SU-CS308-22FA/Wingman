import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { UsersContextProvider } from "./context/UserContex";
import RRRegisterPage from "./routes/RR/RRRegister";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RRLoginPage from "./routes/RR/RRLogin";
import ProfilePage from "./routes/ProfilePage";
import RRUpdatePage from "./routes/Update";
import AdminRegisterPage from "./routes/admin/AdminRegister";
import RRRefereeProfile from "./routes/RR/RRRefereeProfile";
import RRRefereeList from "./routes/RefereeList";
import TeamListPage from "./routes/Teams";
import { AuthContextProvider } from "./context/authContext";
import WelcomePage from "./routes/Welcome";
import FixturePage from "./routes/fixturePage";
import RefereeAssignPage from "./routes/AssignReferee";
import ATeamProfile from "./routes/admin/TeamProfile";
import RefereeDashboard from "./components/RefereeDashboard";
import RefereeDashboardPage from "./routes/RefereeDashboardPage";
import MatchPage from "./routes/MatchPage";
import ReporterListPage from "./routes/admin/ReporterList";
import DeleteRequestPage from "./routes/SuperAdmin/DeleteRequestsPage";
import RRHistPage from "./routes/RRHistPage";
import RefereeCreatePage from "./routes/RefereeCreation";
import MatchReportPage from "./routes/matchReportPage";
const theme = createTheme({
  palette: {
    primary: {
      main: "#A99985",
    },
    secondary: {
      main: "#70798C",
    },
    third: {
      main: "#9297A5",
    },
    fourth: {
      main: "#DAD2BC",
    },
    fifth: {
      main: "#F5F1ED",
    },
    alertRed: {
      main: "#dc143c",
    },
  },
});
class App extends Component {
  render() {
    const myStyle = {
      background: "#F5F1ED",
      fontSize: "24px",
      backgroundSize: "cover",
    };
    const myStyleBottom = {
      background: "#F5F1ED",
      fontSize: "24px",
      backgroundSize: "cover",
      heigt: "500px",
      margin: "400px, 0, 0",
    };

    return (
      <AuthContextProvider>
        <UsersContextProvider>
          <ThemeProvider theme={theme}>
            <div style = {myStyle}>
            <Router>
              <Routes>
                    <Route path="/" element={<WelcomePage/>}/>        
                    <Route path="/reporter/register" element={<RRRegisterPage/>}/>
                    <Route path="/admin/register" element={<AdminRegisterPage/>}/>
                    <Route path="/login" element={<RRLoginPage/>}/>
                    <Route path="/admin/login" element={<RRLoginPage/>}/>
                    <Route path="/profile/" element={<ProfilePage/>}/>\
                    <Route path="/update/" element={<RRUpdatePage/>}/>
                    <Route path="/addReferee" element={<RefereeCreatePage/>}/>

                    <Route path="/refereeList" element={<RRRefereeList/>}/>
                    <Route path="/referee/:id" element={<RefereeDashboardPage/>}/>     
                    <Route path="/teams" element={<TeamListPage/>}/>
                    <Route path="/assign/:id/week/:week" element={<RefereeAssignPage/>}/>
                    <Route path="/teams/:id" element={<ATeamProfile/>}/>
                    <Route path="/fixture/:week" element={<FixturePage/>}/>
                    <Route path="/teams/:id" element={<ATeamProfile/>}/>
                    <Route path="/match/:id" element={<MatchPage/>}/>
                    <Route path="/history/" element={<RRHistPage/>}/>
                    <Route path="/reporters" element={<ReporterListPage />} />
                    <Route path="/requests" element={<DeleteRequestPage />} />
                    <Route path="/reports" element={<MatchReportPage />} />
                </Routes>
              </Router>
            </div>
            <div id="bottom" style={myStyleBottom}>
              <br />
              <br />
            </div>
            <div id="bottom" style={myStyleBottom}>
              <br />
              <br />
            </div>
          </ThemeProvider>
        </UsersContextProvider>
      </AuthContextProvider>
    );
  }
}

export default App;
