import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserFinder from "../apis/UserFinder";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid,gridClasses,GridToolbar  } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import { Button, Paper } from "@mui/material";
import { Card, CardContent, CardHeader, Divider } from '@mui/material';
import { Avatar, Chip } from '@mui/material';
import SmallCard from "./SmallCard";


export const AdminRefAssign = () => {
    const  [isLoading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState(10);
    const  [referees, setReferees] = useState([]);
    const  [match, setMatch] = useState();
    //const  [week, setWeek] = useState();
    const navigate = useNavigate();
    const queryString = window.location.href;
    const index = queryString.search("assign")
    const weekid = queryString.substring(index + 7)
    const indexslash = weekid.search("/")
    const id = weekid.substring(0,indexslash)

    const indexW = queryString.search("week")
    const wid = queryString.substring(indexW + 5)
    

    const fetcData = async () => {
      try {
      //const response = await UserFinder.get("/referees");
      //console.log("res:",response);
      const response = await UserFinder.get(`/referees/week/${wid}`);
      console.log("res:",response);
      const response2 = await UserFinder.get(`/assign/${id}`)
      console.log("res2:",response2);
      
      setReferees(response.data.data.users);
      setMatch(response2.data.data);
      } catch (err) {}
  };

    useEffect( () => {
        fetcData();
    }, []);

    const handleRefereeSelect = async (refid, matchid) => {
        const response = await UserFinder.patch(`/assign/${matchid}/${refid}/${wid}`);
        console.log("update:", response);
        fetcData();
      };
    
      const options = [
        { 
          value: 1,
          label: "Id",
          col: "id"
        },
        {
          value:  2,
          label: "Name",
          col: "name", showFilterPanel: true
        },
        {
          value:  3,
          label: "Total Matches",
          col: "totalmatches",filterable: true
        }
      ];
      const columns = [
        { field: 'id', headerName: 'ASSIGN', width: 90 ,
        disableColumnMenu: true,filterable: false,

        renderCell : (params) => {
        return(
            <Button
            variant = "contained"
            color = "secondary"
            onClick={() => handleRefereeSelect(params.row.id, id)}
            >
                Assign
            </Button>
        );

        }

        },
        {
          field: 'name',
          headerName: 'Name',
          width: 100,
          disableColumnMenu: true,
          filterable: true,
            


        },
        {
            field: 'surname',
            headerName: 'Surname',
            width: 100,
            disableColumnMenu: true,
            filterable: true,
            

          },
        {
            field: 'currentseasonmatches',
            headerName: 'Current Season Matches',
            width: 100,
            disableColumnMenu: true,
            filterable: true,
            type: 'number',

          },
          {
            field: 'currentfoulspg',
            headerName: 'Fouls Per game',
            width: 100,
            disableColumnMenu: true,
            filterable: true,
            type: 'number'

          },
          {
            field: 'currentyelpg',
            headerName: 'Yellow per game',
            width: 100,
            disableColumnMenu: true,
            filterable: true,
            type: 'number',

          },
          
          {
            field: 'currentredpg',
            headerName: 'Red per game',
            width: 100,
            disableColumnMenu: true,
            filterable: true,
            type: 'number',

          },
          {
            field: 'currentfoulsdivtackles',
            headerName: 'Fouls per Tackles',
            width: 100,
            disableColumnMenu: true,
            filterable: true,
            type: 'number',

          },
          {
            field: 'currentpenpg',
            headerName: 'Penalty Per game',
            width: 100,
            disableColumnMenu: true,
            filterable: true,
            type: 'number',

          },
          


      ];
     
      const rows = referees;
   

   
 

  return (
      <>
    <CssBaseline />
    <Grid container spacing={2}
                justifyContent="center"
                >
      <Grid item xs ={6}>          
      
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
      >
        
      </Typography>
      <left>
    <Container>
    <Toolbar/>
      <Paper component={Box} width={750} height={800}>
    <DataGrid
      components={{
        Toolbar: GridToolbar,
      }}
      density = "compact"
      rows={rows}
      columns={columns}
      getRowId={(row) => row.id}
      pageSize={25}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      disableSelectionOnClick
      experimentalFeatures={{ newEditingApi: true }}
    />
        </Paper>
        
        </Container>
        </left>
        </Grid> 
        <Grid item xs = {6}>
          <Container>
            
          <Card sx={{ height: 200, width: 700, mt: 11 }}  > 
        <CardContent>
          <Grid container spacing={14} >
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={4}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={match && match.hometeamlogo}
                  sx={{ width: 60, height: 80, mt: 1, ml: 5}}/>
                  <Typography sx ={{ml : 3.5}}>
                  {match && match.hometeamname}
                  </Typography>
                </Grid>
                
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={4}>
                <Grid item xs>
                  
                  <Grid item>
                    <Typography sx = {{mt: 2, ml: 3}}>
                    {match && match.date}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx = {{mt: 1, ml: 3}}>
                    {match && match.time}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx = {{mt:1, ml:3}}>
                      {match && match.name} {match && match.surname}
                    </Typography>
                  </Grid>
                  
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={4}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={match && match.awayteamlogo}
                  sx={{ width: 60, height: 80, mt: 1, ml:2 }} />
                  <Typography >
                  {match && match.awayteamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
                  <center>
                  
              <Typography variant="h3"
                  align="center"
                  color="#70798C"
                  gutterBottom sx ={{mt:4}}>
                Assigned Referee
              </Typography>
              <Avatar
              src= {match && match.avatarurl}
          	  sx={{ width: 200, height: 200,mt: 6  }}
 
            /></center>
                <Typography
                  variant="h3"
                  align="center"
                  color="#70798C"
                  gutterBottom
                >
                   {match && match.name} {match && match.surname}
                </Typography>
                <center>
                <Button size="medium" sx={{mt:5}}>
                    See System Recommendation
                    </Button>
                </center>
                
          </Container>
        </Grid>
  </Grid>
  
    
       
    </>
);

 
}