import React, { Fragment, useState, useEffect} from "react";
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
import Alert from '@mui/material/Alert';

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

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://wingman-team29.herokuapp.com"
    : "http://localhost:5000";


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
  
  const id = window.location.href.split("/").at(-1)

  const navigate = useNavigate()

  const [error, setError] = useState(null)

  const [isLoading, setLoading] = useState(true)

  const [inputs, setInputs] = useState({
    mail: "",
    password: "",
    name: "",
    surname: "",
  });

  function getActorInfo()
{
  try {
    const response = fetch(
      API_URL + "/api/wingman/users/" + id,
      {
        method: "GET",
      }
    )
    .then(response => response.json()
    .then(data => ({data: data.data,}))
    .then(res => {
      setInputs({
        mail: res.data.mail,
        name: res.data.name,
        surname: res.data.surname,
        password: "",
      })
      setLoading(false)
    }));
  }
  catch(err){
    console.error('profile get error: ', err);
    }
}

useEffect(() => {
  getActorInfo();
}, []);
  

  const { mail, name, surname,password } = inputs;

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPass(pass) {
    if(pass.length >= 8)
    {
      return true;
    } else{
      return false;
    }
  };

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value }); 
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      if(!isValidEmail(mail))
        {
          throw{
            fmessage: "Mail is invalid. Please check the mail field."
          }
        }
        if(!isValidPass(password))
        {
          throw{
            fmessage: "Password is invalid. Make sure your password is at least eight fields long."
          }
        }
        if(name.length == 0 || surname.length == 0)
        {
          throw{
            fmessage: "Please fill all the fields."
          }
        }

      const body = { mail, name, surname, password };
      await fetch(
        API_URL + "/api/wingman/users/" + id,
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
        console.log(res.data.mail)
        if(response.status==200){
          navigate("/profile/" + id)
        }
          else if(response.status==401)
          {
            throw{
              fmessage: "Selected mail is already in use, please change it."
            }
          }
          else
          {
            throw{
              fmessage: "Unkown problem from server. Please try again later."
            }
          }
      }));
    } catch (err) {
      if(err.fmessage)
        setError(err.fmessage)
      else
        setError("There was an unknown problem")
      console.error('onSubmit form error: ', err);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {isLoading? 
            <h1>Loading...</h1>
          :
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
            Update Profile Info
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmitForm} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  value={inputs.name}
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
                  value={inputs.surname}
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
                  value={inputs.mail}
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
                  value={inputs.password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={e => onChange(e)}
                />
              </Grid>

            </Grid>
            <Box m={1} pt={0}> </Box>
            {error &&<Alert variant="filled" severity="error"> {error} </Alert>}
          <Button
              type="submit"
              color = "secondary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Info
            </Button>
          </Box>
        </Box>
          }


        
        <Copyright sx={{ mt: 5 }} />
      </Container>
      
    </ThemeProvider>
  );
}
export default UpdateProfile;
