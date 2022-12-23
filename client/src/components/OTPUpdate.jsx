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

const OTPUpdate = ({}) => {
  
  const navigate = useNavigate()

  const {user, setUser} = useContext(UsersContext)

  const [error, setError] = useState(null)

  const [isLoading, setLoading] = useState(true)

  const [inputs, setInputs] = useState({
    mail: "",
  });

  useEffect(() => {
    if(user)
      setLoading(false)
      setInputs({
        mail: user.mail,
        password: user.password,
        });
  }, []);
  

  const { mail, name, surname,password } = inputs;

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPass(pass) {
    if (password == "" || password == null)
    {
      return true;
    }
    else if(pass.length >= 8)
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

    const response = await UserFinder.patch(`/users/${user.id}`, {
        mail: mail, 
        password: password,
      })
      .then(response =>{
        let val = {
          id: response.data.data.user_id,
          mail: response.data.data.mail,
          name: response.data.data.name,
          surname: response.data.data.surname,
          role: response.data.data.role,
          isotp: response.data.data.isotp
        }
        setUser(val)
        localStorage.setItem("user", JSON.stringify(val));
        navigate("/profile/")
        }
      )
      
    } catch (err) {
        if(err.fmessage)
            setError(err.fmessage)
        else if(err.response.status==401)
            setError("Selected mail is already in use, please change it.")
        else if(err.response.status==402)
            setError("You have to set new password in one time credentials update.")
      else
        setError("There was an unknown problem")
      console.error('onSubmit form error: ', err);
    }
  };

  return (
    <div>
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
            Change One Time Mail and Password
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmitForm} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
              Set Info
            </Button>
          </Box>
        </Box>  
      </Container>
      
    </div>
  );
}
export default OTPUpdate;