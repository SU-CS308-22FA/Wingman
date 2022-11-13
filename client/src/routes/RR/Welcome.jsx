import React from "react";
import Landing from "../../components/WelcomePage.component";
import ResponsiveAppBar from "../../components/WelcomeWingmanBar";


const WelcomePage = () => {
    return (
      <div>
        <ResponsiveAppBar/>
        <Landing/>
      </div>
    );
  };
   
  export default WelcomePage;