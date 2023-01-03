import React, { useContext, useState, useEffect } from "react";
import Copyright from "../components/Copyright.component";
import ResponsiveAppBar from '../components/LoggedInAppBar';
import Box from '@mui/material/Box';
import { UsersContext } from "../context/UserContex";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import UserFinder from "../apis/UserFinder";
import ReporterMatch from "../components/RatingComponents/ReporterMatch.component";
import { CircularProgress } from "@material-ui/core";
import RefAppBar from "../components/RetiredRefReporterAppBar";
import ActiveRefAppBar from "../components/ActiveRefAppBar";
import ActiveRefereeMatch from "../components/ActiveRefereeMatch";
import OTPUpdate from "../components/OTPUpdate";
import WellcomeAppBar from "../components/WelcomeBar";



const MatchPage = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true)

  const {user, setUser} = useContext(UsersContext)
  const {setAuth} = useContext(AuthContext)
  const getData = async () => {
    try {
      await UserFinder.get(`/users/1`, {headers: {'jwt_token': localStorage.token}})
      .then(userData =>{
        let val = {
          id: userData.data.data.user_id,
          mail: userData.data.data.mail,
          name: userData.data.data.name,
          surname: userData.data.data.surname,
          role: userData.data.data.role,
        }
        setUser(val)
      })
    } catch (err) {
      console.error(err.message);
    }
  };

  const checkAuthenticated = async () => {
    try {
      const res = await UserFinder.post("/verify", {}, {headers: {'jwt_token': localStorage.token}})
      if (res.data.isAuth === true){
        await getData();
        await setAuth(true);
        setLoading(false)
      }
      else{
        await setAuth(false);
        navigate("/")
      } 
    } catch (err) {
      console.error(err.message);
      await setAuth(false);
      navigate("/")
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);
  if(isLoading || user === undefined){
    return (
      <div>
        <Box m={0} pt={34}> </Box>
        <center> <CircularProgress /></center>
      </div>
    );
  }
  else if(user.isotp)
  {
    <div>
        <WellcomeAppBar/>
        <OTPUpdate/>
      </div>
  }
  else if(user.role == "TFF Admin"){
    return (
      <div>
        <ResponsiveAppBar/>
        <ReporterMatch/>
        <Copyright sx={{ mt: 5 }} />
      </div>
    );
  }
  else if(user.role == "Active Referee"){
    return (
      <div>
        <ActiveRefAppBar/>
        <ActiveRefereeMatch/>
        <Copyright sx={{ mt: 5 }} />
      </div>
    );
  }
  else if(user.role == "Reporter" || user.role == "Retired Referee"){
    return (
      <div>
        <RefAppBar/>
        <ReporterMatch/>
        <Copyright sx={{ mt: 5 }} />
      </div>
    );
  }
  else{
    return (
      <div>
        <Box m={0} pt={34}> </Box>
        <center> <CircularProgress /></center>
      </div>
    );
  }
}
   
  export default MatchPage;