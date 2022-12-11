import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import UserFinder from "../apis/UserFinder";
import { UsersContext } from "../context/UserContex";
import { AuthContext } from "../context/authContext";
import Chart from "react-apexcharts";
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import SmallCard from "./SmallCard";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import DialogSelect from "./DialogSelect";

let options = {
  chart: {
    id: "basic-bar",
  },
  yaxis: {
    show: false,
  },
  grid: {
    show: false, // you can either change hear to disable all grids
  },
  xaxis: {
    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  theme: {
    monochrome: {
      enabled: true,
      color: "#255aee",
      shadeTo: "light",
      shadeIntensity: 0.65,
    },
  },
  fill: {
    colors: ["#c7a52c"],
  },
};

const RRHistory = ({}) => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [rates, setRates] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [stats, setStats] = useState({ total: 0, avg: 0 });
  const [refStats, setRefStats] = useState({ total: 0, avg: 0 });
  const [referees, setReferees] = useState([{}]);
  const [referee, setReferee] = React.useState({
    name: "Please",
    surname: "Select Referee",
    currentseasonmatches: 0,
    avatarurl:"",
    id: "4000",
  });
  const [open, setOpen] = React.useState(false);

  const handleChangeDialog = (event) => {
    let refid = event.target.value
    UserFinder.get(`/rate/?uid=${user.id}&rid=${refid}`).then(function (response) {
      let refRateList = response.data.data;
      setRefStats({ total: refRateList.length, avg: response.data.avg.avg })
    });
    UserFinder.get(`/referees/${refid}`).then(function (response) {
      setReferee(response.data.data)
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  let series = [
    {
      name: "Ratings",
      data: rates,
    },
  ];

  const { user } = useContext(UsersContext);

  const theme = useTheme();

  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    let response = UserFinder.get(`/rate/?uid=${user.id}`).then(function (
      response
    ) {
      let rateList = response.data.data;
      const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const ratingsCount = rateList.map((rating) => {
        const index = rating.rate - 1;
        data[index]++;
      });
      setRates(data);
      setStats({ total: rateList.length, avg: response.data.avg.avg });

      const ids = rateList.map((rating) => rating.referee_id);
      const uniqueIds = [...new Set(ids)];
      let refList = [];
      uniqueIds.forEach((id) => {
        UserFinder.get(`/referees/${id}`).then((response) => {
          refList.push(response.data.data);
          //setReferee(response.data.data)
        });
      });
      
      setReferees(refList);
      
    }).then(function () {
      UserFinder.get(`/rate/?uid=${user.id}&rid=${referee.id}`).then(function (response) {
        let refRateList = response.data.data;
        setRefStats({ total: refRateList.length, avg: response.data.avg.avg })
      });
    })
  }, []);

  return (
    <Grid
      sx={{ mt: 2.5 }}
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h3" color="#70798C" gutterBottom>
          {user.name}'s Rating History
        </Typography>
      </Grid>
      <Grid item>
        <Grid container spacing={8}>
          <Grid item>
            <SmallCard
              title={"Total Matches Rated"}
              subtitle={stats.total}
            ></SmallCard>
          </Grid>
          <Grid item>
            <SmallCard title={"Avreage Rate"} subtitle={stats.avg}></SmallCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <Chart options={options} series={series} type="bar" width="600" />
            </div>
          </div>
        </div>
      </Grid>
      <Grid item>
        <Grid
          container
          spacing={10}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item></Grid>
          <Grid item>
            <Container
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <center>
                  <Avatar
                    variant="square"
                    src={referee.avatarurl}
                    sx={{ width: 120, height: 120, mb: 2 }}
                  />
                </center>
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  align="center"
                  color="#70798C"
                  gutterBottom
                >
                  {referee.name + " " + referee.surname}
                </Typography>
              </Grid>

              <Grid item>
                <div>
                  <Button onClick={handleClickOpen}>Select New Referee</Button>
                  <Dialog
                    disableEscapeKeyDown
                    open={open}
                    onClose={handleClose}
                  >
                    <DialogTitle>Select New Referee</DialogTitle>
                    <DialogContent>
                      <Box
                        component="form"
                        sx={{ display: "flex", flexWrap: "wrap" }}
                      >
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                          <InputLabel htmlFor="demo-dialog-native">
                            Referee
                          </InputLabel>
                          <Select
                            native
                            value={referee.id}
                            onChange={handleChangeDialog}
                            input={
                              <OutlinedInput
                                label="Referee"
                                id="demo-dialog-native"
                              />
                            }
                          >
                            {referees.map((referee) => (
                              <option key={referee.id} value={referee.id}>
                                {referee.name + " " + referee.surname}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleClose}>Ok</Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </Grid>
            </Container>
          </Grid>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <SmallCard
                  title={"Avrage Rating"}
                  subtitle={refStats.avg+"/10"}
                ></SmallCard>
              </Grid>
              <Grid item>
                <SmallCard
                  title={"Matches Rated / Total Matches"}
                  subtitle={refStats.total + "/" + referee.currentseasonmatches}
                ></SmallCard>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RRHistory;
