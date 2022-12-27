import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import UserFinder from "../apis/UserFinder";
import { UsersContext } from "../context/UserContex";



import {
    Box,
    Button,
    CardActionArea,
    CardActions,
    Divider,
    Grid,
  } from "@mui/material"




export const ActiveRefReportsCard = (reporter) => {
    const {user} = useContext(UsersContext);
    const [reports, setReports] = useState(null);


    

      const handleDelete = async (id) => {
        try {
            console.log("aadasd")
            const response = await UserFinder.delete(`/report/${reporter.report.report_id}`);
            console.log("res:", response);
          } catch (err) {
          }
          window.location.reload(false);
      };
      

  return (
    <Card sx={{ maxWidth: 5000 }}>
        <CardContent>
        <Grid container spacing={1}>
                <Grid item xs = {6}>
                <Typography variant="body2" color="text.secondary" >
                    Date: {reporter.report.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Time: {reporter.report.time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Match: {reporter.report.hometeamname} - {reporter.report.awayteamname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Event: {reporter.report.event_type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Actor: {reporter.report.event_text}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Report: {reporter.report.report}
                </Typography>
                <Button variant="outlined" onClick={handleDelete}>
                Delete
                </Button>
                </Grid>

                
            </Grid>
        </CardContent>

    </Card>

  )
}
