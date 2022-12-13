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
import { Button, Paper } from "@mui/material";


export const RefereeList = () => {
    const  [isLoading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState(10);
    const  [referees, setReferees] = useState([]);
    const navigate = useNavigate();

    useEffect( () => {
        const fetcData = async () => {
            try {
            const response = await UserFinder.get("/referees");
            console.log("res:",response);
            setReferees(response.data.data.users)
            } catch (err) {}
        };

        fetcData();
    }, []);

    const handleRefereeSelect = (id) => {
        navigate(`/referee/${id}`);
      };

      const navigateCreate = () => {
        navigate("/addReferee");
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
          col: "name"
        },
        {
          value:  3,
          label: "Total Matches",
          col: "totalmatches"
        }
      ];
      const columns = [
        { field: 'id', headerName: 'refereeid', width: 90 ,
        disableColumnMenu: true,

        renderCell : (params) => {
        return(
            <Button
            variant = "contained"
            color = "secondary"
            onClick={() => handleRefereeSelect(params.row.id)}
            >
                {params.row.id}
            </Button>
        );

        }

        },
        {
          field: 'name',
          headerName: 'Name',
          width: 150,
          disableColumnMenu: true


        },
        {
            field: 'surname',
            headerName: 'Surname',
            width: 100,
            disableColumnMenu: true

          },
        {
            field: 'totalmatches',
            headerName: 'Matches',
            width: 100,
            disableColumnMenu: true

          },
          {
            field: 'age',
            headerName: 'Age',
            width: 100,
            disableColumnMenu: true

          },
          
          {
            field: 'currentseasonmatches',
            headerName: 'Matches This Season',
            width: 200,
            disableColumnMenu: true

          },
          


      ];
     
      const rows = referees;
   

   
 

  return (
      <>
    <CssBaseline />
    
      <Box
      sx={{
        height: 800,
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
        <Box m={6} pt={0}> </Box>
        <Button onClick={navigateCreate} color = 'secondary' variant="contained">CREATE REFEREE</Button>
    <Toolbar/>
      <Paper component={Box} width={750} height={800}>
    <DataGrid
      
      rows={rows}
      columns={columns}
      getRowId={(row) => row.id}
      pageSize={25}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      disableSelectionOnClick
      experimentalFeatures={{ newEditingApi: true }}
    />
        </Paper>
        </center>
        </Container>

  </Box>
    
       
    </>
);

 
}