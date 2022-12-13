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
import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, TextField } from "@mui/material";
import { UsersContext } from "../context/UserContex";
import ReporterCard from "./ReporterCard.component";

export const ReporterList = () => {
    const  [isLoading, setLoading] = useState(true);
    const  [reporters, setReporters] = useState([]);

    useEffect( () => {
        const fetcData = async () => {
            try {
            const response = await UserFinder.get("/reporters");
            setReporters(response.data.data.users)
            setLoading(false)

            } catch (err) {}
        };

        fetcData();
    }, []);
    return (
        <Container>
            <Box m={3} pt={0}> </Box>
            <Grid container spacing={3}>
                {reporters.map( reporter => (
                    <Grid item key = {reporter.reporter_id} xs={4}>
                        <ReporterCard reporter = {reporter}/>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
