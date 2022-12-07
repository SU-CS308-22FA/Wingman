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
import { Avatar, Divider, Grid } from "@mui/material";
import SmallCard from "./SmallCard";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

//Chip data
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 500,
      width: 250,
    },
  },
};

const names = ["TFF Admin", "Reporter", "Retired Referee", "Super Admin"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

let options = {
  chart: {
    id: "basic-bar",
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
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
let series = [
  {
    name: "series-1",
    data: [30, 40, 45, 50, 49, 60, 70, 91],
  },
];

const RRHistory = ({}) => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  const { user } = useContext(UsersContext);

  const theme = useTheme();

  const [personName, setPersonName] = React.useState([]);
  console.log(personName);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {}, []);

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
              subtitle={"12"}
            ></SmallCard>
          </Grid>
          <Grid item>
            <SmallCard
              title={"Total Referees Rated"}
              subtitle={"4"}
            ></SmallCard>
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
        <Grid container spacing={10}
  direction="row"
  justifyContent="space-between"
  alignItems="center">
          <Grid item>
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">Role</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
          <Container maxWidth="md">
              <center>
              <Avatar
              variant="square"
              src="https://resources.premierleague.com/photos/2022/08/08/2ab10666-b34d-4b11-9d49-ce5b7924a6cf/Anthony-Taylor-referee.png?width=930&height=620"
          	sx={{ width: 120, height: 120 }}
 
            /></center>
                <Typography
                  variant="h6"
                  align="center"
                  color="#70798C"
                  gutterBottom
                >
                   Hasan Sabbah
                </Typography>
                
              </Container>
          </Grid>
          <Grid item>
          <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <Chart options={options} series={series} type="bar" width="450" />
            </div>
          </div>
        </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RRHistory;
