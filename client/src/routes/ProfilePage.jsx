import Footer from "../components/Footer.component";
import RRProfile from "../components/RRProfile.component";
import AdminProfile from "../components/AdminProfile.component";
import ResponsiveAppBar from '../components/LoggedInAppBar';
import React, { useContext, useState, useEffect } from "react";
import { UsersContext } from "../context/UserContex";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { SuperAdminList } from "../components/SuperAdminList";
import WellcomeAppBar from "../components/WelcomeBar";
import { GenerateKey } from "../components/KeyGeneration.component";
import UserFinder from "../apis/UserFinder";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import RefAppBar from "../components/RetiredRefReporterAppBar";


const ProfilePage = () => {
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
  else if(user.role == "TFF Admin")
  {
    return (
      <div>
        <ResponsiveAppBar/>
        <AdminProfile />
        <Footer/>
      </div>
    );
  }
  else if(user.role == "Reporter" || user.role=="Retired Referee")
  {
    return (
      <div>
        <RefAppBar/>
        <RRProfile />
        <Footer/>
      </div>
    );
  }
  else if(user.role == "Super Admin")
  {
    return (
      <div>
        <WellcomeAppBar/>
        <GenerateKey/>
        <SuperAdminList />
      </div>
    );
  }
  else{
    return (
      <div>
        <center> <CircularProgress /></center>
      </div>
    );
  }    
  };
   
  export default ProfilePage;