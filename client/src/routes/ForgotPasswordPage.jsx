import Copyright from "../components/Copyright.component";
import ResponsiveAppBar from '../components/WelcomeWingmanBar';
import React from "react";
import ForgotPassword from "../components/ForgotPassword.component";


const ForgotPasswordPage = () => {
   return (
        <div>
          <ResponsiveAppBar/>
          <ForgotPassword />
          <Copyright sx={{ mt: 5 }} />
        </div>
      );
  };
   
  export default ForgotPasswordPage;