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


const ProfilePage = () => {
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
      navigate('/')
    }

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
        <ResponsiveAppBar/>
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
        <SuperAdminList />
      </div>
    );
  }
  else{
    return (<h1>Loading...</h1>)
  }

    
  };
   
  export default ProfilePage;