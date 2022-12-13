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
    totalmatches: NaN,
    totalyellowcards: NaN,
    totalredcards: NaN,
    age: NaN,
    currentseasonmatches: NaN,
    totalfoulspg : NaN,
    currentyel: NaN,
    currentred: NaN,
    currentfoulspg: NaN,
    totalpenpg:NaN,
    currentpenpg: NaN,

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
      if(name.length == 0 || surname.length == 0){
        throw{fmessage: "Name or surname cannot be empty. Please check the both fields."} }   
      else if(!isAlphabetical(name)){
        throw{fmessage: "Name contains non-alphabetical characters. Please check the name field."} }    
      else if(!isAlphabetical(surname)){
        throw{fmessage: "Surname contains non-alphabetical characters. Please check the name field."}}
      else if(age.length == null || totalmatches.length== null || totalyellowcards.length== null|| totalredcards.length== null || currentseasonmatches.length== null||
          currentyel.length== null||currentred.length== null || age.length == 0 || totalmatches.length== 0 || totalyellowcards.length== 0|| totalredcards.length== 0 || currentseasonmatches.length== 0||
          currentyel.length== 0||currentred.length== 0){
              throw{fmessage: "Statistics specifying net numbers must be filled. Please check if there any empty field."}}
      else if(!isInteger(age) || !isInteger(totalmatches) || !isInteger(totalredcards) || !isInteger(totalyellowcards) ||
              !isInteger(currentseasonmatches)|| !isInteger(currentyel)||  !isInteger(currentred)){
        throw{fmessage: "Statistics specifying net numbers must be integers."}}     
      else if(totalmatches.length != 0 && currentseasonmatches.length != 0 && parseInt(totalmatches)<parseInt(currentseasonmatches)){
          throw{fmessage: "Total number of matches cannot be smaller than current season matches. Please check the both fields."}}
      else if(totalredcards.length != 0 && currentred.length != 0 && parseInt(totalredcards)< parseInt(currentred)){
          throw{fmessage: "Total number of red cards cannot be smaller than current season red cards. Please check the both fields."}
        }
      else if(totalyellowcards.length != 0 && currentyel.length != 0 && parseInt(totalyellowcards)<parseInt(currentyel)){ 
            throw{fmessage: "Total number of yellow cards cannot be smaller than current season yellow cards. Please check the both fields."}}
      else if( totalfoulspg.length== null|| currentfoulspg.length== null ||totalpenpg.length== null||currentpenpg.length== null
       || totalfoulspg.length== 0 || currentfoulspg.length== 0 ||totalpenpg.length== 0 ||currentpenpg.length== 0){
            throw{fmessage: "Per game statistics must be filled. Please check if there any empty field."}}
      else if(!isNumeric(totalfoulspg)|| !isNumeric(currentfoulspg) || !isNumeric(totalpenpg)|| !isNumeric(currentpenpg)){
        throw{fmessage: "Per game statistics cannot include non numeric values."}}
      else if(name.length == 0 || surname.length == 0 || age.length == null || totalmatches.length== 0 || totalyellowcards.length== 0|| totalredcards.length== 0 || currentseasonmatches.length== 0||
                            totalfoulspg.length== null||currentyel.length== null||currentfoulspg.length== 0||currentred.length== 0||totalpenpg.length== 0||currentpenpg.length== 0
      ||  age.length == 0 || totalmatches.length== 0 || totalyellowcards.length== 0|| totalredcards.length== 0 || currentseasonmatches.length== 0||
      totalfoulspg.length== 0||currentyel.length== 0||currentfoulspg.length== 0||currentred.length== 0||totalpenpg.length== 0||currentpenpg.length== 0){
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
        currentyelpg: currentyel/currentseasonmatches,
        currentredpg: currentred/ currentseasonmatches,
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
            currentyelpg: response.data.data.currentyelpg,
            currentredpg : response.data.data.currentredpg,
            totalpenpg : response.data.data.totalpenpg,
            totalyelpg: response.data.data.totalyelpg,
            totalredpg: response.data.data.totalredpg,
            currentpenpg:response.data.data.currentpenpg,
            avatarurl:response.data.data.avatarurl
          } 

        
          setReferee(val)  
          navigate(`/referee/${val.id}`)}
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
              <Grid item xs={12} sm={4}>
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
              <Grid item xs={12} sm={4}>
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
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age (Net Number)"
                  name="age"
                  autoComplete="age"
                  onChange={e => onChange(e)}
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="totalmatches"
                  label="Total Matches (Net Number)"
                  name="totalmatches"
                  autoComplete={currentseasonmatches}
                  onChange={e => onChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
               <TextField
                 required
                 fullWidth
                  id="currentseasonmatches"
                 label="Current Season Matches (Net Number)"
                  name="currentseasonmatches"
                 autoComplete="currentseasonmatches"
                 onChange={e => onChange(e)}
               />
             </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="totalredcards"
                  label="Total Seasons Red Cards (Net Number)"
                  name="totalredcards"
                  autoComplete="totalredcards"
                  onChange={e => onChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
               <TextField
                 required
                 fullWidth
                  id="currentred"
                 label="Current Season Red Cards (Net Number)"
                  name="currentred"
                 autoComplete="currentred"
                 onChange={e => onChange(e)}
               />
             </Grid>

<Grid item xs={12} sm={4}>
               <TextField
                 required
                 fullWidth
                  id="totalyellowcards"
                 label="Total Seasons Yellow Cards (Net Number)"
                  name="totalyellowcards"
                 autoComplete="totalyellowcards"
                 onChange={e => onChange(e)}
               />
             </Grid>
             <Grid item xs={12} sm={4}>
               <TextField
                 required
                 fullWidth
                  id="currentyel"
                 label="Current Season Yellow Cards (Net Number)"
                  name="currentyel"
                 autoComplete="currentyel"
                 onChange={e => onChange(e)}
               />
             </Grid>

<Grid item xs={12} sm={4}>
               <TextField
                 required
                 fullWidth
                  id="totalfoulspg"
                 label="Total Seasons Fouls Per Game"
                  name="totalfoulspg"
                 autoComplete="totalfoulspg"
                 onChange={e => onChange(e)}
               />
             </Grid>

<Grid item xs={12} sm={4}>
               <TextField
                 required
                 fullWidth
                  id="currentfoulspg"
                 label="Current Season Fouls Per Game"
                  name="currentfoulspg"
                 autoComplete="currentfoulspg"
                 onChange={e => onChange(e)}
               />
             </Grid>


<Grid item xs={12} sm={4}>
               <TextField
                 required
                 fullWidth
                  id="totalpenpg"
                 label="Total Seasons Penalty Per Game"
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
                 label="Current Season Penalty Per Game"
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
