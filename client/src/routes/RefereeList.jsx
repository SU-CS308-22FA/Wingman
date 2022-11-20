import React, { useContext } from "react";
import Copyright from "../components/Copyright.component";
import { RefereeList } from "../components/RefereeList";
import Box from '@mui/material/Box';
import ResponsiveAppBar from '../components/LoggedInAppBar';
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../context/UserContex";
import { AuthContext } from "../context/authContext";
import { useState } from "react";


const RRRefereeList = () => {
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
    console.log("icerdema")
    return (
      <div>
        <ResponsiveAppBar/>
        <RefereeList />
        <Box m={0} pt={34}> </Box>

        <center>             <img src="https://i.hizliresim.com/t6q9rs6.png" height="66" width="50" />          
</center>
        <Copyright sx={{ mt: 5 }} />
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
  };
   
  export default RRRefereeList;