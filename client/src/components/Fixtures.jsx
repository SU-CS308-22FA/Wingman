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
const FixturesComponent = ({}) => {
  const [isLoading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [matches, setMacthes] = useState(null);
  const navigate = useNavigate();
  const queryString = window.location.href;
  const index = queryString.search("fixture")
  const week = queryString.substring(index + 8)

  const handleAssign = (id) => {
    navigate(`/assign/${id}`);
  };

  const handleChange = (week) => {
    navigate(`/fixture/${week}`);
  };
  useEffect(() => {
    const fetcData = async () => {
      try {
        const response = await UserFinder.get("/fixture");
        console.log("res:", response);
        setMacthes(response.data.data.users);
      } catch (err) {
        console.log("zoort");
      }
    };

    fetcData();
  }, []);

  return (
    <center>
      <Stack alignItems="center">
      <Typography>Week: {week}</Typography>
      <Pagination count={16} page={week} onChange={(e, value) => handleChange(value)} />
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
                    <Typography sx = {{mt: 5}} style={{ fontSize: 30 }}>
                      {matches && matches[0].home_score} 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 5}} style={{ fontSize: 30 }}>
                      - 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 5}} style={{ fontSize: 30 }}>
                      {matches && matches[0].away_score} 
                    </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography>
                      22.12.22
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button size="medium" onClick={() => handleAssign(2)}>
                    Assign Referee
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
                  sx={{ width: 60, height: 80, mt: 1 }}/>
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
                  sx={{ width: 60, height: 80, mt: 1 }}/>
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
                    <Typography sx = {{mt: 5}} style={{ fontSize: 30 }}>
                      {matches && matches[1].home_score} 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 5}} style={{ fontSize: 30 }}>
                      - 
                    </Typography>
                    </Grid>
                    <Grid item>
                    <Typography sx = {{mt: 5}} style={{ fontSize: 30 }}>
                      {matches && matches[1].away_score} 
                    </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography>
                      22.12.22
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                    {matches && matches[1].name} {matches && matches[1].surname} 
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button size="medium" onClick={() => handleAssign(1)}>
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

      
    </center>
  );
};

export default FixturesComponent;
