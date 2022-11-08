import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import { UsersContextProvider } from "./context/UserContex";
import RRRegisterPage from "./routes/RR/RRRegister";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RRLoginPage from "./routes/RR/RRLogin";
import RRProfilePage from "./routes/RR/RRProfile";
import RRUpdatePage from "./routes/RR/RRUpdate";

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
                    <Route path="/login" element={<RRLoginPage/>}/>
                    <Route path="/profile/" element={<RRProfilePage/>}/>\
                    <Route path="/update/" element={<RRUpdatePage/>}/>
                </Routes> 
              </Router>       
            </div>
          </ThemeProvider>
        </UsersContextProvider>
 
    );
  }
}
    
export default App;
