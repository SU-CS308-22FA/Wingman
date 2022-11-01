import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {Routes,Route,Link} from "react-router-dom";
import './App.css';
import SignUp from "./components/adminregister.component";
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
            {<SignUp/>} 
        </div>
 
    );
  }
}
    
export default App;
