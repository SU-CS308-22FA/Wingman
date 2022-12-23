import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send"
import Button from "@mui/material/Button";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UserFinder from "../../apis/UserFinder";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function UserArchiveCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isRecoverRequested, setRecover] = React.useState(false)
  const [exists, setExists] = React.useState(true)

  const fetcData = async () => {
    try {
      const response = await UserFinder.get(`/recoversend/${props.user.user_id}`);
      setRecover(true)
    } catch (err) {
      setRecover(false)
    }
  };

  React.useEffect(() => {
    fetcData();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function handleRecover() {
    UserFinder.get(`/recover/${props.user.user_id}`)
    setRecover(true)
  }
  function handleReRecover() {
    UserFinder.get(`/recovermail/${props.user.user_id}`)
    window.alert("Mail was successfully sent")
    setRecover(true)
  }
  function handlePermaDelete() {
    setOpen(true)
  }
  function handleCloseDialog(){
    setOpen(false);
  }
  async function handleCloseDialogDELETE(){
    await UserFinder.delete(`/recover/${props.user.user_id}`)
    window.alert("User was successfully deleted")
    setOpen(false);
    setExists(false)
  }

  function renderAvatar(role) {
    if (role == "TFF Admin") {
      return (
        <Avatar
          alt="Remy Sharp"
          src="https://mir-s3-cdn-cf.behance.net/projects/404/bf49ef66942191.Y3JvcCwxNTUzLDEyMTUsNDM0LDEzNA.png"
          sx={{ width: 100, height: 100 }}
        />
      );
    } else {
      return (
        <Avatar
          alt="Remy Sharp"
          src="https://cdn.xxl.thumbs.canstockphoto.com/soccer-referee-icon-soccer-referee-flat-circular-icon-on-a-green-playground-referee-tools-used-in-eps-vector_csp40662385.jpg"
          sx={{ width: 100, height: 100 }}
        />
      );
    }
  }
if(exists)
  {return (
    <div>
      <Dialog
          open={open}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Warning
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            {`You are about the permanently delete all the archived records for ${props.user.name + " " + props.user.surname}.\n
            This action is permanent and cannot be undone, are you sure?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialogDELETE}>Delete records</Button>
            <Button onClick={handleCloseDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
        {!isRecoverRequested? <Card sx={{ width: 700 }}>
        <CardContent>
          <Grid
            container spacing = {5}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item> {renderAvatar(props.user.role)} </Grid>
            <Grid item>
              <Typography>{"ID:   " + props.user.user_id}</Typography>
              <Typography>{"NAME: " + props.user.name + " " + props.user.surname}</Typography>
              <Typography>{"MAIL: " + props.user.mail}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
       <Grid container spacing={2}>
            <Grid item>
                <Button variant="contained" color="third" endIcon={<AdminPanelSettingsIcon />} onClick={handleRecover}>
                        Recover
                      </Button>
            </Grid >
                  <Grid item>
                      <Button color="error" variant="contained" endIcon={<DeleteForeverIcon />} onClick={handlePermaDelete}>
                        Delete Records
                      </Button>
                  </Grid >
       </Grid >
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
          { props.ratingList.filter(rating => rating.user_id === props.user.user_id).length === 0
            ? <Typography paragraph>No ratings for this user</Typography>
             :
             <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Referee</TableCell>
              <TableCell align="right">Match ID</TableCell>
              <TableCell align="right">Referee Name</TableCell>
              <TableCell align="right">Referee Surname</TableCell>
              <TableCell align="right">User Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
             {props.ratingList.filter(rating => rating.user_id === props.user.user_id).map((myRate) => (
              
              <TableRow
                key={myRate.user_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center"><Avatar
                    alt="Remy Sharp"
                    src={myRate.avatarurl}
                    sx={{ width: 35, height: 35}}
                  /></TableCell>
                <TableCell align="center">{myRate.match_id}</TableCell>
                <TableCell align="center">{myRate.name}</TableCell>
                <TableCell align="center">{myRate.surname}</TableCell>
                <TableCell align="center">{myRate.rate + "/10"}</TableCell>
              </TableRow>
            ))} </TableBody>
        </Table>}
           
            
          </CardContent>
        </Collapse>
      </Card>: <Card sx={{ width: 700 }}>
        <CardContent>
          <Grid
            container spacing = {5}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item> {renderAvatar(props.user.role)} </Grid>
            <Grid item>
              <Typography>{"ID:   " + props.user.user_id}</Typography>
              <Typography>{"NAME: " + props.user.name + " " + props.user.surname}</Typography>
              <Typography>{"MAIL: " + props.user.mail}</Typography>
              <Typography>Recover Request Pending</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
       <Grid container spacing={2}>
            <Grid item>
                <Button variant="contained" color="third" endIcon={<AdminPanelSettingsIcon />} onClick={handleReRecover}>
                        Resend Recover
                      </Button>
            </Grid >
                  <Grid item>
                      <Button color="error" variant="contained" endIcon={<DeleteForeverIcon />} onClick={handlePermaDelete}>
                        Delete Records
                      </Button>
                  </Grid >
       </Grid >
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
          { props.ratingList.filter(rating => rating.user_id === props.user.user_id).length === 0
            ? <Typography paragraph>No ratings for this user</Typography>
             :
             <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Referee</TableCell>
              <TableCell align="right">Match ID</TableCell>
              <TableCell align="right">Referee Name</TableCell>
              <TableCell align="right">Referee Surname</TableCell>
              <TableCell align="right">User Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
             {props.ratingList.filter(rating => rating.user_id === props.user.user_id).map((myRate) => (
              
              <TableRow
                key={myRate.user_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center"><Avatar
                    alt="Remy Sharp"
                    src={myRate.avatarurl}
                    sx={{ width: 35, height: 35}}
                  /></TableCell>
                <TableCell align="center">{myRate.match_id}</TableCell>
                <TableCell align="center">{myRate.name}</TableCell>
                <TableCell align="center">{myRate.surname}</TableCell>
                <TableCell align="center">{myRate.rate + "/10"}</TableCell>
              </TableRow>
            ))} </TableBody>
        </Table>}
           
            
          </CardContent>
        </Collapse>
      </Card>}
    </div>
  );}
  else
  {
    return(<div></div>)
  }
}
