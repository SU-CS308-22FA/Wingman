import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserFinder from "../apis/UserFinder";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
 
 
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


export const SuperAdminList = () => {
    const  [usersList, setUsersList] = useState([]);
    const  [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect( () => {
        const fetcData = async () => {
            try {
            const response = await UserFinder.get("/users");
            console.log("res:",response);
            setUsersList(response.data.data.users)
            setLoading(false)
            } catch (err) {}
        };

        fetcData();
    }, []);

    const handleRefereeSelect = (id) => {
        //navigate(`/referee/${id}`);
      };

        const columns = [
          { field: 'user_id', headerName: 'ID', width: 90 },
          {
            field: 'name',
            headerName: 'First name',
            width: 150,
            disableColumnMenu: true,
            sortable: true
          },
          {
            field: 'surname',
            headerName: 'Last name',
            width: 150,
          },
          {
            field: 'role',
            headerName: 'Role',
            width: 200,
            disableColumnFilter : false,
          },
        ];
        
        const rows = usersList;
      

      
    

    return (
        <>
      <CssBaseline />
      {!isLoading
        ? 
        <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.user_id}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        filterModel={{
          items: [{ columnField: "role", operatorValue: "isAnyOf", value: ["TFF Admin" ,"Reporter", "Retired Referee"] }],
      }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
        : <h1> Loading </h1>
      }
        
      
      
      
      </>
  );

    
}