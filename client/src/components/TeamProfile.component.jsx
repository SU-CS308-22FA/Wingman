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

export const TeamProfile = () => {
  const [team, setTeam] = useState(null);
  
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
        setTeam(prevTeam => []);
      }
    }
  
    if (id) {
      fetchData();
    }
  }, [id]);
  return (
    team !== null ?  <Grid container rowSpacing={4.5} columnSpacing={2.75}>
    {/* row 1 */}
    <Grid item ml = {2} mt = {4} xs={12} sm={6} md={4} lg={2.5}>
        {console.log(team)}
        <SmallCard title="Team Name" subtitle = {team[0].teamname} />
    </Grid>
    <Grid item xs={12} mt = {4} sm={6} md={4} lg={3}>
        <SmallCard title="Total Number of Yellow Cards" subtitle = {team[0].totalyellowcards}/>
    </Grid>
    <Grid item xs={12} mt = {4} sm={6} md={4} lg={3}>
    <SmallCard title="Total Number of Red Cards" subtitle = {team[0].totalredcards}/>
    </Grid>
    <Grid item xs={12} mt = {4} sm={6} md={4} lg={3}>
    <SmallCard title="Tension Metric" subtitle={((((team[0].totalredcards)/team[0].totalmatches)*10 + ((team[0].totalyellowcards)/team[0].totalmatches) * 3) * 10).toFixed(2)} value = {((((team[0].totalredcards)/team[0].totalmatches)*10 + ((team[0].totalyellowcards)/team[0].totalmatches) * 3) * 10)}/>
    </Grid>

    <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

    {/* row 2 */}

    <Grid item ml = {2}  mr = {2} xs={12} md={12} lg={12}>
  

        <MainCard content={false} sx={{ mt: 1}}>
        <Box sx={{ pt: 1, pr: 2, ml:2}}>
            <TeamAreaChart data={team} />
            </Box>
        </MainCard>
    </Grid>

</Grid> : null
  )
}

export default TeamProfile;