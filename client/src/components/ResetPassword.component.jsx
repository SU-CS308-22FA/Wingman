import React, { useContext, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import UserFinder from "../apis/UserFinder";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';

const ResetPassword = ({}) => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [isVerified, setVerified] = useState(false)
  const verify = async () => {
    try {
      const userData = await UserFinder.post(`/reset/verify/${token}`);
      if (userData.status == 200) {
        setVerified(true)
      } else {
        await sleep(2000)
        navigate("/login")
      }
    } catch (err) {
      await sleep(3000)
      navigate("/login")
    }
  };

  const [inputs, setInputs] = useState({
    password: "",
    password_check: "",
  });

  const [error, setError] = useState(null)
  const [succes, setSucces] = useState(null)

  const { password, password_check } = inputs;

  function isValidPass(pass) {
    if (pass.length >= 8) {
      return true;
    } else {
      return false;
    }
  }

  function isSame(pass, pass_check) {
    if (pass === pass_check) {
      return true;
    } else {
      return false;
    }
  }
  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );
  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (!isValidPass(password))
        throw {
          fmessage:
            "Password is invalid. Make sure your password is at least eight characters long.",
        };
      else if (!isSame(password, password_check)) {
        throw { fmessage: "Passwords do not match." };
      }

      const response = await UserFinder.post(`/reset/${token}`, {password: password});

      if (response.status == 200) {
        setError(null)
        setSucces("Password changed succesfully. You will be redirected to login page in 3 seconds")
        setInputs({password:'', password_check:''})
        await sleep(3000)
        navigate("/login")
      } else throw { fmessage: "There was an unknown problem" };
    } catch (err) {
        setSucces(null)
          if(err.fmessage)
              setError(err.fmessage)
          else if(err.response.status==401){
            setError("The link is invalid or expired. Please try again")
          }
          else
              setError("There was an unknown problem")
        console.error('onSubmit form error: ', err);
        }  
  };
  useEffect(() => {
    verify();
  }, []);
  if(isVerified){
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="https://i.hizliresim.com/t6q9rs6.png"
            height="66"
            width="50"
          />
          <Box m={1} pt={0}>
            {" "}
          </Box>

          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form" onSubmit={onSubmitForm} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => onChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={password_check}
              name="password_check"
              label="Password Check"
              type="password"
              id="password_check"
              onChange={(e) => onChange(e)}
            />
            <Box m={1} pt={0}>
              {" "}
            </Box>
            {error &&<Alert variant="filled" severity="error"> {error} </Alert>}
                {succes &&
                <Alert 
                key= 'Success' 
                startDecorator={React.cloneElement(<CheckCircleIcon />, {
                  sx: { mt: '2px', mx: '4px' },
                  fontSize: 'xl2',
                  })}
                color= 'success'
                endDecorator={
                  <IconButton variant="soft" size="sm" color='success'>
                    <CloseRoundedIcon />
                  </IconButton>
                }
              > {succes} </Alert>}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Reset Password
                </Button>
          </Box>
        </Box>
      </Container>
    );
  }
  else{
    return (
      <div>
        <Box m={0} pt={34}> </Box>
        <center> <Typography component="h1" variant="h5">
            The link is invalid or expired. You will be redirected to login page in 2 seconds
          </Typography> </center>
        <Box m={0} pt={34}> </Box>
      </div>
    );
  };
}
export default ResetPassword;
