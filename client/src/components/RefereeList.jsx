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


export const RefereeList = () => {
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
    

    return (
        <>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
      <Table sx={{ minWidth: 100 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Referee ID</StyledTableCell>
            <StyledTableCell align="right">Profile</StyledTableCell>
            
            <StyledTableCell align="right">Referee Name</StyledTableCell>
            <StyledTableCell align="right">Referee surname</StyledTableCell>
            <StyledTableCell align="right">All Time Matches</StyledTableCell>
            <StyledTableCell align="right">This Season Matches</StyledTableCell>
           
            
          </TableRow>
        </TableHead>
        <TableBody>
          {referees.map((referee) => (
            <StyledTableRow key={referee.id}>
              <StyledTableCell component="th" scope="row">
                {referee.id}
              </StyledTableCell>
              <StyledTableCell align="center">
              <button
                      onClick={() => handleRefereeSelect(referee.id)}
                      className="btn"
                    >
                      {referee.name} {referee.surname}
                    </button>
                </StyledTableCell>
              
              <StyledTableCell align="right">{referee.name}</StyledTableCell>
              <StyledTableCell align="right">{referee.surname}</StyledTableCell>
              <StyledTableCell align="right">{referee.totalmatches}</StyledTableCell>
              <StyledTableCell align="right">{referee.totalmatches}</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

          </Container>
        </Box>
 
      </main>
      
      </>
  );

    
}