import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import UserFinder from "../apis/UserFinder";
import { UsersContext } from "../context/UserContex";
import DeleteRequestCard from './DeleteRequestCard.component';
import Container from "@mui/material/Container";



import {
    Box,
    Button,
    CardActionArea,
    CardActions,
    Divider,
    Grid,
  } from "@mui/material"
import { ActiveRefReportsCard } from './AcitiveRefReportsCard';
import { AdminReportsCard } from './AdminReportsCard';




export const AdminReports = () => {
    const {user} = useContext(UsersContext);
    const [reports, setReports] = useState(null);


    const fetcData = async () => {
        try {
          const response = await UserFinder.get(`/report`);
          console.log("res:", response);
          setReports(response.data.data.users)
        } catch (err) {
        }
      };
      
      useEffect(() => {
        fetcData();
      }, []);

      
      

  return (
    <Container>
      <Box m={3} pt={0}>
        {" "}
      </Box>
      {reports && (
        <Grid container spacing={3}>
          {reports.map((report) => (
            <Grid item key={reports.report_id} xs={12}>
              <AdminReportsCard report={report} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}
