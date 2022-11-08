import React from "react";
import Copyright from "../../components/Copyright.component";
import UpdateProfile from "../../components/UpdateProfile.component";
import ResponsiveAppBar from '../../components/WelcomeWingmanBar';


const RRUpdatePage = () => {
    return (
      <div>
        <ResponsiveAppBar/>
        <UpdateProfile />
        <Copyright sx={{ mt: 5 }} />
      </div>
    );
  };
   
  export default RRUpdatePage;