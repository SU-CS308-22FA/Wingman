import React, { useContext, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import UserFinder from "../apis/UserFinder";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';
import { Grid } from "@mui/material";


const ForgotPassword = ({}) => {
  const [inputs, setInputs] = useState({
    mail: "",
  });

  const [error, setError] = useState(null)
  const [succes, setSucces] = useState(null)

  const { mail } = inputs;

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log(inputs)

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (!isValidEmail(mail))
        throw { fmessage: "Mail is invalid. Please check the mail field." };

      const response = await UserFinder.post("/reset", {
        mail: mail,
      });

      //auth user first
      if (response.status == 200) {
        setError(null)
        setSucces("The recovery link is sent. Please check your mail")
        setInputs({mail:""})
        
      } else throw { fmessage: "There was an unknown problem" };
    } catch (err) {
        setSucces(null)
          if(err.fmessage)
              setError(err.fmessage)
          else if(err.response.status==406){
            setError("There is no user with this email")
          }
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
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={onSubmitForm} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={mail}
                  id="mail"
                  label="Email Address"
                  name="mail"
                  autoComplete="mail"
                  autoFocus
                  onChange={(e) => onChange(e)}
                />
              </Grid>
          <Grid item xs={12} sm={12}>
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
        </Grid>
          <Grid item xs={12} sm={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 20 }}
          >
            Send Recovery Link
          </Button>
          </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default ForgotPassword;
