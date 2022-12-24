import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserFinder from "../apis/UserFinder";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
 
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import SmallCard from "./SmallCard";
import RecAreaChart from "./RecAreaChart";
import MainCard from "./MainCard";

export const Recommendation = () => {
  const [infoText, setInfoText] = useState("");

  const [match, setMatch] = useState(null);
  const [isAvailable, setAvailable] = useState(true);

  const queryString = window.location.href;
  const id = queryString.match(/recommendation\/(\d+)/)[1];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await UserFinder.get(`/recommendation/${id}`);
        console.log(response)
         if (response.data.data.tensions) {
          setMatch((prevMatch) => response.data.data.tensions);
        } else {
          setMatch((prevMatch) => []);
        }
      } catch (err) {
        setAvailable(false);

        setMatch((prevMatch) => []);
      }
    }
    console.log("Ege", match)
    if (id) {
      fetchData();
    }
  }, [id]);
  if (!isAvailable) {
    return (
      <center>
        <Box m={30} pt={0}>
          {" "}
        </Box>
        <Typography variant="h3" color="#A99985" font fontWeight="600">
          Team not found.
        </Typography>
      </center>
    );
  } else {
    return match !== null ? (

      <Grid container rowSpacing={4.5} columnSpacing={2.75}>

      <Grid
        direction="row"
        justifyContent="center"
        alignItems="center"
        container
        spacing={1}
      >
        <Grid>
          <Card
          elevation = {0}
 
            sx={{ height: 200, width: 600, mt: 12 }}
            style={{ backgroundColor: "#F1EAE4",                     borderColor: "#EAE0D7",
            boxShadow:0 }}
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
                    alignItems="center"
                  >
                    <Grid item mt = {1}>
                    <img src={match[0].homelogo} height="135" width="105"
                        style={{display: "block", margin: "auto"}} />
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
                  <center> 
                  <Grid>
                    <Typography
                    variant="h5" font fontWeight="600"
                      sx={{ ml: 10, mr:10 }}
                      color="#A99985"
                      style={{ fontSize: 12 }}
                    >
                     {match[0].home}
                    </Typography>
                    <Typography
                    variant="h3" font fontWeight="600"
                      sx={{ ml: 10, mr:10 }}
                      color="#A99985"
                      style={{ fontSize: 12 }}
                    >
                     {"-"}
                    </Typography>
                    <Typography
                    variant="h3" font fontWeight="600"
                      sx={{ ml: 10, mr:10 }}
                      color="#A99985"
                      style={{ fontSize: 12 }}
                    >
                     {match[0].away}
                    </Typography>
                  </Grid></center>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >

                    <Grid item >
                    <img src={match[0].awaylogo} height="135" width="105"
                       style={{display: "block", margin: "auto"}} />
                    </Grid>
                    
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
 {/* row 3 */}
 
 <Grid item ml = {5} mt = {0} xs={12} sm={6} md={4} lg={3.8}>
        <SmallCard title={match[0].home + "'s Tension Score"} subtitle = {match[0].hometension.toFixed(2)}  value = {match[0].hometension.toFixed(2)}/>
    </Grid>
    <Grid item xs={12} mt = {0} sm={6} md={4} lg={3.8}>
    <SmallCard title={match[0].away + "'s Tension Score"} subtitle = {match[0].awaytension.toFixed(2)}  value = {match[0].awaytension.toFixed(2)}  />
    </Grid>
    <Grid item xs={12} mt = {0} sm={6} md={4} lg={3.8}>
    <SmallCard title="Match's Tension Score "   subtitle = {match[0].avg_tension_score.toFixed(2)}  value = {match[0].avg_tension_score.toFixed(2)} />
    </Grid>
    <Grid item ml = {5}  mr = {2.5} xs={12} md={12} lg={12}>
    <Card
          elevation = {0}
             style={{ backgroundColor: "#F1EAE4", borderColor: "#EAE0D7",
            boxShadow:0 }}
          >
  <CardHeader
  title= {<center><Typography variant="h5" color="#70798C" font fontWeight="600"> First Recommendation Criteria </Typography></center>}
    titleTypographyProps={{ align: 'center' }}
  />
  <CardContent align="center">
    <Typography variant="subtitle1"  color="#252323" font fontWeight="500"> Wingman's first recommendation taking into account the tension score. Based on the tension scores of {match[0].home} and {match[0].away}, the tension class of the match was determined as {match[0].tension_class}. The tension chart of the referees with {match[0].tension_class} is given below. After the tension score of the match is normalized, the referee's suggestion is made over the referee who has the lowest tension score difference with the match.</Typography>
  </CardContent>
</Card></Grid>

    <Grid  xs={12} mt = {3} md={0} lg={12}>
      <center>
        <Typography variant="h5" color="#A99985" font fontWeight="600">
           {match[0].tension_class} Tension Referees
            </Typography>
            </center>
      </Grid>

  
<Grid item ml = {5}  mr = {2.5} xs={12} md={12} lg={12}>

  <MainCard content={false} sx={{ mt: 1}}>
  <Box sx={{ pt: 1, pr: 2, ml:2}}>
      <RecAreaChart data={match} />
      </Box>
  </MainCard>
</Grid>
 
  </Grid>

    ) : null;
  }
};
export default Recommendation;
 

{/* <Grid item ml = {5}  mr = {2.5} xs={12} md={12} lg={12}>
    <Card
          elevation = {0}
             style={{ backgroundColor: "#F5F1ED", borderColor: "#EAE0D7",
            boxShadow:0 }}
          >
  <CardHeader
  title= {<center><Typography variant="h5" color="#A99985" font fontWeight="600"> Wingman's First Recommendation - {match[0].home} vs. {match[0].away} </Typography></center>}
    titleTypographyProps={{ align: 'center' }}
  />
  <CardContent align="center">
  <Avatar src={match.reduce((prev, curr) => prev.tensiondif < curr.tensiondif ? prev : curr).avatarurl}           	sx={{ width: 200, height: 200 }}/>
    <Typography variant="h5" mt ={2} color="#252323" font fontWeight="400">{match.reduce((prev, curr) => prev.tensiondif < curr.tensiondif ? prev : curr).ref_name}</Typography>
  </CardContent>
</Card></Grid> */}