import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
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
import SmallCard from "../SmallCard";
import CardReasonsCard from "./CardReasonCard.component";
import RedYellowCardCard from "./RedYellowCardCard.component";
import FoulCard from "./FoulCard.component";
import HoverRating from "./Rating.component";
import SendIcon from "@mui/icons-material/Send";

let timelineList = [
  {
    text: "Berk Akkol",
    matchTime: "12",
    eventType: "Yellow Card",
    eventSide: "Away",
  },
  { text: "Gol adam", matchTime: "23", eventType: "Goal", eventSide: "Home" },
  { text: "Gol adam", matchTime: "23", eventType: "Goal", eventSide: "Home" },
  { text: "Gol adam", matchTime: "23", eventType: "Goal", eventSide: "Home" },
  { text: "Gol adam", matchTime: "23", eventType: "Goal", eventSide: "Home" },
  {
    text: "Berk Akkol",
    matchTime: "90+2",
    eventType: "Red Card",
    eventSide: "Away",
  },
  {
    text: "Anil Koyuncu with Cemal Yilmaz",
    matchTime: "90+13",
    eventType: "Change",
    eventSide: "Home",
  },
];

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
    return "https://cdn.icon-icons.com/icons2/716/PNG/512/Goal_icon-icons.com_62267.png";
  }
}

export default function ReporterMatch() {
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
                <Typography sx={{ ml: 3 }}>HOME</Typography>
                <Avatar
                  alt="Remy Sharp"
                  src="https://upload.wikimedia.org/wikipedia/tr/8/86/Fenerbah%C3%A7e_SK.png?20221115185307"
                  sx={{ width: 100, height: 100, mt: 1 }}
                />
                <Typography sx={{ ml: 1.1 }}>Fenerbahçe</Typography>
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
                    1
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
                    2
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={1.2}>
                <Typography sx={{ ml: 3 }}>AWAY</Typography>
                <Avatar
                  alt="Remy Sharp"
                  src="https://upload.wikimedia.org/wikipedia/tr/2/22/Bergama_Belediyespor.png?20110720181143"
                  sx={{ width: 100, height: 100, mt: 1 }}
                />
                <Typography sx={{ width: 400 }}>
                  Bergama Belediye Spor
                </Typography>
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
        <Typography color="black" style={{ fontWeight: "bold", fontSize: 20 }}>
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
                <CardReasonsCard totalCardsDist={[1, 2, 3, 4, 5]} />
              </Grid>
              <Grid item>
                {" "}
                <RedYellowCardCard numRed="10" numYellow="2" />{" "}
              </Grid>
              <Grid item>
                <FoulCard numFoul="10" numFoulPerCard="20" />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item>
          <Timeline sx={{ width: 450 }}>
            {timelineList.map((item) => (
              <div
                key={
                  item.text + item.matchTime + item.eventType + item.eventSide
                }
              >
                {createTimelineItem(
                  item.text,
                  item.eventSide,
                  item.matchTime,
                  item.eventType
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
                <CardReasonsCard totalCardsDist={[1, 2, 3, 4, 5]} />
              </Grid>
              <Grid item>
                {" "}
                <RedYellowCardCard numRed="10" numYellow="2" />{" "}
              </Grid>
              <Grid item>
                <FoulCard numFoul="10" numFoulPerCard="20" />
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
        <Typography color="black" style={{ fontWeight: "bold", fontSize: 20 }}>
          Match Ends
        </Typography>
      </Grid>

      <Grid>
        <Card
          sx={{ height: 200, width: 800, mt: 4 }}
          style={{ backgroundColor: "#DAD2BC" }}
        >
          <CardContent>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Grid item>
                {" "}
                <Grid
                  sx={{ mt: 0.4 }}
                  container
                  spacing={2}
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://www.nereli.org/img/hakem/yasar-kemal-ugurlu.jpg"
                      sx={{ width: 100, height: 100 }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      color="black"
                      style={{ fontWeight: "bold", fontSize: 20 }}
                    >
                      Yasar Kemal Ugurlu
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <HoverRating />
              </Grid>
              <Grid item>
                <Button variant="contained" endIcon={<SendIcon />}>
                  Send
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
