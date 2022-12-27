import React, { useContext} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {useNavigate} from "react-router-dom"
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../context/authContext';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import { UsersContext } from "../context/UserContex";

function ResponsiveAppBar() {
    const navigate = useNavigate();
    const {isAuthenticated, setAuth} = useContext(AuthContext)
    const {user, setUser} = useContext(UsersContext)
    const onProfileClicked = (e) => {
        navigate("/profile");
      };
      const onSettingsClicked = (e) => {
        navigate("/update/");
      };
      const onRefereeClicked = (e) => {
        navigate("/refereeList");
      };
      const onTeamsClicked = (e) => {
        navigate("/teams");
      };
      const onFixtureClicked = (e) => {
        navigate("/fixture/1");
      };
      const onReportersClicked = (e) => {
        navigate("/reporters");
      };
      const onReportsClicked = (e) => {
        navigate("/reports");
      };
const tiers = [
    {
        pageName:"Profile",
        onClick: onProfileClicked
    },
    {
        pageName:"Settings",
        onClick: onSettingsClicked
    },
    {
        pageName:"Referees",
        onClick: onRefereeClicked
    },
    {
        pageName:"Teams",
        onClick: onTeamsClicked
    },
    {
      pageName:"Fixture",
      onClick: onFixtureClicked
    },
    {
      pageName:"Reporters",
      onClick: onReportersClicked
    },
    {
      pageName:"Match Reports",
      onClick: onReportsClicked
    }


  ];
  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      await setAuth(false);
      await setUser(undefined)
      navigate("/")
    } catch (err) {
      console.error(err.message);
    }
  };
  
    
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {tiers.map((value,key) => (
                <MenuItem key={value.pageName} onClick={value.onClick}>
                  <Typography textAlign="center">{value.onClick}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {tiers.map((value,key) => (
              <Button
                key={value.pageName}
                onClick={value.onClick}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {value.pageName}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <IconButton
           sx={{ my: 2, color: 'white'}}
           onClick={logout}
          >
            <LogoutIcon />
          </IconButton>

            <Tooltip title="Open settings">
            <IconButton
           sx={{ my: 2, color: 'white'}}
           onClick={handleOpenUserMenu}
          >
     <Avatar
              src="https://i.imgur.com/BsA4g28.png"
          	sx={{ width: 29, height: 29 }}
 
            />
                      </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {tiers.map((value,key) => (
                <MenuItem key={value.pageName} onClick={value.onClick}>
                  <Typography textAlign="center">{value.pageName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;