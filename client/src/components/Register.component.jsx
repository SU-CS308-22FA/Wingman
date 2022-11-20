import React, { useContext, useState, useEffect } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {useNavigate} from "react-router-dom"
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import UserFinder from "../apis/UserFinder";
import { AuthContext } from "../context/authContext";
import { UsersContext } from "../context/UserContex";


const Register = (props) => {
  const myRole = props.role
  const navigate = useNavigate();
  const {setUser} = useContext(UsersContext)
  const {setAuth} = useContext(AuthContext)
  const [error, setError] = useState(null)
  
  const [inputs, setInputs] = useState({
    role: myRole,
    mail: "",
    password: "",
    name: "",
    surname: "",
    security_key: "",
  });  

  const { mail, name, surname,password, role, security_key } = inputs;

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
        if(!isValidPass(password))
          throw{fmessage: "Password is invalid. Make sure your password is at least eight characters long."}
        if(name.length == 0 || surname.length == 0 || security_key.length == 0)
            throw{fmessage: "Please fill all the fields."}


      const response = await UserFinder.post("/users/", {
        role: role,
        mail: mail, 
        name: name, 
        surname: surname, 
        password: password,
        security_key: security_key
      })
      
      if(response.status==200){
        if (response.data.jwtToken) {
          localStorage.setItem("token", response.data.jwtToken);
          let val = {
            id: response.data.data.user_id,
            mail: response.data.data.mail,
            name: response.data.data.name,
            surname: response.data.data.surname,
            role: response.data.data.role
          } 
          setUser(val)  
          setAuth(true);
        } else {
          setAuth(false);
        }
        navigate("/profile/")}

    } catch (err) {
        if(err.fmessage)
            setError(err.fmessage)
        else if(err.response.status == 401)
            setError("Selected mail is already in use, please change your mail.")
        else if(err.response.status == 402)
            setError("Invalid security key. Please make sure you are using a correct key that matches your role.")
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
                  
          <Box m={1} pt={0}> </Box>
          { myRole == "TFF Admin" ? <Typography component="h3" variant="h5">
                     Register for TFF Admin </Typography> : <Typography component="h3" variant="h5">
                     Register </Typography> }
          

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
              <Grid item xs={12} sm={6}>
              { myRole == "TFF Admin" ? 
              <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  style={{ width: 400 }}
                  value = {role}
                  label="Select Role"
                  onChange={e => onChange(e)}
                  defaultValue="TFF Admin"
                  >
                <MenuItem value={"TFF Admin"}>TFF Admin</MenuItem>
              </Select> : 
              
              <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  style={{ width: 400 }}
                  value = {role}
                  label="Select Role"
                  onChange={e => onChange(e)}
                  defaultValue="Reporter"
                  >
                <MenuItem value={"Reporter"}>Reporter</MenuItem>
                <MenuItem value={"Retired Referee"}>Retired Referee</MenuItem>
              </Select> }


                
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="security_key"
                  label="Security Key given by TFF"
                  type="password"
                  id="secure_key"
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              { myRole == "TFF Admin" ? <Link href="/admin/login" variant="body2">
                  Already have an account? Sign in
                </Link> : <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link> }
                
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>  );
}
export default Register;
