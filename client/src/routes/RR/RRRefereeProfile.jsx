import React from "react";
import Copyright from "../../components/Copyright.component";
import { RefereeList } from "../../components/RefereeList_old";

import ResponsiveAppBar from '../../components/WelcomeWingmanBar';
import RefereeProfile  from "../../components/RefereeProfile.component";

const RRRefereeProfile = () => {
    return (
      <div>
        <ResponsiveAppBar/>
        <RefereeProfile />
        <Copyright sx={{ mt: 5 }} />
      </div>
    );
  };
   
  export default RRRefereeProfile;