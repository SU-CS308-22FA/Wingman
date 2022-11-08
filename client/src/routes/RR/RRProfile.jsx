import React from "react";
import Footer from "../../components/Footer.component";
import ProfilePage from "../../components/RRProfile.component";
import ResponsiveAppBar from '../../components/WelcomeWingmanBar';


const RRProfilePage = () => {
    return (
      <div>
        <ResponsiveAppBar/>
        <ProfilePage />
        <Footer/>
      </div>
    );
  };
   
  export default RRProfilePage;