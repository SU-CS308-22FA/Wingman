import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import { UsersContextProvider } from "./context/UserContex";
import RRRegisterPage from "./routes/RR/RRRegister";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RRLoginPage from "./routes/RR/RRLogin";
import ProfilePage from "./routes/ProfilePage";
import RRUpdatePage from "./routes/RR/RRUpdate";
import AdminRegisterPage from "./routes/admin/AdminRegister";
import RRRefereeList from "./routes/RR/RRRefereeList"
import  RRRefereeProfile  from "./routes/RR/RRRefereeProfile";

const theme = createTheme({
  palette: {
    primary: {
      main: '#A99985',
    },
    secondary: {
      main: '#70798C',
    },
    third : {
      main : "#9297A5",
    },
    fourth:{
      main: "#DAD2BC",
    },
    fifth :{
      main : "#F5F1ED",
    }
  },
});
class App extends Component {
 
  render() {
    const myStyle={
      background: "#F5F1ED",
      height:'100vh',
      fontSize:'24px',
      backgroundSize: 'cover',
  };

    return (    
        <UsersContextProvider>
          <ThemeProvider theme={theme}>
            <div style = {myStyle}>
            <Router>
              <Routes>
                    <Route path="/" element={<RRRegisterPage/>}/>        
                    <Route path="/register" element={<RRRegisterPage/>}/>
                    <Route path="/admin/register" element={<AdminRegisterPage/>}/>
                    <Route path="/login" element={<RRLoginPage/>}/>
                    <Route path="/admin/login" element={<RRLoginPage/>}/>
                    <Route path="/profile/" element={<ProfilePage/>}/>\
                    <Route path="/update/" element={<RRUpdatePage/>}/>
                    <Route path="/refereeList" element={<RRRefereeList/>}/>
                    <Route path="/referee/:id" element={<RRRefereeProfile/>}/>
                </Routes> 
              </Router>       
            </div>
          </ThemeProvider>
        </UsersContextProvider>
 
    );
  }
}
    
export default App;
