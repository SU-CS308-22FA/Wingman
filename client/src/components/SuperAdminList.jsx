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
import { DataGrid, getGridNumericOperators  } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating'
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Avatar, CircularProgress } from "@mui/material";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["TFF Admin" ,"Reporter", "Retired Referee", "Super Admin"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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
    const [pageSize, setPageSize] = useState(10);
    const navigate = useNavigate();

    const fetcData = async () => {
      try {
      const response = await UserFinder.get("/users");
      console.log("res:",response);
      setUsersList(response.data.data.users)
      setLoading(false)
      } catch (err) {}
  };

    useEffect( () => {
        fetcData();
    }, []);

    const handelDelete = (id) => {
      try {
        const response = UserFinder.delete(`/users/${id}`,  { data: { id: "35" }})
        .then(fetcData)
      }
      catch(err){
        console.error('profile delete  error: ', err);
        }        
      };

        const columns = [
          { field: 'user_id', headerName: 'ID', width: 90, disableColumnMenu: true, 
          renderCell : (params) => {
            if(params.row.role == "Super Admin")
            {
              return(
                <Grid container spacing={2}>
                  <Grid item xs={2}><Typography sx={{ textAlign: 'Center', ml:1}}>{params.row.user_id}</Typography></Grid>
                  <Grid item xs={8}>
            <Avatar
              alt="Remy Sharp"
              src="https://thumbs.dreamstime.com/b/well-organized-fully-editable-antivirus-protection-security-icon-any-use-like-print-media-web-commercial-use-any-kind-158454387.jpg"
              sx={{ width: 25, height: 25 , ml:3}}
            /></Grid>
                </Grid>
                
              );
            }
            else if(params.row.role == "TFF Admin")
            {
              return(
                <Grid container spacing={2}>
                  <Grid item xs={2}><Typography sx={{ textAlign: 'Center', ml:1}}>{params.row.user_id}</Typography></Grid>
                  <Grid item xs={8}>
            <Avatar
              alt="Remy Sharp"
              src="https://mir-s3-cdn-cf.behance.net/projects/404/bf49ef66942191.Y3JvcCwxNTUzLDEyMTUsNDM0LDEzNA.png"
              sx={{ width: 25, height: 25 , ml:3}}
            /></Grid>
                </Grid>
                
              );
            }
            else
            {
              return(
                <Grid container spacing={2}>
                  <Grid item xs={2}><Typography sx={{ textAlign: 'Center', ml:1}}>{params.row.user_id}</Typography></Grid>
                  <Grid item xs={8}>
            <Avatar
              alt="Remy Sharp"
              src="https://cdn.xxl.thumbs.canstockphoto.com/soccer-referee-icon-soccer-referee-flat-circular-icon-on-a-green-playground-referee-tools-used-in-eps-vector_csp40662385.jpg"
              sx={{ width: 25, height: 25 , ml:3}}
            /></Grid>
                </Grid>
                
              );
            }
          
  
          }},
          {
            field: 'name',
            headerName: 'First name',
            width: 150,
            disableColumnMenu: true,
          },
          {
            field: 'surname',
            headerName: 'Last name',
            width: 150,
            disableColumnMenu: true
          },
          {
            field: 'mail',
            headerName: 'Email',
            width: 250,
            disableColumnMenu: true
          },
          {
            field: 'role',
            headerName: 'Role',
            disableColumnMenu: true,
            width: 200,
            disableColumnFilter : true,        
          },
          {headerName: 'Delete User', width: 120 ,
        disableColumnMenu: true,

        renderCell : (params) => {
          if(params.row.role != "Super Admin")
          {
            return(
              <Button
                variant = "contained"
                color = "alertRed"
                onClick={() => handelDelete(params.row.user_id)}
                >
                    Delete
                </Button>
            );
          }
          else{
            return(<div></div>);
          }
        

        }

        },
        ];
        
        let rows = usersList;
        const theme = useTheme();
      
        const [personName, setPersonName] = React.useState([]);
        console.log(personName)

        const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
      };
      
    

    return (
        <>
      <CssBaseline />
      {!isLoading
        ? 
        <Box sx={{ width: 700, height: 1000, width: '100%' }}>
          <Grid container spacing={2}>
  <Grid item xs={6}>
  <Typography
        variant="h5"
        component="h5"
        sx={{ textAlign: 'Left', mt: 5.5, ml: 34 }}
      >
        Manage Registered Users
      </Typography>
  </Grid>
  <Grid item xs={6}>
  <Container>
        <center>
      <div>
      <FormControl sx={{ mt: 4.5, mb:2, mr:15, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Role</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
        </center>
        </Container>
  </Grid>
  <Grid item xs={12}>
  <Container>
        <center>
      <Paper component={Box} width={1000} height={500}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.user_id}
        pageSize={20}
        disableColumnFilter 
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        filterModel={{
          items: [{ columnField: 'role', operatorValue: 'isAnyOf', value: personName }],
        }}
      />
        </Paper>
        </center>
        </Container>
  </Grid>
</Grid>
          
          
      

      
    </Box>
        : <div>
        <Box m={0} pt={34}> </Box>
        <center> <CircularProgress /></center>
      </div>
      }
        
      
      
      
      </>
  );

    
}