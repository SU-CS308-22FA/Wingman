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

export const RefereeDashboard = () => {
  const [infoText, setInfoText] = useState('');

  const [referee, setReferee] = useState(null);
  
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
        setReferee(prevReferee => []);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);
  {console.log(referee)}

  return (
    referee !== null ? 
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
    <Grid item ml = {2} mt = {0} xs={12} sm={6} md={4} lg={2.5}>
        <SmallCard title="Total Number of Matches" subtitle = {referee.id}/>
    </Grid>
    <Grid item xs={12} mt = {0} sm={6} md={4} lg={3}>
        <SmallCard title="Total Number of Yellow Cards" subtitle = {referee.id}/>
    </Grid>
    <Grid item xs={12} mt = {0} sm={6} md={4} lg={3}>
    <SmallCard title="Total Number of Red Cards" subtitle = {referee.id}/>
    </Grid>
    <Grid item xs={12} mt = {0} sm={6} md={4} lg={3}>
    <SmallCard title="Tension Metric" subtitle={referee.id}/>
    
    </Grid>

    </Grid> : 
    null
  )
}

export default RefereeDashboard;