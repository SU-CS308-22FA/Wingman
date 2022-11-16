import React from "react";
import Copyright from "../../components/Copyright.component";
import { RefereeList } from "../../components/RefereeList";

import ResponsiveAppBar from '../../components/LoggedInAppBar';


const RRRefereeList = () => {
    return (
      <div>
        <ResponsiveAppBar/>
        <RefereeList />
        <Copyright sx={{ mt: 5 }} />
      </div>
    );
  };
   
  export default RRRefereeList;