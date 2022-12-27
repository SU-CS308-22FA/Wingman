import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserFinder from "../apis/UserFinder";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid,gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import { Avatar, Button, CircularProgress, Paper } from "@mui/material";
export const RefRank = () => {
    const  [isLoading, setLoading] = useState(true);
    const  [rank, setRank] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const queryString = window.location.href;
    const id = queryString.match(/rankings\/(\d+)/)[1];
  
    const navigate = useNavigate();

    useEffect( () => {
        const fetcData = async () => {
            try {
            const response = await UserFinder.get(`/rank/${id}`);
            setRank(response.data.data.data)
            setLoading(false)

            } catch (err) {}
        };

        fetcData();
    }, []);
    console.log(rank)

  const columns = [
    { field: 'rank', headerName: 'Ranking', width: 80 ,        sortable: false,

    disableColumnMenu: true,

    renderCell : (params) => {
        return(
          <Button
            size="small"
            variant="rounded"
            style={{ width: 45, height: 45 }}
          >
            {params.row.rank}
          </Button>
        );
      }
      

    },
    { field: 'avatarurl', headerName: '', width: 60 ,        sortable: false,
    disableColumnMenu: true,

    renderCell: (params) => {
        return (
            <Avatar src={params.row.avatarurl}           	sx={{ width: 45, height: 45 }}/>
        )
        }

    },
    
    {
      field: 'refname',
      headerName: 'Referee',
      sortable: false,

      width: 150,
      disableColumnMenu: true


    },
 
    {
        field: 'avg',
        headerName: 'Rating',
        width: 200,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => {
          return (
            <Rating
                name="read-only"
                          value={params.row.avg}
              precision={1}
              size="small"
              allowHalf={false}
              max={10}
              defaultValue={5}
              readOnly
            />
          );
        }
      },

      {
        field: 'avg2',
        headerName: 'Net Rating',
        sortable: false,
        width: 90,
        disableColumnMenu: true,
      },

      {
        field: 'matchname',
        headerName: 'Match',
        sortable: false,
        width: 250,
        disableColumnMenu: true,
      }
    ];
  const rows = rank;
    if (rank.length == 9){
    return (
        <>
     <CssBaseline />
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
        <Paper component={Box} width={850} height={600}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnMenu
        getRowId={(row) => row.rank}
        pageSize={20}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
          </Paper>
          </center>
          </Container>
  
    </Box>  
      </>
  ) 
}
}

 

