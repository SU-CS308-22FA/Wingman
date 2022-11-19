import React, { useContext} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../context/authContext';
import {useNavigate} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { UsersContext } from "../context/UserContex";

function WellcomeAppBar() {
  const {user, setUser} = useContext(UsersContext)
  const {isAuthenticated, setAuth} = useContext(AuthContext)
  const navigate = useNavigate();
  //new pages
   const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      await setAuth(false);
      await setUser(undefined)
      navigate("/")
    } catch (err) {
      console.error(err.message);
    }
  };


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
          <Box sx={{ flexGrow: 0 }}>
          <IconButton
           sx={{ my: 2, color: 'white'}}
           onClick={logout}
          >
            <LogoutIcon />
          </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default WellcomeAppBar;
