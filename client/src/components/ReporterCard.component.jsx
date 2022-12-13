import * as React from 'react';
import { useState } from "react";
import { useContext } from "react";
import UserFinder from "../apis/UserFinder";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions } from '@mui/material';
import { UsersContext } from "../context/UserContex";
import { useNavigate } from "react-router-dom";
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, TextField } from "@mui/material";


export default function ReporterCard(reporter, props) {
    const {user} = useContext(UsersContext)
    const  [reason, setReason] = useState("");
    const  [error, setError] = useState(null);
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
      
      const onChange = e =>
        setReason(e.target.value);

      const handleSend = async (requested_id) => {
        try {
            if(!isValidReason(reason))
              throw{fmessage: "You should provide a reason. Please fill the reason field."}
    
    
            const response = await UserFinder.post("/request", {
                requester_id: user.id, 
                requested_id: requested_id,
                reason: reason
            })
    
            if(response.status==200){
                setOpen(false);
                window.location.reload(false);
              }
            else
                throw{fmessage: "There was an unknown problem"}
        }
        catch(err){
            if(err.fmessage)
                setError(err.fmessage)
            else
                setError("There was an unknown problem")
                console.error('onSubmit form error: ', err);
          }  
      };
      const handleClose = () => {
        setOpen(false);
        setError(null)
      };

  return (
    <Card sx={{ maxWidth: 345 }}>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Button onClick={() => handleReporterSelect(reporter.reporter.user_id)}>{reporter.reporter.name} {reporter.reporter.surname} </Button>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Role: {reporter.reporter.role}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mail Address: {reporter.reporter.mail}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rate Count: {reporter.reporter.rate_count}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Average Rating: {reporter.reporter.average_rate}
          </Typography>
          <Box m={1} pt={0}> </Box>
          {reporter.reporter.is_reported === 0 ? (
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                Request to Delete
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Request to Delete</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    You are about to make a deletion request for {reporter.reporter.name} {reporter.reporter.surname}. In order to make a request, please explain us in detail why do you think this user makes inappropriate ratings.
                  </DialogContentText>
                  <TextField
                    margin="dense"
                    id="reason"
                    label="Reason"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => onChange(e)}
                  />
                </DialogContent>
                <Box m={1} pt={0}> </Box>
                {error &&<Alert variant="filled" severity="error"> {error} </Alert>}
                <DialogActions>
                  <Button onClick={() => handleSend(reporter.reporter.user_id)}>Send</Button>
                </DialogActions>
              </Dialog>
            </div>
            ) : (
                <Typography gutterBottom variant="h6" color="text.secondary">
                    Request Pending
                </Typography>
            )}
                  
        </CardContent>
    </Card>
  );
}