import Footer from "../components/Footer.component";
import RRProfile from "../components/RRProfile.component";
import AdminProfile from "../components/AdminProfile.component";
import ResponsiveAppBar from '../components/LoggedInAppBar';
import React, { useContext, useState, useEffect } from "react";
import { UsersContext } from "../context/UserContex";
import { AuthContext } from "../context/authContext";


const ProfilePage = () => {
  const {user, setUser} = useContext(UsersContext)
  const {setAuth} = useContext(AuthContext)
  if(user == undefined)
  {
    setUser(JSON.parse(localStorage.getItem("user")))
    setAuth(true)
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
  else
  {
    return (
      <div>
        <ResponsiveAppBar/>
        <RRProfile />
        <Footer/>
      </div>
    );
  }

    
  };
   
  export default ProfilePage;