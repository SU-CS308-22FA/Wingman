import React from "react";
import Copyright from "../../components/Copyright.component";
import ResponsiveAppBar from "../../components/LoggedInAppBar";
import TeamProfile from "../../components/TeamProfile.component";

const ATeamProfile = () => {
    return (
      <div>
        <ResponsiveAppBar/>
        <TeamProfile />
        <Copyright sx={{ mt: 5 }} />
      </div>
    );
  };
   
  export default ATeamProfile;