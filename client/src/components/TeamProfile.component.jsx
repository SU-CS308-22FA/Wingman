import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserFinder from "../apis/UserFinder";
import { DataGrid,gridClasses } from '@mui/x-data-grid';

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

export const TeamProfile = () => {
  const [infoText, setInfoText] = useState('');

  const [team, setTeam] = useState(null);
  const [isAvailable, setAvailable] = useState(true);

  const queryString = window.location.href;
  const id = queryString.match(/teams\/(\d+)/)[1];
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await UserFinder.get(`/teams/${id}`);
        if (response.data.data.data) {
          setTeam(prevTeam => response.data.data.data);
        } else {
          setTeam(prevTeam => []);
        }
      } catch (err) {
        setAvailable(false);

        setTeam(prevTeam => []);
      }
    }
  
    if (id) {
      fetchData();
    }
  }, [id]);
  if(!isAvailable)
  {
    return (
    <center>
                <Box m={30} pt={0}> </Box>
      <Typography variant="h3" color="#A99985" font fontWeight="600">
      Team not found.
      </Typography></center>
    
    );
  }
  else{
  return (
    team !== null ? 
     <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item mt = {5} mr={2} xs={12} md={-3} lg={12}>
        <img src={team[0].teamlogo} height="181" width="139"
            style={{display: "block", margin: "auto"}} />
      </Grid>

    {/* row 1 */}
    <Grid item mr={2} xs={3} md={0} lg={12}>
      <center>
        <Typography variant="h3" color="#A99985" font fontWeight="600">
                {team[0].teamname}
            </Typography>
            </center>
      </Grid>
    <Grid item ml = {2} mt = {0} xs={12} sm={6} md={4} lg={2.5}>
        {console.log(team)}
        <SmallCard title="Total Number of Matches" subtitle = {team[0].totalmatches}/>
    </Grid>
    <Grid item xs={12} mt = {0} sm={6} md={4} lg={3}>
        <SmallCard title="Total Number of Yellow Cards" subtitle = {team[0].totalyellowcards}/>
    </Grid>
    <Grid item xs={12} mt = {0} sm={6} md={4} lg={3}>
    <SmallCard title="Total Number of Red Cards" subtitle = {team[0].totalredcards}/>
    </Grid>
    <Grid item xs={12} mt = {0} sm={6} md={4} lg={3}>
    <SmallCard title="Tension Metric" subtitle={((((team[0].totalredcards)/team[0].totalmatches)*10 + ((team[0].totalyellowcards)/team[0].totalmatches) * 3) * 10).toFixed(2)} value = {((((team[0].totalredcards)/team[0].totalmatches)*10 + ((team[0].totalyellowcards)/team[0].totalmatches) * 3) * 10)}/>
    
    </Grid>

    <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

    {/* row 2 */}
    <Grid item xs={12} md={0} lg={12}>
      <center>
        <Typography variant="h5" color="#70798C" font fontWeight="500">
                {"Referee Statistics"}
            </Typography>
            </center>
      </Grid>

    <Grid item ml = {2}  mr = {2} xs={12} md={12} lg={12}>
  

        <MainCard content={false} sx={{ mt: 1}}>
        <Box sx={{ pt: 1, pr: 2, ml:2}}>
            <TeamAreaChart data={team} />
            </Box>
        </MainCard>
    </Grid>
    <Grid item ml = {2}  mr = {2} xs={12} md={12} lg={12}>
  </Grid>
  <Grid  xs={12} md={0} lg={12}>
      <center>
        <Typography variant="h5" color="#B3B5BD" font fontWeight="500">
                {"Stat Overview"}
            </Typography>
            </center>
      </Grid>
      {/* row 3 */}
    
      <Grid item ml = {2} mt = {0} xs={12} sm={6} md={4} lg={2.5}>
        <SmallCard title="Max Total Matches" subtitle = {team.reduce((max, item) => (item.tm > max.tm ? item : max)).ref_name} />
    </Grid>
    <Grid item xs={12} mt = {0} sm={6} md={4} lg={3}>
    <SmallCard title="Max Red Cards" subtitle = {team.reduce((max, item) => (item.rc > max.rc ? item : max)).ref_name} />
    </Grid>
    <Grid item xs={12} mt = {0} sm={6} md={4} lg={3}>
    <SmallCard title="Max Yellow Per Matches" subtitle = {team.reduce((max, item) => (item.ypm > max.ypm ? item : max)).ref_name}/>
    </Grid>
    <Grid item xs={12} mt = {0} sm={6} md={4} lg={3}>
    <SmallCard title="Max Foul Per Matches " subtitle = {team.reduce((max, item) => (item.fpm > max.fpm ? item : max)).ref_name}/>
    </Grid>

    <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />


</Grid> : null
  )
}
}
export default TeamProfile;