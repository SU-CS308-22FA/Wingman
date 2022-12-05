import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Grid, Paper } from '@mui/material';
import { Container } from '@mui/system';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';


export default function ReporterMatch() {
  
  return (
    <Grid
  direction="row"
  justifyContent="center"
  alignItems="center"
  container spacing={1}
>
      <Grid>
        <Card sx={{ height: 170 ,width:  1200, mt: 4}} style={{backgroundColor: "#DAD2BC"}}>
          <CardContent>
            <Grid container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            sx={{mt: 2}}>
              <Grid item xs={2}>
                <Avatar alt="Remy Sharp"
          src="https://upload.wikimedia.org/wikipedia/tr/8/86/Fenerbah%C3%A7e_SK.png?20221115185307"
          sx={{ width: 100, height: 100 }} />
              </Grid>
              <Grid item xs={2}
  container
  direction="row"
  justifyContent="center"
  alignItems="center">
                <Grid><Typography color="#A99985" style={{ fontWeight: "bold", fontSize: 75}}>1</Typography></Grid>
                <Grid><Typography color="#A99985" style={{ fontSize: 75}}>:</Typography></Grid>
                <Grid><Typography sx={{ mr: 10 }} color="#A99985" style={{ fontWeight: "bold", fontSize: 75}}>1</Typography></Grid>
              </Grid>
              <Grid item xs={1.2}>
              <Avatar alt="Remy Sharp"
          src="https://upload.wikimedia.org/wikipedia/tr/8/86/Fenerbah%C3%A7e_SK.png?20221115185307"
          sx={{ width: 100, height: 100 }} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid sx={{ mt: 4 }} container
      justifyContent="center"
  alignItems="center"><Typography color="black" style={{ fontWeight: "bold", fontSize: 20}}>Match Start</Typography></Grid>
      <Grid>
        <Timeline sx={{width:  1200}}>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              <Avatar alt="Yellow Card"
          src="https://cdn-icons-png.flaticon.com/512/942/942046.png"
          sx={{ width: 45, height: 45 }}/>
            </TimelineDot>
            <Typography color="text.secondary">12'</Typography>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
            </Typography>
            <Typography sx={{ mt:2 }} >Eren Erdoğan</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ py: '12px', px: 2 }}
          ><Typography variant="h6" component="span">
          </Typography>
          <Typography sx={{ mt:2 }} >Eren Erdoğan -> Eren Erdoğan</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              <Avatar alt="Yellow Card"
          src="https://cdn1.iconfinder.com/data/icons/soccer-flat-color/64/Soccer_Flat_Color_soccer_football_sports_transfer_player-512.png"
          sx={{ width: 45, height: 45 }}/>
            </TimelineDot>
            <Typography color="text.secondary">12'</Typography>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
            </Typography>
            <Typography sx={{ mt:2 }} ></Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              <Avatar alt="Yellow Card"
          src="https://cdn1.iconfinder.com/data/icons/soccer-flat-color/64/Soccer_Flat_Color_soccer_football_sports_ball-512.png"
          sx={{ width: 45, height: 45 }}/>
            </TimelineDot>
            <Typography color="text.secondary">12'</Typography>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
            </Typography>
            <Typography sx={{ mt:2 }} >Eren Erdoğan</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            align="right"
            variant="body2"
            color="text.secondary"
          >
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              <Avatar alt="Yellow Card"
          src="https://cdn1.iconfinder.com/data/icons/soccer-flat-color/64/Soccer_Flat_Color_soccer_football_sports_punish_card-512.png"
          sx={{ width: 45, height: 45 }}/>
            </TimelineDot>
            <Typography color="text.secondary">12'</Typography>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
            </Typography>
            <Typography sx={{ mt:2 }} >Eren Erdoğan</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            variant="body2"
            color="text.secondary"
          >
            10:00 am
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary">
              <LaptopMacIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Code
            </Typography>
            <Typography>Because it&apos;s awesome!</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              <HotelIcon />
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Sleep
            </Typography>
            <Typography>Because you need rest</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
            <TimelineDot color="secondary">
              <RepeatIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Repeat
            </Typography>
            <Typography>Because this is the life you love!</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
      </Grid>
    </Grid>
  );
}