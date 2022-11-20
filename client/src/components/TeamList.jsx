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
import { DataGrid,gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import { Button, CircularProgress, Paper } from "@mui/material";

export const TeamList = () => {
    const  [isLoading, setLoading] = useState(true);
    const  [teams, setTeams] = useState([]);
    const [pageSize, setPageSize] = useState(10);

    const navigate = useNavigate();

    useEffect( () => {
        const fetcData = async () => {
            try {
            const response = await UserFinder.get("/teams");
            console.log("res:",response);
            setTeams(response.data.data.users)
            setLoading(false)

            } catch (err) {}
        };

        fetcData();
    }, []);

    const handleTeamSelect = (id) => {
        navigate(`/teams/${id}`);
      };
    
      const columns = [
        { field: 'teamid', headerName: 'teamid', width: 90 ,
        disableColumnMenu: true,

        renderCell : (params) => {
        return(
            <Button
            variant = "contained"
            color = "secondary"
            onClick={() => handleTeamSelect(params.row.teamid)}
            >
                {params.row.teamid}
            </Button>
        );

        }

        },
        {
          field: 'teamname',
          headerName: 'Team name',
          width: 300,
          disableColumnMenu: true


        },
        {
            field: 'totalmatches',
            headerName: 'Matches',
            width: 100,
            disableColumnMenu: true

          },
          {
            field: 'totalyellowcards',
            headerName: 'Yellow Cards',
            width: 100,
            disableColumnMenu: true

          },
          {
            field: 'totalredcards',
            headerName: 'Red Cards',
            width: 100,
            disableColumnMenu: true

          },


      ];
     
      const rows = teams;
   

   
 

  return (
      <>
    <CssBaseline />
    {!isLoading
      ?
      <Box
      sx={{
        height: 1200,
        width: '100%',
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
      >
      </Typography>

    <Container>
        <center>
    <Toolbar/>
      <Paper component={Box} width={700} height={1160}>
    <DataGrid
      rows={rows}
      columns={columns}
      getRowId={(row) => row.teamid}
      pageSize={20}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      disableSelectionOnClick
      experimentalFeatures={{ newEditingApi: true }}
    />
        </Paper>
        </center>
        </Container>

  </Box>
      :       <div>
      <center> <CircularProgress /></center>
    </div>
    }
       
    </>
);

 
}

