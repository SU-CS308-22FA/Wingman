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
    function isNumeric(value) {
        return !isNaN(value);
      }
      function isInteger(value) {
        return /^-?\d+$/.test(value);
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
      if(!isAlphabetical(name)){
        throw{fmessage: "Name contains non-alphabetical characters. Please check the name field."} }    
      else if(!isAlphabetical(surname)){
        throw{fmessage: "Surname contains non-alphabetical characters. Please check the name field."}}
      else if(!isInteger(age) || !isInteger(totalmatches) || !isInteger(totalredcards) || !isInteger(totalyellowcards) ||
              !isInteger(currentseasonmatches)|| !isInteger(currentyel)||  !isInteger(currentred)){
        throw{fmessage: "Total exact amounts cannot be empty and all of them must be integers."}}
      else if(!isNumeric(totalfoulspg)|| !isNumeric(currentfoulspg) || !isNumeric(totalpenpg)|| !isNumeric(currentpenpg)){
        throw{fmessage: "Statistical values cannot include non numeric values."}}
      else if(totalmatches.length != 0 && currentseasonmatches.length != 0 && totalmatches<currentseasonmatches){
                throw{fmessage: "Total number of matches cannot be smaller than current season matches. Please check the both fields."}}
      else if(totalredcards.length != 0 && currentred.length != 0 && totalredcards<currentred){
        console.log(currentred);

                  throw{fmessage: "Total number of red cards cannot be smaller than current season red cards. Please check the both fields."}}
      else if(totalyellowcards.length != 0 && currentyel.length != 0 && totalyellowcards<currentyel){
                    throw{fmessage: "Total number of yellow cards cannot be smaller than current season yellow cards. Please check the both fields."}}
      else if(name.length == 0 || surname.length == 0 || age.length == 0 || totalmatches== 0 || totalyellowcards== 0|| totalredcards== 0 || currentseasonmatches== 0||
                            totalfoulspg== 0||currentyel== 0||currentfoulspg== 0||currentred== 0||totalpenpg== 0||currentpenpg== 0){
          throw{fmessage: "All fields must be filled. Please check if there any empty field."}}






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
          navigate("/refereelist")}
    } catch (err) {
        if(err.fmessage)
            setError(err.fmessage)
        else
            setError("There was an unknown problem.")
        console.error('onSubmit form error: ', err);
    }
  };

  return (
      <Container component="main">
        <CssBaseline />
        <Box margin={{ left: "auto", right: "auto" }}
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
                  
          <Box m={1} pt={0}> </Box>
          <Typography variant="h4" color="#A99985" font fontWeight="600">
                Create Referee
            </Typography>
            <Typography variant="h6" color="#70798C" font fontWeight="200">
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
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="totalmatches"
                  label="Total Matches"
                  name="totalmatches"
                  autoComplete={currentseasonmatches}
                  onChange={e => onChange(e)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
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

              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="totalredcards"
                  label="Total Red Cards"
                  name="totalredcards"
                  autoComplete="totalredcards"
                  onChange={e => onChange(e)}
                />
              </Grid>
    

<Grid item xs={12} sm={4}>
               <TextField
                 required
                 fullWidth
                  id="totalyellowcards"
                 label="Total Yellow Cards"
                  name="totalyellowcards"
                 autoComplete="totalyellowcards"
                 onChange={e => onChange(e)}
               />
             </Grid>

<Grid item xs={12} sm={4}>
               <TextField
                 required
                 fullWidth
                  id="currentseasonmatches"
                 label="Current Season Matches"
                  name="currentseasonmatches"
                 autoComplete="currentseasonmatches"
                 onChange={e => onChange(e)}
               />
             </Grid>
<Grid item xs={12} sm={4}>
               <TextField
                 required
                 fullWidth
                  id="totalfoulspg"
                 label="Total Fouls Per Game"
                  name="totalfoulspg"
                 autoComplete="totalfoulspg"
                 onChange={e => onChange(e)}
               />
             </Grid>
<Grid item xs={12} sm={4}>
               <TextField
                 required
                 fullWidth
                  id="currentyel"
                 label="Current Season Yellow Cards"
                  name="currentyel"
                 autoComplete="currentyel"
                 onChange={e => onChange(e)}
               />
             </Grid>
<Grid item xs={12} sm={4}>
               <TextField
                 required
                 fullWidth
                  id="currentfoulspg"
                 label="Current Fouls Per Game"
                  name="currentfoulspg"
                 autoComplete="currentfoulspg"
                 onChange={e => onChange(e)}
               />
             </Grid>
<Grid item xs={12} sm={4}>
               <TextField
                 required
                 fullWidth
                  id="currentred"
                 label="Current Season Red Cards"
                  name="currentred"
                 autoComplete="currentred"
                 onChange={e => onChange(e)}
               />
             </Grid>
<Grid item xs={12} sm={4}>
               <TextField
                 required
                 fullWidth
                  id="totalpenpg"
                 label="Total Penalty Per Game"
                  name="totalpenpg"
                 autoComplete="totalpenpg"
                 onChange={e => onChange(e)}
               />
             </Grid>
<Grid item xs={12} sm={4}>
               <TextField
                 required
                 fullWidth
                  id="currentpenpg"
                 label="Current Penalty Per Game"
                  name="currentpenpg"
                 autoComplete="currentpenpg"
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
          </Box>
        </Box>
      </Container>  );
}
export default CreateReferee;
