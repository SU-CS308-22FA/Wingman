import Copyright from "../components/Copyright.component";
import ResponsiveAppBar from '../components/WelcomeWingmanBar';
import React from "react";
import ResetPassword from "../components/ResetPassword.component";
import { Box } from "@mui/system";


const ResetPasswordPage = () => {
   return (
        <div>
          <ResponsiveAppBar/>
          <ResetPassword/>
          <Copyright sx={{ mt: 5 }} />
          <Box m={0} pt={34}> </Box>
        </div>
      );
  };
   
  export default ResetPasswordPage;