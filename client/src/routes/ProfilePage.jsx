import Footer from "../components/Footer.component";
import RRProfile from "../components/RRProfile.component";
import AdminProfile from "../components/AdminProfile.component";
import ResponsiveAppBar from '../components/WelcomeWingmanBar';
import React, { useContext, useState, useEffect } from "react";
import { UsersContext } from "../context/UserContex";


const ProfilePage = () => {
  const {user} = useContext(UsersContext)
  if(user == undefined)
  {
    return(
      <h1>Zort</h1>
    )
  }
  if(user.role == "TFF Admin")
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