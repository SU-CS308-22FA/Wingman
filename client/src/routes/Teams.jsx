import React, { useContext } from "react";
import Copyright from "./../components/Copyright.component";
import ResponsiveAppBar from './../components/LoggedInAppBar';
import Box from '@mui/material/Box';
import { TeamList } from "../components/TeamList";
import { UsersContext } from "../context/UserContex";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useState } from "react";

const myStyle={
     background: "#F5F1ED",
     height:'50',
     fontSize:'24px',
     backgroundSize: 'cover',
  };

const TeamListPage = () => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(UsersContext)
  const {setAuth} = useContext(AuthContext)
  const [isLoading, setLoading] = useState(true)
  if(user == undefined)
  {
    try{
      setUser(JSON.parse(localStorage.getItem("user"))).then(() =>{
        setLoading(false)
      })
      setAuth(true)
    }
    catch{
      setAuth(false)
      navigate('/')
    }

  }
  else if(user.role == "TFF Admin" || user.role == "Reporter" || user.role == "Retired Referee"){
    return (
      <div style = {myStyle}>
        <ResponsiveAppBar/>
        <TeamList/>
        <Box m={0} pt={10}> </Box>
      </div>
    );
  }
  else{
      return (
        <div>
          <ResponsiveAppBar/>
          <h1>Loading...</h1>
          <Box m={0} pt={34}> </Box>
  
          <center>             <img src="https://i.hizliresim.com/t6q9rs6.png" height="66" width="50" />          
  </center>
          <Copyright sx={{ mt: 5 }} />
        </div>
      );
  }
}
   
  export default TeamListPage;