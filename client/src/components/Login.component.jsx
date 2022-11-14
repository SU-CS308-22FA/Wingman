import React, { useContext, useState, useEffect } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {useNavigate} from "react-router-dom"
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import UserFinder from "../apis/UserFinder";
import { UsersContext } from "../context/UserContex";
import { AuthContext } from "../context/authContext";



const Login = ({}) => {
    const navigate = useNavigate();
    const {setUser} = useContext(UsersContext)
    const {setAuth} = useContext(AuthContext)
    
    

    const getData = async () => {
      try {
        //TODO put request header
        const userData =  await UserFinder.get(`/users/1`,{headers: {'jwt_token': localStorage.token}})
        let val = {
          id: userData.data.data.user_id,
          mail: userData.data.data.mail,
          name: userData.data.data.name,
          surname: userData.data.data.surname,
        }   
        return val;
      } catch (err) {
        console.error(err.message);
      }
    };

    const checkAuthenticated = async () => {
      try {
                //TODO put request header
        const res = await UserFinder.post("/verify", {}, {headers: {'jwt_token': localStorage.token}})
        if (res.data.isAuth === true){
          setAuth(true);
          const val = await getData();
          setUser(val)
          navigate("/profile/")
        }
        else{
          await setAuth(false);
        } 
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
      checkAuthenticated();
    }, []);


    const [inputs, setInputs] = useState({
      mail: "",
      password: "",
    });

    const [error, setError] = useState(null)
  
    const { mail, password } = inputs;

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
          throw{fmessage: "Mail is invalid. Please check the mail field."}
        else if(!isValidPass(password))
          throw{fmessage: "Password is invalid. Make sure your password is at least eight characters long."}


        const response = await UserFinder.put("/auth/", {
            mail: mail, 
            password: password
        })

        //auth user first
        if(response.status==200){
            let id = response.data.data.user_id
            
            //then set global user user context as user data
            try {
                if (response.data.jwtToken) {
                  localStorage.setItem("token", response.data.jwtToken);
                  await setAuth(true);
                } else {
                  await setAuth(false);
                }
                const val = await getData();
                await setUser(val)
                navigate("/profile/")
              }
              catch(err){
                console.error('profile get error: ', err);
                }

          }
        else
            throw{fmessage: "There was an unknown problem"}
    }
    catch(err){
        if(err.fmessage)
            setError(err.fmessage)
        else if(err.response.status == 404)
            setError("Invalid creditianls.")
        else
            setError("There was an unknown problem")
      console.error('onSubmit form error: ', err);
      }  
    };
  

  return (
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
            <Box m={1} pt={0}> </Box>
            {error &&<Alert variant="filled" severity="error"> {error} </Alert>}
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
      </Container>
  );
}
export default Login;