import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import SignUp from "./components/adminregister.component";
import Login from "./components/adminlogin.components";
class App extends Component {
 
  render() {
    const myStyle={
      background: "#F5F1ED",
      height:'100vh',
      fontSize:'24px',
      backgroundSize: 'cover',
  };

    return (    
        <div style = {myStyle}>
        <Router>
          <Routes>        
                <Route path="/" element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes> 
          </Router>       
        </div>
 
    );
  }
}
    
export default App;
