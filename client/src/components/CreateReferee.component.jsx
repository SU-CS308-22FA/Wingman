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
const CreateReferee = () => {
  const navigate = useNavigate();
  const [referee, setReferee] = useState(null);
  const [error, setError] = useState(null)
  
  const [inputs, setInputs] = useState({
    name: "",
    surname: "",
    totalmatches: 0,
    totalyellowcards: 0,
    totalredcards: 0,
    age: 0,
    currentseasonmatches: 0,
    totalfoulspg : 0,
    currentyel: 0,
    currentred: 0,
    currentfoulspg: 0,
    totalpenpg:0,
    currentpenpg: 0,

  });  

  const { name, surname, totalmatches,totalyellowcards, totalredcards, age, currentseasonmatches,
    totalfoulspg,currentyel,currentfoulspg,currentred,totalpenpg,currentpenpg} = inputs;
    function isAlphabetical(s) {
        // Use a regex to match only alphabetical characters and spaces
        const pattern = /^[a-zA-Z ]*$/;
      
        // Check if the string matches the pattern
        if (pattern.test(s)) {
          return true;
        } else {
          return false;
        }
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

      if(!isAlphabetical(name))
          throw{fmessage: "Name contains non-alphabetical characters. Please check the name field."}     
        if(!isAlphabetical(surname))
            throw{fmessage: "Surname contains non-alphabetical characters. Please check the name field."}
        if(name.length == 0 || surname.length == 0 || age.length == 0)
            throw{fmessage: "Please fill all the fields."}



      const response = await UserFinder.post("/referees/", {
        name: name, 
        surname: surname, 
        totalmatches: totalmatches,
        totalyellowcards: totalyellowcards,
        totalredcards: totalredcards,
        age: age,
        currentseasonmatches: currentseasonmatches,
        totalfoulspg : totalfoulspg,
        currentyel: currentyel,
        currentred: currentred,
        currentfoulspg: currentfoulspg,
        totalpenpg : totalpenpg,
        totalyelpg: totalyellowcards/totalmatches,
        totalredpg: totalredcards/totalmatches,
        currentpenpg:currentpenpg,
        avatarurl: "https://img.freepik.com/premium-vector/referee-avatar-icon-flat-color-style_755164-489.jpg?w=2000",
      })
      console.log(response.data.data);      
      if(response.status==200){
          let val = {
            id: response.data.data.id,
            name: response.data.data.name,
            surname: response.data.data.surname,
            totalmatches: response.data.data.totalmatches,
            totalyellowcards: response.data.data.totalyellowcards,
            totalredcards:response.data.data.totalredcards,
            age:response.data.data.age,
            currentseasonmatches: response.data.data.currentseasonmatches,
            totalfoulspg : response.data.data.totalfoulspg,
            currentyel: response.data.data.currentyel,
            currentred: response.data.data.currentred,
            currentfoulspg: response.data.data.currentfoulspg,
            totalpenpg : response.data.data.totalpenpg,
            totalyelpg: response.data.data.totalyelpg,
            totalredpg: response.data.data.totalredpg,
            currentpenpg:response.data.data.currentpenpg,
            avatarurl:response.data.data.avatarurl
          } 
          setReferee(val)  
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
          { <Typography component="h3" variant="h5">
                     Create Referee </Typography>  }
          

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
                  id="age"
                  label="Age"
                  name="age"
                  autoComplete="age"
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
              Create Referee
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
               <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link> 
                
                
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>  );
}
export default CreateReferee;
