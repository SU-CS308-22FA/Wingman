import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserFinder from "../apis/UserFinder";
 import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import MainCard from "./MainCard";

import TeamAreaChart from "./TeamAreaChart.component";
import SmallCard from './SmallCard';
import BarChart from "./RefereeAreaChart";
import RefereeBarChart from "./RefereeAreaChart";

export const RefereeDashboard = () => {
  const [infoText, setInfoText] = useState('');

  const [referee, setReferee] = useState(null);
  const [isAvailable, setAvailable] = useState(true);
  const queryString = window.location.href;
  const id = queryString.match(/referee\/(\d+)/)[1];
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await UserFinder.get(`/referees/${id}`);
        if (response.data) {
          setReferee(prevReferee => response.data.data);
        } else {
          setReferee(prevReferee => []);
        }

      } catch (err) {
        setAvailable(false);
        setReferee(prevReferee => []);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);
  {console.log(referee)}
  if(!isAvailable)
  {
    return (
    <center>
                <Box m={30} pt={0}> </Box>
      <Typography variant="h3" color="#A99985" font fontWeight="600">
      Referee not found.
      </Typography></center>
    
    );
  }
  else{
  return (
    referee !== null  ? 
     <Grid container rowSpacing={4.5} columnSpacing={2.75}>

      <Grid item mt = {5} mr={2} xs={12} md={-3} lg={12}>
      <center>
      <Avatar
              src={referee.avatarurl}
          	sx={{ width: 200, height: 200 }}
 
            /></center>

      </Grid>
    {/* row 1 */}
    <Grid item mr={2} xs={3} md={0} lg={12}>
      <center>
        <Typography variant="h3" color="#A99985" font fontWeight="600">
                {referee.name} {referee.surname}
            </Typography>
            </center>
      </Grid>
    <Grid item ml = {4} mt = {0} xs={12} sm={6} md={1} lg={2.5}>
        <SmallCard title="Matches - 22/23" subtitle = {referee.currentseasonmatches}/>
    </Grid>
    <Grid item xs={12} mt = {0} sm={6} md={1} lg={2.5}>
        <SmallCard title="Yellow Cards - 22/23" subtitle = {referee.currentyel}/>
    </Grid>
    <Grid item xs={12} mt = {0} sm={6} md={1} lg={2.5}>
    <SmallCard title="Red Cards - 22/23 " subtitle = {referee.currentred}/>
    </Grid>
    <Grid item xs={12} mt = {0} sm={6} md={1} lg={2}>
    <SmallCard title="Tension Metric" subtitle={((((referee.currentred)/referee.currentseasonmatches)*4 + ((referee.currentyel)/referee.currentseasonmatches) * 1.25) * 10).toFixed(2)}  reftens={((((referee.currentred)/referee.currentseasonmatches)*4 + ((referee.currentyel)/referee.currentseasonmatches) * 1.25) * 10)}/>
    </Grid>
    <Grid item xs={12} mt = {0} sm={6} md={1} lg={2}>
    <SmallCard title="Rating" subtitle={(Number(referee.avg_rate) ===11) ? "No ratings for this referee." : Number(referee.avg_rate).toFixed(2)}/>
    
    </Grid>
    <Grid item xs={12} md={0} lg={12}>
      <center>
        <Typography variant="h5" color="#252323" font fontWeight="700">
                {"Referee Statistics"}
            </Typography>
            <Typography mr = {2} variant="h6" color="#335c67" font fontWeight="300" style={{display: 'inline-block'}}>
                {"● Current Season"}      
            </Typography>
            <Typography variant="h6" color="#9e2a2b" font fontWeight="300" style={{display: 'inline-block'}}>
                {"● All Seasons"}      
            </Typography>
            </center>
      </Grid>
    <Grid container>

    <Grid ml = {9} mr = {15} mt = {2}>
            <RefereeBarChart data={[[referee.currentfoulspg], [referee.totalfoulspg]]} opt = {["Fouls Per Game"]} xs={3} />
</Grid>
<Grid mr = {15} mt = {2}>
    <RefereeBarChart data={[[referee.currentpenpg], [referee.totalpenpg]]} opt = {["Penalties Per Game "]} xs={3} />

</Grid>
<Grid mr = {15} mt = {2} >
    <RefereeBarChart data={[[referee.currentyelpg], [referee.totalyelpg]]} opt = {["Yellow Cards Per Game"]} xs={3} />
</Grid>
<Grid mr = {9} mt = {2}>
    <RefereeBarChart data={[[referee.currentredpg], [referee.totalredpg]]} opt = {["Red Cards Per Game"]} xs={3} />
    </Grid>
    </Grid>
    <Grid item mr={2} xs={3} md={0} lg={12}>
      <center>
        <Typography variant="h5" color="#A99985" font fontWeight="600">
                Comparisons
            </Typography>
            </center>
      </Grid>
    <Grid item ml = {4} mt = {0} xs={12} sm={6} md={1} lg={2.75}>
        <SmallCard title="Fouls Per Game" subtitle = {((referee.currentfoulspg - referee.totalfoulspg) / ((referee.currentfoulspg + referee.totalfoulspg) / 2) * 100) >= 0 ?  ((referee.currentfoulspg - referee.totalfoulspg) / ((referee.currentfoulspg + referee.totalfoulspg) / 2) * 100).toFixed(2) + "%": (((referee.currentfoulspg - referee.totalfoulspg) / ((referee.currentfoulspg + referee.totalfoulspg) / 2) * 100) * -1).toFixed(2)+ "%"}
        percdif = {((referee.currentfoulspg - referee.totalfoulspg) / ((referee.currentfoulspg + referee.totalfoulspg) / 2) * 100) >= 0 ?  (((referee.currentfoulspg - referee.totalfoulspg) / ((referee.currentfoulspg + referee.totalfoulspg) / 2) * 100)).toFixed(2) : ((referee.currentfoulspg - referee.totalfoulspg) / ((referee.currentfoulspg + referee.totalfoulspg) / 2) * 100) * -1}/>
    </Grid>
    <Grid item xs={12} mt = {0} sm={6} md={1} lg={2.75}>
        <SmallCard title="Penalties Per Game" subtitle = {((referee.currentpenpg - referee.totalpenpg) / ((referee.currentpenpg + referee.totalpenpg) / 2) * 100) >= 0 ?  ((referee.currentpenpg - referee.totalpenpg) / ((referee.currentpenpg + referee.totalpenpg) / 2) * 100).toFixed(2)+ "%" : (((referee.currentpenpg - referee.totalpenpg) / ((referee.currentpenpg + referee.totalpenpg) / 2) * 100) * -1).toFixed(2)+ "%"}
        percdif = {((referee.currentpenpg - referee.totalpenpg) / ((referee.currentpenpg + referee.totalpenpg) / 2) * 100) >= 0 ?  (((referee.currentpenpg - referee.totalpenpg) / ((referee.currentpenpg + referee.totalpenpg) / 2) * 100)).toFixed(2) : ((referee.currentpenpg - referee.totalpenpg) / ((referee.currentpenpg + referee.totalpenpg) / 2) * 100) * -1}/>
    </Grid>
    <Grid item xs={12} mt = {0} sm={6} md={1} lg={3}>
    <SmallCard title="Yellow Cards Per Game" subtitle = {((referee.currentyelpg - referee.totalyelpg) / ((referee.currentyelpg + referee.totalyelpg) / 2) * 100) >= 0 ?  ((referee.currentyelpg - referee.totalyelpg) / ((referee.currentyelpg + referee.totalyelpg) / 2) * 100).toFixed(2)+ "%" : (((referee.currentyelpg - referee.totalyelpg) / ((referee.currentyelpg + referee.totalyelpg) / 2) * 100) * -1).toFixed(2)+ "%"}
        percdif = {((referee.currentyelpg - referee.totalyelpg) / ((referee.currentyelpg + referee.totalyelpg) / 2) * 100) >= 0 ?  (((referee.currentyelpg - referee.totalyelpg) / ((referee.currentyelpg + referee.totalyelpg) / 2) * 100)).toFixed(2) : ((referee.currentyelpg - referee.totalyelpg) / ((referee.currentyelpg + referee.totalyelpg) / 2) * 100) * -1}/>
    </Grid>
    <Grid item xs={12} mt = {0} sm={6} md={1} lg={3}>
    <SmallCard title="Red Cards Per Game" subtitle = {((referee.currentredpg - referee.totalredpg) / ((referee.currentredpg + referee.totalredpg) / 2) * 100) >= 0 ?  ((referee.currentredpg - referee.totalredpg) / ((referee.currentredpg + referee.totalredpg) / 2) * 100).toFixed(2)+ "%": (((referee.currentredpg - referee.totalredpg) / ((referee.currentredpg + referee.totalredpg) / 2) * 100) * -1).toFixed(2)+ "%"}
        percdif = {((referee.currentredpg - referee.totalredpg) / ((referee.currentredpg + referee.totalredpg) / 2) * 100) >= 0 ?  (((referee.currentredpg - referee.totalredpg) / ((referee.currentredpg + referee.totalredpg) / 2) * 100)).toFixed(2) : ((referee.currentredpg - referee.totalredpg) / ((referee.currentredpg + referee.totalredpg) / 2) * 100) * -1}/>
    </Grid>
    </Grid> : 
    null
  )
}
}
export default RefereeDashboard;