import React, { useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {useNavigate} from "react-router-dom"
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from './WelcomeWingmanBar';

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://wingman-team29.herokuapp.com"
    : "http://localhost:5000";

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


const Login = ({}) => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
      mail: "",
      password: ""
    });
  
    const { mail, password } = inputs;
  
    const onChange = e =>
      setInputs({ ...inputs, [e.target.name]: e.target.value });
  
    const onSubmitForm = async e => {
      e.preventDefault();
      try {
        const body = { mail, password };
        const response = await fetch(
          "${API_URL}/api/wingman/auth",
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(body)
          }
        )
        .then(response => response.json()
        .then(data => ({data: data.data,}))
        .then(res => {
          if(response.status==200){
            navigate("/profile/" + res.data.user_id, {id: res.data.user_id})}
        }));


    }

    catch(err){
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

          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={onSubmitForm} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="mail"
              label="Email Address"
              name="mail"
              autoComplete="mail"
              autoFocus
              onChange={e => onChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => onChange(e)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
export default Login;
