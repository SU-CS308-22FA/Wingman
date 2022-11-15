import React from "react";
import Copyright from "../../components/Copyright.component";
import Register from "../../components/Register.component";
import ResponsiveAppBar from '../../components/WelcomeWingmanBar';


const RRRegisterPage = () => {
    return (
      <div>
        <ResponsiveAppBar/>
        <Register role="Reporter"/>
        <Copyright sx={{ mt: 5 }} />
      </div>
    );
  };
   
  export default RRRegisterPage;