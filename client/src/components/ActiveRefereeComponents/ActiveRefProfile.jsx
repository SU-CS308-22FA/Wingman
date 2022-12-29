import React, { useContext } from 'react'
import { useState } from 'react';
import { UsersContext } from '../../context/UserContex'
import { useEffect } from "react";
import UserFinder from "../../apis/UserFinder.js";
import { Avatar, Chip, CssBaseline, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import SmallCard from '../SmallCard';
import RankCard from '../rankCard';
import { Card, CardContent, CardHeader, Divider, Pagination, Stack } from "@mui/material";
import { Button, Paper } from "@mui/material";
import { DataGrid,gridClasses,GridToolbar  } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from "react-router-dom";








const ActiveRefProfile = ({}) => {
    const {user} = useContext(UsersContext);
    const [pageSize, setPageSize] = useState(10);
    const [referee, setReferee] = useState();
    const [maxWeek, setMaxWeek] = useState();
    const [matches, setMatches] = useState([]);
    const [totalMatchRank, setTotalMatchRank] = useState();

    const [assignedmatch, setAssignedMatch] = useState();

    const [match_rank, setMatch_rank] = useState();
    const [foulspg, setFoulspg] = useState();
    const [yelpg, setYelpg] = useState();
    const [redpg, setRedpg] = useState();
    const [penpg, setPenpg] = useState();

    const [isAssigned, setIsAssigned]  = useState();
    const navigate = useNavigate();

    const fetcData = async () => {
        try {
            const response = await UserFinder.get(`/activereferee/${user.id}`);
            console.log("res:",response);  
            const maxWeekRes = await UserFinder.get('/fixture')
            console.log("max:",maxWeekRes);
            setMaxWeek(maxWeekRes.data.data.max)
            const ref_mathces = await UserFinder.get(`/activematches/${user.id}`)
            console.log(ref_mathces)
            
            const ref_assigned_match = await UserFinder.get(`/activematch/${user.id}`)
            console.log("assigned", ref_assigned_match.data.data)
            setIsAssigned(ref_assigned_match.data.data)
            console.log(isAssigned)

            const match_rank = await UserFinder.get(`/rank/'currentseasonmatches'/${user.id}`)
            setMatch_rank(match_rank.data.data.rnk)

            const foul_rank = await UserFinder.get(`/rank/currentfoulspg/${user.id}`)
            setFoulspg(foul_rank.data.data.rnk)

            const yel_rank = await UserFinder.get(`/rank/currentyelpg/${user.id}`)
            setYelpg(yel_rank.data.data.rnk)

            const red_rank = await UserFinder.get(`/rank/currentredpg/${user.id}`)
            setRedpg(red_rank.data.data.rnk)

            const pen_rank = await UserFinder.get(`/rank/currentpenpg/${user.id}`)
            setPenpg(pen_rank.data.data.rnk)
            
            setReferee(response.data.data)
            setMatches(ref_mathces.data.data.users)
            setAssignedMatch(ref_assigned_match.data.data)
            }
        catch(err) {}
    }

    useEffect( () => {
        fetcData();
    }, []);

    const handleReportSelect = async (matchid) => {
        navigate(`/match/${matchid}`)
      };


    const columns = [
        { field: 'id', headerName: 'ASSIGN', width: 90 ,
        disableColumnMenu: true,filterable: false,

        renderCell : (params) => {
        return(
            <Button
            variant = "contained"
            color = "secondary"
            onClick={() => handleReportSelect(params.row.match_id)}
            >
                Report
            </Button>
        );

        }

        },

        {
            field: 'date',
            headerName: 'Date',
            width: 100,
            disableColumnMenu: true,
            filterable: true,
              
  
  
        },

        

        
        {
          field: 'hometeamname',
          headerName: 'Home',
          width: 100,
          disableColumnMenu: true,
          filterable: true,
            


        },
        {
            field: 'home_score',
            headerName: 'Home Score',
            width: 20,
            disableColumnMenu: true,
            filterable: true,
            

          },
        {
            field: 'away_score',
            headerName: 'Away Score',
            width: 20,
            disableColumnMenu: true,
            filterable: true,
            type: 'number',

          },
          {
            field: 'awayteamname',
            headerName: 'Away',
            width: 100,
            disableColumnMenu: true,
            filterable: true,
            type: 'number'

          },
          


      ];
     
      const rows = matches;
    if(isAssigned != undefined) {
        return (
            
            <CssBaseline>
                <center>
                <Typography variant="h3"
                    align="center"
                    color="#252323"
                    >
                        Welcome {user.name + " " + user.surname} </Typography>

                <Grid container spacing ={2} justifyContent="center">
                    <Grid item xs ={4} sm container> 
                        <Grid item xs container direction="column" spacing={4}>
                            <Grid item>
                            <Typography variant="h4"
                                align="center"
                                color="#252323"
                                >
                                    Overall Ranking and Stats </Typography>
                            </Grid>
                            <Grid item xs>
                                <RankCard title="Matches - 22/23" subtitle = {referee && referee.currentseasonmatches} refrank = {match_rank}/>
                            </Grid>
                            
                            <Grid item xs>
                                <RankCard title="Yellow Cards Per Game - 22/23" subtitle = {referee && referee.currentyelpg} refrank = {yelpg}/>
                            </Grid>
                            <Grid item xs>
                                <RankCard title="Red Cards Per Game - 22/23" subtitle = {referee && referee.currentredpg} refrank = {redpg}/>
                            </Grid>
                            <Grid item xs>
                                <RankCard title="Penalty Per Game - 22/23" subtitle = {referee && referee.currentpenpg} refrank = {penpg}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    <Grid item xs ={4}>
                        <Grid item xs container direction="column" spacing={4}> 
                            <Grid item>
                                <Avatar alt=""
                                        src={referee && referee.avatarurl}
                                        sx={{ width: 120, height: 160, mt: 4, ml:2 }}>

                                </Avatar>
                            </Grid>
                            <Grid item>
                            <Divider></Divider>
                            <Typography variant="h4"
                                align="center"
                                color="#252323"
                                >
                                    Upcoming Assigned Match </Typography>
                            </Grid>

                            <Grid item>
                            <Card sx={{ height: 200, width: 400, mt: 2 }}> 
                                <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                        <Avatar
                                        alt=""
                                        src={assignedmatch && assignedmatch.hometeamlogo}
                                        sx={{ width: 60, height: 80, mt: 1 }}/>
                                        <Typography>
                                        {assignedmatch && assignedmatch.hometeamname}
                                        </Typography>
                                        </Grid>
                                    </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                        <Grid item>
                                            <Typography sx = {{mt:3}}>
                                            {assignedmatch && assignedmatch.date}
                                            </Typography>
                                        </Grid>
                                        
                                        <Grid item>
                                            <Typography sx = {{mt:1}}>
                                            {assignedmatch && assignedmatch.time}
                                            </Typography>
                                        </Grid>
                                        
                                        
                                        </Grid>
                                    </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                        <Avatar
                                        alt=""
                                        src={assignedmatch && assignedmatch.awayteamlogo}
                                        sx={{ width: 70, height: 80, mt: 1 }}/>
                                        <Typography >
                                        {assignedmatch && assignedmatch.awayteamname}
                                        </Typography>
                                        </Grid>
                                    </Grid>
                                    </Grid>
                                </Grid>
                                </CardContent>
                            </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs ={4}> 
                        <Grid item xs container direction="column" spacing={4}>
                            <Grid item>
                            <Typography variant="h4"
                                align="center"
                                color="#252323"
                                >
                                    Past Matches </Typography>
                            </Grid>
                            <Grid item>
                            <Container>
                                <Toolbar/>
                                <Paper component={Box} width={450} height={500}>
                                <DataGrid
                                components={{
                                    Toolbar: GridToolbar,
                                }}
                                density = "compact"
                                rows={rows}
                                columns={columns}
                                getRowId={(row) => row.match_id}
                                pageSize={25}
                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                disableSelectionOnClick
                                experimentalFeatures={{ newEditingApi: true }}
                                />
                                    </Paper>
                                    
                            </Container>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                </center>
            </CssBaseline>
            
    )}

    else {
        return (
            <CssBaseline>
                <center>
                <Typography variant="h3"
                    align="center"
                    color="#252323"
                    >
                        Welcome {user.name + " " + user.surname} </Typography>

                <Grid container spacing ={2} justifyContent="center">
                    <Grid item xs ={4} sm container> 
                        <Grid item xs container direction="column" spacing={4}>
                            <Grid item>
                            <Typography variant="h4"
                                align="center"
                                color="#252323"
                                >
                                    Overall Ranking and Stats </Typography>
                            </Grid>
                            <Grid item xs>
                                <RankCard title="Matches - 22/23" subtitle = {referee && referee.currentseasonmatches} refrank = {match_rank}/>
                            </Grid>
                            
                            <Grid item xs>
                                <RankCard title="Yellow Cards Per Game - 22/23" subtitle = {referee && referee.currentyelpg} refrank = {yelpg}/>
                            </Grid>
                            <Grid item xs>
                                <RankCard title="Red Cards Per Game - 22/23" subtitle = {referee && referee.currentredpg} refrank = {redpg}/>
                            </Grid>
                            <Grid item xs>
                                <RankCard title="Penalty Per Game - 22/23" subtitle = {referee && referee.currentpenpg} refrank = {penpg}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    <Grid item xs ={4}>
                        <Grid item xs container direction="column" spacing={4}> 
                            <Grid item>
                                <Avatar alt=""
                                        src={referee && referee.avatarurl}
                                        sx={{ width: 120, height: 160, mt: 4, ml:2 }}>

                                </Avatar>
                            </Grid>
                            <Grid item>
                            <Divider></Divider>
                            <Typography variant="h4"
                                align="center"
                                color="#252323"
                                >
                                    No Upcoming Assigned Match </Typography>
                            </Grid>

                            
                        </Grid>
                    </Grid>
                    <Grid item xs ={4}> 
                        <Grid item xs container direction="column" spacing={4}>
                            <Grid item>
                            <Typography variant="h4"
                                align="center"
                                color="#252323"
                                >
                                    Past Matches </Typography>
                            </Grid>
                            <Grid item>
                            <Container>
                                <Toolbar/>
                                <Paper component={Box} width={450} height={500}>
                                <DataGrid
                                components={{
                                    Toolbar: GridToolbar,
                                }}
                                density = "compact"
                                rows={rows}
                                columns={columns}
                                getRowId={(row) => row.match_id}
                                pageSize={25}
                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                disableSelectionOnClick
                                experimentalFeatures={{ newEditingApi: true }}
                                />
                                    </Paper>
                                    
                            </Container>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                </center>
            </CssBaseline>
        )

    }
}

export default ActiveRefProfile