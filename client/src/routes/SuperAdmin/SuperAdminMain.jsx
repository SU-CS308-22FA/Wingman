import React from "react";
import { GenerateKey } from "../../components/KeyGeneration.component";


import ResponsiveAppBar from '../../components/WelcomeWingmanBar';


const SuperAdminMain = () => {
    return (
      <div>
        <ResponsiveAppBar/>
        <GenerateKey/>
        < SuperAdminList/>
      </div>
    );
  };
   
  export default SuperAdminMain;