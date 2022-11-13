import React from "react";
import Copyright from "../../components/Copyright.component";
import Login from "../../components/Login.component";

import ResponsiveAppBar from '../../components/WelcomeWingmanBar';


const AdminLoginPage = () => {
    return (
      <div>
        <ResponsiveAppBar/>
        <Login />
        <Copyright sx={{ mt: 5 }} />
      </div>
    );
  };
   
  export default AdminLoginPage;