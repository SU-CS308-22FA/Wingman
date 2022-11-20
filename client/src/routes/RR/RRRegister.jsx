import Copyright from "../../components/Copyright.component";
import Register from "../../components/Register.component";
import ResponsiveAppBar from '../../components/WelcomeWingmanBar';
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../context/UserContex";
import { AuthContext } from "../../context/authContext";
import UserFinder from "../../apis/UserFinder";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



const RRRegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true)
  const {setUser} = useContext(UsersContext)
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
        navigate("/profile/")
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
        setLoading(false)
      } 
    } catch (err) {
      console.error(err.message);
      setLoading(false)
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);
    if(isLoading){
      return (
        <div>
          <Box m={0} pt={34}> </Box>
          <center> <CircularProgress /></center>
        </div>
      );
    }
    else{
    return (
      <div>
        <ResponsiveAppBar/>
        <Register role="Reporter"/>
        <Copyright sx={{ mt: 5 }} />
      </div>
    );
    }
  };
   
  export default RRRegisterPage;