import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { UsersContext } from "../context/UserContex";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";
import SmallCard from "./SmallCard";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import CardReasonsCard from "./RatingComponents/CardReasonCard.component";
import RedYellowCardCard from "./RatingComponents/RedYellowCardCard.component";
import FoulCard from "./RatingComponents/FoulCard.component";
import HoverRating from "./RatingComponents/Rating.component";
import SendIcon from "@mui/icons-material/Send";
import UserFinder from "../apis/UserFinder.js";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';






function createTimelineItem(text, eventSide, matchTime, eventType) {
  let homeText;
  let awayText;
  if (eventSide == "Home") {
    homeText = text;
    awayText = "";
  } else {
    homeText = "";
    awayText = text;
  }
  let eventIconSrc = getIconSrcFromType(eventType);
  return (
    <TimelineItem>
      <TimelineOppositeContent sx={{ py: "12px", px: 2 }}>
        <Typography variant="h6" component="span"></Typography>
        <Typography sx={{ mt: 2 }}>{homeText}</Typography>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot>
          <Avatar
            alt="Yellow Card"
            src={eventIconSrc}
            sx={{ width: 40, height: 40 }}
          />
        </TimelineDot>
        <Typography style={{ fontSize: 15 }} color="text.secondary">
          {matchTime}'
        </Typography>
        <Typography
          style={{ fontSize: 10, fontWeight: "bold" }}
          color="text.secondary"
        >
          |
        </Typography>
      </TimelineSeparator>
      <TimelineContent sx={{ py: "12px", px: 2 }}>
        <Typography variant="h6" component="span"></Typography>
        <Typography sx={{ mt: 2 }}>{awayText}</Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

function getIconSrcFromType(eventType) {
  if (eventType == "Yellow Card") {
    return "https://cdn-icons-png.flaticon.com/512/942/942046.png";
  } else if (eventType == "Red Card") {
    return "https://cdn1.iconfinder.com/data/icons/soccer-flat-color/64/Soccer_Flat_Color_soccer_football_sports_punish_card-512.png";
  } else if (eventType == "Change") {
    return "https://cdn1.iconfinder.com/data/icons/soccer-flat-color/64/Soccer_Flat_Color_soccer_football_sports_transfer_player-512.png";
  } else if (eventType == "Goal") {
    return "https://cdn-icons-png.flaticon.com/512/1801/1801248.png";
  }
}

export default function ActiveRefereeMatch() {
  const [matchData, setMatchData] = useState({is_played:false});
  const [isLoading, setLoading] = useState(true);
  const [isAvalible, setAvalible] = useState(true);
  const [hasRated, setRated] = useState(true);
  const [timeline, settimeline] = useState([]);
  const {user} = useContext(UsersContext)
  const [value, setValue] = React.useState(5);
  const [hover, setHover] = React.useState(5);

  const [dropdown, setDropdown] = useState('');
  const [report, setReport] = useState('');
  const [error, setError] = useState();
  const handleChange = (event: SelectChangeEvent) => {
    setDropdown(event.target.value);
  };


  const onReportChange = (e) => setReport(e.target.value);

  const sendReport = async () => {
    try {
      if(report == '') {
        throw{fmessage: "The report cannot be empty"}
      }

      else if(dropdown == '') {
        throw{fmessage: "You should choose an action"}
      }

      const response = await UserFinder.post(`/report/${user.id}/${dropdown}/${report}`);
      setReport('');
    }

    
    catch(err) {
        console.log(err)
        setError(err.fmessage);
    }
  };


  const navigate = useNavigate();

  let id;

  const fetcData = async () => {
    try {
      const response = await UserFinder.get(`/match/${id}`);
      console.log("res", response)
      console.log(user)
      await setMatchData(response.data.data);
      let timeline = (response.data.timeline);
      const goals = timeline.filter(event => event.event_type === "Goal" && event.event_side === "Home");
      const homet = timeline.filter(event => event.event_side === "Home");
      const totalGoalshome = goals.length;
      if(totalGoalshome < response.data.data.home_score)
      {
        await timeline.push({event_side: "Home", event_text: homet[0].event_text, event_time: "94", event_type: "Goal"})
      }
      const goals2 = timeline.filter(event => event.event_type === "Goal" && event.event_side === "Away");
      const totalGoalsaway = goals2.length;
      const awayt = timeline.filter(event => event.event_side === "Away");
      if(totalGoalsaway < response.data.data.away_score)
      {
        await timeline.push({event_side: "Away", event_text: awayt[0].event_text, event_time: "95", event_type: "Goal"})
      }
      await settimeline(timeline)
    } catch (err) {
      setAvalible(false);
    }
  };

  

  

  useEffect(() => {
    const queryString = window.location.href;
    id = queryString.match(/match\/(\d+)/)[1];
    let response = UserFinder.get(`/rate/?uid=${user.id}&mid=${id}`)
  .then(function(response) {
    if(response.status != 200) {
      setRated(true)
    }
  })
  .catch(function(error) {
    // Handle the error
    setRated(false)
  });
    
    fetcData().then(result => {
      setLoading(false);
    });;
  }, []);

  if(!isAvalible)
  {
    return (<h1>Match not avalible...</h1>);
  }
  else
  {
    if (!isLoading) {
      if(matchData.is_played == false)
      {
        return (<h1>Match not played...</h1>);
      }
      else if (matchData.name != user.name || matchData.surname != user.surname) {
        return(<h1>You can not report on this match</h1>)
      }
      else
      {
        return (
          <Grid
            direction="row"
            justifyContent="center"
            alignItems="center"
            container
            spacing={1}
          >
            <Grid>
              <Card
                sx={{ height: 200, width: 1200, mt: 4 }}
                style={{ backgroundColor: "#DAD2BC" }}
              >
                <CardContent>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    sx={{ mt: 2 }}
                  >
                    <Grid item xs={2}>
                      <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center">
                        <Grid item><Typography>HOME</Typography></Grid>
                        <Grid item>
                          <Avatar
                            src={matchData.home_logo}
                            sx={{ width: 100, height: 100}}
                          />
                        </Grid>
                        <Grid item>
                          <Typography>
                            {matchData.home_teamname}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Grid>
                        <Typography
                          color="#A99985"
                          style={{ fontWeight: "bold", fontSize: 75 }}
                        >
                          {matchData.home_score}
                        </Typography>
                      </Grid>
                      <Grid>
                        <Typography color="#A99985" style={{ fontSize: 75 }}>
                          :
                        </Typography>
                      </Grid>
                      <Grid>
                        <Typography
                          sx={{ mr: 10 }}
                          color="#A99985"
                          style={{ fontWeight: "bold", fontSize: 75 }}
                        >
                          {matchData.away_score}
                        </Typography>
                      </Grid>
                      <Grid>
                          <Typography sx={{mr:10}} color="#A99985" style={{ fontSize: 12 }}>
                            {matchData.name + " " + matchData.surname}
                          </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                    <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center">
                        <Grid item><Typography>AWAY</Typography></Grid>
                        <Grid item>
                          <Avatar
                            src={matchData.away_logo}
                            sx={{ width: 100, height: 100}}
                          />
                        </Grid>
                        <Grid item>
                          <Typography>
                            {matchData.away_teamname}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              sx={{ mt: 4 }}
              container
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                color="black"
                style={{ fontWeight: "bold", fontSize: 20 }}
              >
                Match Starts
              </Typography>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <Box sx={{ ml: 12 }}>
                  <Grid
                    container
                    spacing={4}
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <CardReasonsCard totalCardsDist={[matchData.home_total_cards, matchData.home_foul_cards, matchData.home_unprofessional_cards, matchData.home_dive_cards, matchData.home_other_cards]} />
                    </Grid>
                    <Grid item>
                      {" "}
                      <RedYellowCardCard numRed={matchData.home_red_cards} numYellow={matchData.home_yellow_cards} />{" "}
                    </Grid>
                    <Grid item>
                      <FoulCard numFoul={matchData.home_fouls} numFoulPerCard={matchData.home_total_cards / matchData.home_fouls * 100} />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item>
                <Timeline sx={{ width: 450 }}>
                  {timeline.map((item) => (
                    <div
                      key={
                        item.event_id
                      }
                    >
                      {createTimelineItem(
                        item.event_text,
                        item.event_side,
                        item.event_time,
                        item.event_type
                      )}
                    </div>
                  ))}
                </Timeline>
              </Grid>
              <Grid item>
                <Box sx={{ mr: 12 }}>
                  <Grid
                    container
                    spacing={4}
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                     <Grid item>
                      <CardReasonsCard totalCardsDist={[matchData.away_total_cards, matchData.away_foul_cards, matchData.away_unprofessional_cards, matchData.away_dive_cards, matchData.away_other_cards]} />
                    </Grid>
                    <Grid item>
                      {" "}
                      <RedYellowCardCard numRed={matchData.away_red_cards} numYellow={matchData.away_yellow_cards} />{" "}
                    </Grid>
                    <Grid item>
                      <FoulCard numFoul={matchData.away_fouls} numFoulPerCard={matchData.away_total_cards / matchData.away_fouls * 100} />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Grid
              sx={{ mt: 0 }}
              container
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                color="black"
                style={{ fontWeight: "bold", fontSize: 20 }}
              >
                Match Ends
              </Typography>
            </Grid>
            <Grid item xs container direction="column" spacing={4} >
              <Grid item >
              <FormControl variant="standard" sx={{ m: 1, ml: 62, minWidth: 600 }} >
                <InputLabel id="demo-simple-select-label">Action</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={dropdown}
                  label="report"
                  onChange={handleChange}
                >
                  {timeline.map((item) => (
                    <MenuItem value={item.timeline_id}>{item.event_type}{item.event_text} {item.event_time}</MenuItem>
                  ))}
                  
                  
                </Select>
              </FormControl>
              </Grid>

              <Grid item>
                <TextField fullWidth label="Report" id="fullWidth" value={report} onChange ={onReportChange}/>
              </Grid>
                <center>
              <Grid sx = {{my: 2}}>
                <Button variant="outlined" onClick={sendReport}>
                Send
                </Button>
                <Box m={1} pt={0}> </Box>
                {error &&<Alert variant="filled" severity="error" sx={{ml : 5}}> {error} </Alert>}
              </Grid>
              </center>
    
              </Grid>
          </Grid>
        );
      }
      
    } else {
      return (<h1>Loading...</h1>);
    }
  }

  
}