import * as React from "react";
import { useState } from "react";
import { useContext } from "react";
import UserFinder from "../apis/UserFinder";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  Divider,
  Grid,
} from "@mui/material";
import { UsersContext } from "../context/UserContex";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TextField,
} from "@mui/material";

export default function DeleteRequestCard(reporter) {
  const { user } = useContext(UsersContext);
  const [reason, setReason] = useState("");
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleReporterSelect = (id) => {
    navigate(`/reporters/${id}`);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  function isValidReason(reason) {
    return reason.length !== 0;
  }

  const onChange = (e) => setReason(e.target.value);

  const handleReject = async (requested_id, requester_id) => {
    try {
      if (!isValidReason(reason))
        throw {
          fmessage:
            "You should provide a reason. Please fill the reason field.",
        };

      const response = await UserFinder.patch("/request", {
        requester_id: requester_id,
        requested_id: requested_id,
        reason: reason,
      });

      if (response.status == 200) {
        setOpen(false);
        window.location.reload(false);
      } else throw { fmessage: "There was an unknown problem" };
    } catch (err) {
      if (err.fmessage) setError(err.fmessage);
      else setError("There was an unknown problem");
      console.error("onSubmit form error: ", err);
    }
  };
  const handleAccept = async () => {
    try {
      const response = await UserFinder.put("/request", {
        requester_id: reporter.request.a_user_id,
        requested_id: reporter.request.user_id,
      });

      if (response.status == 200) {
        setOpen(false);
        window.location.reload(false);
      } else throw { fmessage: "There was an unknown problem" };
    } catch (err) {
      if (err.fmessage) setError(err.fmessage);
      else setError("There was an unknown problem");
      console.error("onSubmit form error: ", err);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setError(null);
  };
  return (
    <Card sx={{ maxWidth: 1000 }}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography gutterBottom variant="h5" component="div">
              <Button
                onClick={() => handleReporterSelect(reporter.request.user_id)}
              >
                {reporter.request.name} {reporter.request.surname}{" "}
              </Button>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Role: {reporter.request.role}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Mail Address: {reporter.request.mail}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Rate Count: {reporter.request.rate_count}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Average Rating: {reporter.request.average_rate}
            </Typography>
            <Box m={1} pt={0}></Box>
          </Grid>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mr: "-1px", bgcolor: "secondary.dark" }}
          />
          <Grid item xs={6}>
            <Typography gutterBottom variant="h5" component="div">
              <Button>
                {reporter.request.a_name} {reporter.request.a_surname}
              </Button>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Mail Address: {reporter.request.a_mail}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Reson Provided: {reporter.request.reason}
            </Typography>
            <Box m={1} pt={0}></Box>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <div>
              <Button variant="outlined" onClick={handleClickOpen}>
                Reject
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Reject the Request</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    You are about to reject a request made by{" "}
                    {reporter.request.a_name} {reporter.request.a_surname} about{" "}
                    {reporter.request.name} {reporter.request.surname}. In order
                    to reject a request, please explain the requester in detail
                    why do him/her request is rejected
                  </DialogContentText>
                  <TextField
                    margin="dense"
                    id="reason"
                    label="Reason"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => onChange(e)}
                  />
                </DialogContent>
                <Box m={1} pt={0}>
                  {" "}
                </Box>
                {error && (
                  <Alert variant="filled" severity="error">
                    {" "}
                    {error}{" "}
                  </Alert>
                )}
                <DialogActions>
                  <Button
                    onClick={() =>
                      handleReject(
                        reporter.request.user_id,
                        reporter.request.a_user_id
                      )
                    }
                  >
                    Send
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" onClick={handleAccept}>
              Accept
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
