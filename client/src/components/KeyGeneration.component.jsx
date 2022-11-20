import Select from '@mui/material/Select';
import React, { useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import UserFinder from "../apis/UserFinder";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';


export const GenerateKey = () => {

    const [inputs, setInputs] = useState({
        mail: "",
        role: "",
      });
  
      const [error, setError] = useState(null)
      const [succes, setSucces] = useState(null)
    
      const { mail, role } = inputs;
  
      function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }
  
      function isValidRole(role) {
        if(role != null)
        {
          return true;
        } else{
          return false;
        }
      };
    
      const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });
        console.log(inputs)
    
      const onSubmitForm = async e => {
        e.preventDefault();
        try {
          if(!isValidEmail(mail))
            throw{fmessage: "Mail is invalid. Please check the mail field."}
          else if(!isValidRole(role))
            throw{fmessage: "You did not select any role. Please make sure you selected a role."}

          const response = await UserFinder.put("/key/", {
              mail: mail, 
              role: role,
          })
          console.log(response.status)
          if(response.status==200){
            setError(null)
            setSucces("The key for " + response.data.data.email + " is generated and sent.")
            setInputs({mail:'', role:''})
            }
      }
      catch(err){
        setSucces(null)
          if(err.fmessage)
              setError(err.fmessage)
          else if(err.response.status==406){
            setError("The user is already registered")
          }
          else if(err.response.status==401){
            setError("The key is already sent to this email")
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
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Generate Key
            </Typography>
            <Box component="form" onSubmit={onSubmitForm} noValidate sx={{ mt: 1 }}>
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
                onChange={e => onChange(e)}
              />
             <FormControl fullWidth>
                <InputLabel id="roleLabel">Role</InputLabel>
            <Select
                labelId='roleLabel'
                id="role"
                value={role}
                name="role"
                label="Role"
                required
                fullWidth
                onChange={e => onChange(e)}
            >
                <MenuItem value={"TFF Admin"}>TFF Admin</MenuItem>
                <MenuItem value={"Reporter"}>Reporter</MenuItem>
                <MenuItem value={"Retired Referee"}>Retired Referee</MenuItem>
            </Select>
            </FormControl>
              <Box m={1} pt={0}> </Box>
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
                Generate Key
              </Button>
            </Box>
          </Box>
        </Container>
    );

    
}