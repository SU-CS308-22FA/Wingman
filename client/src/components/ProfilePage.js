import * as React from 'react';
import { useState, useRef, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from './WelcomeWingmanBar';
import {useNavigate} from "react-router-dom"




const theme = createTheme({
    palette: {
      primary: {
        main: '#A99985',
      },
      secondary: {
        main: '#70798C',
      },
      third : {
        main : "#9297A5",
      },
      fourth:{
        main: "#DAD2BC",
      },
      fifth :{
        main : "#F5F1ED",
      }
    },
  });
  

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];




const ProfilePage = ({}) => {
  const navigate = useNavigate();

  const id = window.location.href.split("/").at(-1) //Illegal code

  const [user, setUser] = useState({
    mail: "",
    surname: "",
    name: "",
  });

function getActorInfo()
{
  try {
    const response = fetch(
      "http://localhost:5000/api/wingman/users/" + id,
      {
        method: "GET",
      }
    )
    .then(response => response.json()
    .then(data => ({data: data.data,}))
    .then(res => {
      let val = {
        mail: res.data.mail,
        name: res.data.name,
        surname: res.data.surname,
      }
      setUser(val)
      console.log(val)
    }));
  }
  catch(err){
    console.error('profile get error: ', err);
    }
}

  function onDelete(){
    try {
      const response = fetch(
        "http://localhost:5000/api/wingman/users/" + id,
        {
          method: "DELETE",
        }
      )
      .then(response => response.json()
      .then(data => ({data: data.data,}))
      .then(res => {
        navigate("/login/")
      }));
    }
    catch(err){
      console.error('profile get error: ', err);
      }
  }
  






  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResponsiveAppBar/>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
          <Button
              onClick={getActorInfo}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Get User
            </Button>
            <Typography
              variant="h3"
              align="center"
              color="#70798C"
              gutterBottom
            >
              Welcome, {user.mail}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="#70798C"
              gutterBottom
            >
              {user.name}, {user.surname}
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="#70798C"
              gutterBottom
            >
                Mail
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
                Welcome the Wingman, TFF user! You will be able to see information about the user in the near future. For now, you can update your name if you did any mistake or you can delete your account to start again!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button color = 'fourth' variant="contained">UPDATE ACCOUNT</Button>
              <Button onClick={onDelete} color = 'error' variant="contained">DELETE ACCOUNT</Button>
            </Stack>
          </Container>
        </Box>

      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'primary', p: 6 }} component="footer">
        <center>
      <img src="https://i.hizliresim.com/t6q9rs6.png" height="66" width="50"/>    </center>      

        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >

        </Typography>

      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default ProfilePage