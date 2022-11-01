import React, { Fragment, useState, useEffect, useNavigate } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from './WelcomeWingmanBar';
import UserDataService from "../services/user.service";
import { useHistory } from "react-router-dom";
import Login from "./adminlogin.components";

const theme = createTheme({
  palette: {
    primary: {
      main: '#A99985',
    },
    secondary: {
      main: '#70798C',
    },
  },
});




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Wingman
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const UpdateProfile = ({}) => {
  const [inputs, setInputs] = useState({
    mail: "",
    name: "",
    surname: "",
    password: ""
  });
  const [submitted, setSubmitted] = useState(false)
  

  const { mail, name, surname,password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { mail, name, surname, password };
      await fetch(
        "http://localhost:5000/api/wingman/users",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      )
      .then(response => response.json()
      .then(data => ({data: data.data,}))
      .then(res => {
        console.log(res.data.mail)
        setSubmitted(true)
      }));
    } catch (err) {
      console.error('onSubmit form error: ', err.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src="https://i.hizliresim.com/t6q9rs6.png" height="66" width="50" />          
          <Box m={1} pt={0}> </Box>
          <Typography component="h3" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmitForm} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="First Name"
                  onChange={e => onChange(e)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="surname"
                  label="Last Name"
                  name="surname"
                  autoComplete="family-name"
                  onChange={e => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mail"
                  label="Email Address"
                  name="mail"
                  autoComplete="email"
                  onChange={e => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={e => onChange(e)}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              color = "secondary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/profile" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      
    </ThemeProvider>
  );
}
export default SignUp;
