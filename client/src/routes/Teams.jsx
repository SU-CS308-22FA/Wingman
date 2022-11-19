import React from "react";
import Copyright from "./../components/Copyright.component";
import ResponsiveAppBar from './../components/LoggedInAppBar';
import Box from '@mui/material/Box';
import { TeamList } from "../components/TeamList";

const TeamListPage = () => {
     const myStyle={
      background: "#F5F1ED",
      height:'50',
      fontSize:'24px',
      backgroundSize: 'cover',
  };

    return (
      <div style = {myStyle}>
        <ResponsiveAppBar/>
        <TeamList/>
        <Box m={0} pt={10}> </Box>
      </div>
    );
  };
   
  export default TeamListPage;