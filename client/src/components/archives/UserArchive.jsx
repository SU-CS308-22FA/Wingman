import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserFinder from "../../apis/UserFinder";
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
import { UsersContext } from "../../context/UserContex";
import ReporterCard from "../ReporterCard.component";
import DeleteRequestCard from "../DeleteRequestCard.component";
import UserArchiveCard from "./UserArchiveCard";

export const UserArchive = () => {
  const [isLoading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [rateList, setRateList] = useState([]);
  const [isUpdate, update] = useState(0);

  const fetcData = async () => {
    try {
      const response = await UserFinder.get("/usersarchive");
      console.log("res:", response);
      setUsersList(response.data.data.users);
      setRateList(response.data.data.ratings);
      setLoading(false);
    } catch (err) {}
  };

  useEffect(() => {
    fetcData();
  }, [isUpdate]);


  return (
    <Container>
      <Box m={3} pt={0}>
        {" "}
      </Box>
      {usersList.length > 0 && (
        <Grid container spacing={3}
        direction="column"
        justifyContent="center"
        alignItems="center" >
          {usersList.map((user) => (
            <Grid item key={user.user_id} xs={6}>
              <UserArchiveCard ratingList = {rateList} user={user} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
