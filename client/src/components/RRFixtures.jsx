import { Grid } from "@mui/material";
import { Card, CardContent, CardHeader, Divider, Avatar, Pagination, Stack } from "@mui/material";
import { Navigate } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import matchCard from "../components/matchCard";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import UserFinder from "../apis/UserFinder";
const RRFixtures = ({}) => {
  const [isLoading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [matches, setMacthes] = useState(null);
  const [maxWeek, setMaxWeek] = useState();

  const navigate = useNavigate();
  const queryString = window.location.href;
  const index = queryString.search("fixture")
  const week = queryString.substring(index + 8)
  
  const handleAssign = (id) => {
    navigate(`/assign/${id}`);
  };
  const handleRate = (id) => {
    navigate(`/rate/${id}`);
  };

  const handleChange = (week) => {
    navigate(`/fixture/${week}`);
    fetcData(week);
  };

  const fetcData = async (week) => {
    try {
      const response = await UserFinder.get(`/fixture/${week}`);
      const maxWeekRes = await UserFinder.get('/fixture')
      console.log("max:", maxWeekRes);
      console.log("res:", response);
      setMacthes(response.data.data.users);
      setMaxWeek(maxWeekRes.data.data.max)
    } catch (err) {
    }
  };
  
  useEffect(() => {
    fetcData(week);
  }, []);

  if (week == maxWeek) {
    return (<center>
      <Stack alignItems="center">
      <Typography sx = {{mt: 2}}>Week: {week}</Typography>
      <Pagination count={maxWeek} page={week} onChange={(e, value) => handleChange(value)} />
      </Stack>
      
      <Card sx={{ height: 200, width: 1500, mt: 4 }}  > 
        <CardContent>
          <Grid container spacing={2} >
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[0].hometeamlogo}
                  sx={{ width: 60, height: 80, mt: 1 }}/>
                  <Typography>
                  {matches && matches[0].hometeamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                <Grid item>
                    <Typography sx = {{mt:3}}>
                    {matches && matches[0].date}
                    </Typography>
                  </Grid>
                  
                  <Grid item>
                    <Typography sx = {{mt:1}}>
                    {matches && matches[0].time}
                    </Typography>
                  </Grid>
                  
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[0].awayteamlogo}
                  sx={{ width: 60, height: 80, mt: 1 }} />
                  <Typography >
                  {matches && matches[0].awayteamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ height: 200, width: 1500, mt: 4 }}> 
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[1].hometeamlogo}
                  sx={{ width: 60, height: 80, mt: 1}} />
                  <Typography>
                  {matches && matches[1].hometeamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  
                <Grid item>
                    <Typography sx = {{mt:3}}>
                    {matches && matches[1].date}
                    </Typography>
                  </Grid>
                  
                  <Grid item>
                    <Typography sx = {{mt:1}}>
                    {matches && matches[1].time}
                    </Typography>
                  </Grid>
                  
                  
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[1].awayteamlogo}
                  sx={{ width: 70, height: 80, mt: 1 }}/>
                  <Typography >
                  {matches && matches[1].awayteamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>


      <Card sx={{ height: 200, width: 1500, mt: 4 }}> 
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[2].hometeamlogo}
                  sx={{ width: 60, height: 80, mt: 1 }}/>
                  <Typography>
                  {matches && matches[2].hometeamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  
                <Grid item>
                    <Typography sx = {{mt:3}}>
                    {matches && matches[2].date}
                    </Typography>
                  </Grid>
                  
                  <Grid item>
                    <Typography sx = {{mt:1}}>
                    {matches && matches[2].time}
                    </Typography>
                  </Grid> 
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[2].awayteamlogo}
                  sx={{ width: 70, height: 80, mt: 1 }}/>
                  <Typography >
                  {matches && matches[2].awayteamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>



      <Card sx={{ height: 200, width: 1500, mt: 4 }}> 
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[3].hometeamlogo}
                  sx={{ width: 60, height: 80, mt: 1 }}/>
                  <Typography>
                  {matches && matches[3].hometeamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  
                <Grid item>
                    <Typography sx = {{mt:3}}>
                    {matches && matches[3].date}
                    </Typography>
                  </Grid>
                  
                  <Grid item>
                    <Typography sx = {{mt:1}}>
                    {matches && matches[3].time}
                    </Typography>
                  </Grid>
                  
                  
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[3].awayteamlogo}
                  sx={{ width: 70, height: 80, mt: 1 }}/>
                  <Typography >
                  {matches && matches[3].awayteamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ height: 200, width: 1500, mt: 4 }}> 
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[4].hometeamlogo}
                  sx={{ width: 60, height: 80, mt: 1 }}/>
                  <Typography>
                  {matches && matches[4].hometeamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                <Grid item>
                    <Typography sx = {{mt:3}}>
                    {matches && matches[4].date}
                    </Typography>
                  </Grid>
                  
                  <Grid item>
                    <Typography sx = {{mt:1}}>
                    {matches && matches[4].time}
                    </Typography>
                  </Grid>
                
                  
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[4].awayteamlogo}
                  sx={{ width: 70, height: 80, mt: 1 }}/>
                  <Typography >
                  {matches && matches[4].awayteamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ height: 200, width: 1500, mt: 4 }}> 
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[5].hometeamlogo}
                  sx={{ width: 60, height: 80, mt: 1 }}/>
                  <Typography>
                  {matches && matches[5].hometeamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                <Grid item>
                    <Typography sx = {{mt:3}}>
                    {matches && matches[5].date}
                    </Typography>
                  </Grid>
                  
                  <Grid item>
                    <Typography sx = {{mt:1}}>
                    {matches && matches[5].time}
                    </Typography>
                  </Grid>
              
                  
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[5].awayteamlogo}
                  sx={{ width: 70, height: 80, mt: 1 }}/>
                  <Typography >
                  {matches && matches[5].awayteamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ height: 200, width: 1500, mt: 4 }}> 
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[6].hometeamlogo}
                  sx={{ width: 60, height: 80, mt: 1 }}/>
                  <Typography>
                  {matches && matches[6].hometeamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                <Grid item>
                    <Typography sx = {{mt:3}}>
                    {matches && matches[6].date}
                    </Typography>
                  </Grid>
                  
                  <Grid item>
                    <Typography sx = {{mt:1}}>
                    {matches && matches[6].time}
                    </Typography>
                  </Grid>
                  
                  
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[6].awayteamlogo}
                  sx={{ width: 70, height: 80, mt: 1 }}/>
                  <Typography >
                  {matches && matches[6].awayteamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ height: 200, width: 1500, mt: 4 }}> 
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[7].hometeamlogo}
                  sx={{ width: 60, height: 80, mt: 1 }}/>
                  <Typography>
                  {matches && matches[7].hometeamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                <Grid item>
                    <Typography sx = {{mt:3}}>
                    {matches && matches[7].date}
                    </Typography>
                  </Grid>
                  
                  <Grid item>
                    <Typography sx = {{mt:1}}>
                    {matches && matches[7].time}
                    </Typography>
                  </Grid>
                  
                  
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[7].awayteamlogo}
                  sx={{ width: 70, height: 80, mt: 1 }}/>
                  <Typography >
                  {matches && matches[7].awayteamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ height: 200, width: 1500, mt: 4 }}> 
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[8].hometeamlogo}
                  sx={{ width: 60, height: 80, mt: 1 }}/>
                  <Typography>
                  {matches && matches[8].hometeamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                <Grid item>
                    <Typography sx = {{mt:3}}>
                    {matches && matches[8].date}
                    </Typography>
                  </Grid>
                  
                  <Grid item>
                    <Typography sx = {{mt:1}}>
                    {matches && matches[8].time}
                    </Typography>
                  </Grid>
                  
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[8].awayteamlogo}
                  sx={{ width: 70, height: 80, mt: 1 }}/>
                  <Typography >
                  {matches && matches[8].awayteamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      
    </center>)
  }
  else {

  
  return (
    <center>
      <Stack alignItems="center">
      <Typography sx = {{mt: 2}}>Week: {week}</Typography>
      <Pagination count={maxWeek} page={week} onChange={(e, value) => handleChange(value)} />
      </Stack>
      
      <Card sx={{ height: 200, width: 1500, mt: 4 }}  > 
        <CardContent>
          <Grid container spacing={2} >
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[0].hometeamlogo}
                  sx={{ width: 60, height: 80, mt: 1 }}/>
                  <Typography>
                  {matches && matches[0].hometeamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Grid item xs container direction="row" spacing={2}justifyContent="space-around"
                    alignItems="center">
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      {matches && matches[0].home_score} 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      - 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      {matches && matches[0].away_score} 
                    </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography sx = {{mt:0}}>
                    {matches && matches[0].date}
                    </Typography>
                  </Grid>
                  
                  <Grid item>
                    <Typography sx = {{mt:0}}>
                    {matches && matches[0].time}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                    {matches && matches[0].name} {matches && matches[0].surname}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button size="medium" onClick={() => handleRate(matches && matches[0].match_id)}>
                    Rate Referee
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[0].awayteamlogo}
                  sx={{ width: 60, height: 80, mt: 1 }} />
                  <Typography >
                  {matches && matches[0].awayteamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ height: 200, width: 1500, mt: 4 }}> 
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[1].hometeamlogo}
                  sx={{ width: 60, height: 80, mt: 1}} />
                  <Typography>
                  {matches && matches[1].hometeamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Grid item xs container direction="row" spacing={2}justifyContent="space-around"
                    alignItems="center">
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      {matches && matches[1].home_score} 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      - 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      {matches && matches[1].away_score} 
                    </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography sx = {{mt:0}}>
                    {matches && matches[1].date}
                    </Typography>
                  </Grid>
                  
                  <Grid item>
                    <Typography sx = {{mt:0}}>
                    {matches && matches[1].time}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                    {matches && matches[1].name} {matches && matches[1].surname} 
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button size="medium" onClick={() => handleRate(matches && matches[1].match_id)}>
                    Rate Referee
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[1].awayteamlogo}
                  sx={{ width: 70, height: 80, mt: 1 }}/>
                  <Typography >
                  {matches && matches[1].awayteamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>


      <Card sx={{ height: 200, width: 1500, mt: 4 }}> 
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[2].hometeamlogo}
                  sx={{ width: 60, height: 80, mt: 1 }}/>
                  <Typography>
                  {matches && matches[2].hometeamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Grid item xs container direction="row" spacing={2}justifyContent="space-around"
                    alignItems="center">
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      {matches && matches[2].home_score} 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      - 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      {matches && matches[2].away_score} 
                    </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography sx = {{mt:0}}>
                    {matches && matches[2].date}
                    </Typography>
                  </Grid>
                  
                  <Grid item>
                    <Typography sx = {{mt:0}}>
                    {matches && matches[2].time}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                    {matches && matches[2].name} {matches && matches[2].surname} 
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Button size="medium" onClick={() => handleRate(matches && matches[2].match_id)}>
                    Rate Referee
                    </Button>
                  </Grid>
                  
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[2].awayteamlogo}
                  sx={{ width: 70, height: 80, mt: 1 }}/>
                  <Typography >
                  {matches && matches[2].awayteamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>



      <Card sx={{ height: 200, width: 1500, mt: 4 }}> 
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[3].hometeamlogo}
                  sx={{ width: 60, height: 80, mt: 1 }}/>
                  <Typography>
                  {matches && matches[3].hometeamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Grid item xs container direction="row" spacing={2}justifyContent="space-around"
                    alignItems="center">
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      {matches && matches[3].home_score} 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      - 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      {matches && matches[3].away_score} 
                    </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography sx = {{mt:0}}>
                    {matches && matches[3].date}
                    </Typography>
                  </Grid>
                  
                  <Grid item>
                    <Typography sx = {{mt:0}}>
                    {matches && matches[3].time}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                    {matches && matches[3].name} {matches && matches[3].surname} 
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Button size="medium" onClick={() => handleRate(matches && matches[3].match_id)}>
                    Rate Referee
                    </Button>
                  </Grid>
                  
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[3].awayteamlogo}
                  sx={{ width: 70, height: 80, mt: 1 }}/>
                  <Typography >
                  {matches && matches[3].awayteamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ height: 200, width: 1500, mt: 4 }}> 
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[4].hometeamlogo}
                  sx={{ width: 60, height: 80, mt: 1 }}/>
                  <Typography>
                  {matches && matches[4].hometeamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Grid item xs container direction="row" spacing={2}justifyContent="space-around"
                    alignItems="center">
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      {matches && matches[4].home_score} 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      - 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      {matches && matches[4].away_score} 
                    </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography sx = {{mt:0}}>
                    {matches && matches[4].date}
                    </Typography>
                  </Grid>
                  
                  <Grid item>
                    <Typography sx = {{mt:0}}>
                    {matches && matches[4].time}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                    {matches && matches[4].name} {matches && matches[4].surname} 
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button size="medium" onClick={() => handleRate(matches && matches[4].match_id)}>
                    Rate Referee
                    </Button>
                  </Grid>
                  
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[4].awayteamlogo}
                  sx={{ width: 70, height: 80, mt: 1 }}/>
                  <Typography >
                  {matches && matches[4].awayteamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ height: 200, width: 1500, mt: 4 }}> 
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[5].hometeamlogo}
                  sx={{ width: 60, height: 80, mt: 1 }}/>
                  <Typography>
                  {matches && matches[5].hometeamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Grid item xs container direction="row" spacing={2}justifyContent="space-around"
                    alignItems="center">
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      {matches && matches[5].home_score} 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      - 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      {matches && matches[5].away_score} 
                    </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography sx = {{mt:0}}>
                    {matches && matches[5].date}
                    </Typography>
                  </Grid>
                  
                  <Grid item>
                    <Typography sx = {{mt:0}}>
                    {matches && matches[5].time}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                    {matches && matches[5].name} {matches && matches[5].surname} 
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button size="medium" onClick={() => handleRate(matches && matches[5].match_id)}>
                    Rate Referee
                    </Button>
                  </Grid>
                  
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[5].awayteamlogo}
                  sx={{ width: 70, height: 80, mt: 1 }}/>
                  <Typography >
                  {matches && matches[5].awayteamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ height: 200, width: 1500, mt: 4 }}> 
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[6].hometeamlogo}
                  sx={{ width: 60, height: 80, mt: 1 }}/>
                  <Typography>
                  {matches && matches[6].hometeamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Grid item xs container direction="row" spacing={2}justifyContent="space-around"
                    alignItems="center">
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      {matches && matches[6].home_score} 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      - 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      {matches && matches[6].away_score} 
                    </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography sx = {{mt:0}}>
                    {matches && matches[6].date}
                    </Typography>
                  </Grid>
                  
                  <Grid item>
                    <Typography sx = {{mt:0}}>
                    {matches && matches[6].time}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                    {matches && matches[6].name} {matches && matches[6].surname} 
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button size="medium" onClick={() => handleRate(matches && matches[6].match_id)}>
                    Rate Referee
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[6].awayteamlogo}
                  sx={{ width: 70, height: 80, mt: 1 }}/>
                  <Typography >
                  {matches && matches[6].awayteamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ height: 200, width: 1500, mt: 4 }}> 
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[7].hometeamlogo}
                  sx={{ width: 60, height: 80, mt: 1 }}/>
                  <Typography>
                  {matches && matches[7].hometeamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Grid item xs container direction="row" spacing={2}justifyContent="space-around"
                    alignItems="center">
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      {matches && matches[7].home_score} 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      - 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      {matches && matches[7].away_score} 
                    </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography sx = {{mt:0}}>
                    {matches && matches[7].date}
                    </Typography>
                  </Grid>
                  
                  <Grid item>
                    <Typography sx = {{mt:0}}>
                    {matches && matches[7].time}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                    {matches && matches[7].name} {matches && matches[7].surname} 
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button size="medium" onClick={() => handleRate(matches && matches[7].match_id)}>
                    Rate Referee
                    </Button>
                  </Grid>
                  
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[7].awayteamlogo}
                  sx={{ width: 70, height: 80, mt: 1 }}/>
                  <Typography >
                  {matches && matches[7].awayteamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ height: 200, width: 1500, mt: 4 }}> 
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[8].hometeamlogo}
                  sx={{ width: 60, height: 80, mt: 1 }}/>
                  <Typography>
                  {matches && matches[8].hometeamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Grid item xs container direction="row" spacing={2}justifyContent="space-around"
                    alignItems="center">
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      {matches && matches[8].home_score} 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      - 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 2}} style={{ fontSize: 30 }}>
                      {matches && matches[8].away_score} 
                    </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography sx = {{mt:0}}>
                    {matches && matches[8].date}
                    </Typography>
                  </Grid>
                  
                  <Grid item>
                    <Typography sx = {{mt:0}}>
                    {matches && matches[8].time}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                    {matches && matches[8].name} {matches && matches[8].surname} 
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button size="medium" onClick={() => handleRate(matches && matches[8].match_id)}>
                    Rate Referee
                    </Button>
                  </Grid>
                  
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Avatar
                  alt=""
                  src={matches && matches[8].awayteamlogo}
                  sx={{ width: 70, height: 80, mt: 1 }}/>
                  <Typography >
                  {matches && matches[8].awayteamname}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      
    </center>
  );}
};

export default RRFixtures;
