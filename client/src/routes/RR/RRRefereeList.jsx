import React from "react";
import Copyright from "../../components/Copyright.component";
import { RefereeList_old } from "../../components/RefereeList_old";

import ResponsiveAppBar from '../../components/WelcomeWingmanBar';
import {RefereeList} from  '../../components/RefereeList';


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