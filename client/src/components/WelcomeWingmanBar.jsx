import React, { useContext} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AuthContext } from '../context/authContext';
import {useNavigate} from "react-router-dom";

function ResponsiveAppBar() {
  const {isAuthenticated, setAuth} = useContext(AuthContext)
  const navigate = useNavigate();
  //new pages


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <img src="https://i.hizliresim.com/q48moyq.png" height="29" width="27" />          
        <Box m={1} pt={2}> </Box>

          <Typography
            variant="h8"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: "white",
              textDecoration: 'none',
            }}
          >
            WINGMAN
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
