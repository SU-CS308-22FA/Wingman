import React from "react";
import Copyright from "./../components/Copyright.component";
import ResponsiveAppBar from './../components/LoggedInAppBar';
import Box from '@mui/material/Box';


const TeamListPage = () => {
    return (
      <div>
        <ResponsiveAppBar/>
        <Box m={0} pt={34}> </Box>

        <center>             <img src="https://i.hizliresim.com/t6q9rs6.png" height="66" width="50" />          
</center>
        <Copyright sx={{ mt: 5 }} />
      </div>
    );
  };
   
  export default TeamListPage;