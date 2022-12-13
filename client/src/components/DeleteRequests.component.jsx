import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserFinder from "../apis/UserFinder";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TextField,
} from "@mui/material";
import { UsersContext } from "../context/UserContex";
import ReporterCard from "./ReporterCard.component";
import DeleteRequestCard from "./DeleteRequestCard.component";

export const DeleteRequestList = () => {
  const [isLoading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserFinder.get("/request");
        setLoading(false);
        setRequests(response.data.data.users);
      } catch (err) {}
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Box m={3} pt={0}>
        {" "}
      </Box>
      {requests.length > 0 && (
        <Grid container spacing={3}>
          {requests.map((request) => (
            <Grid item key={request.user_id} xs={6}>
              <DeleteRequestCard request={request} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
