import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserFinder from "../apis/UserFinder";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid,gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import { Avatar, Button, CircularProgress, Divider, Paper, styled } from "@mui/material";
import SmallCard from "./SmallCard";
import SmallCardDark from "./SmallCardDark";
export const RefRank = () => {
    const  [isLoading, setLoading] = useState(true);
    const  [rank, setRank] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const queryString = window.location.href;
    const id = queryString.match(/rankings\/(\d+)/)[1];
    const [isAvailable, setAvailable] = useState(true);

    const StyledRating = styled(Rating)({
      '& .MuiRating-iconFilled': {
        color: '#A99985',
      },
      '& .MuiRating-iconHover': {
        color: '#A99985',
      },
      '& .MuiRating-iconEmpty': {
        color: '#9297A5',
    }});
    
  
    const navigate = useNavigate();

    useEffect( () => {
        const fetcData = async () => {
            try {
            const response = await UserFinder.get(`/rank/${id}`);
            setRank(response.data.data.data)
            setLoading(false)

            } catch (err) {
              setAvailable(false);
            }
        };

        fetcData();
    }, []);
    console.log(rank)

  const columns = [
    { field: 'rank', headerName: 'Ranking', width: 80 ,        sortable: false,

    disableColumnMenu: true,

    renderCell : (params) => {
        return(
          <Button
            size="small"
            variant="rounded"
            style={{ width: 45, height: 45 }}
          >
            {params.row.rank}
          </Button>
        );
      }
      

    },
    { field: 'avatarurl', headerName: '', width: 60 ,        sortable: false,
    disableColumnMenu: true,

    renderCell: (params) => {
        return (
            <Avatar src={params.row.avatarurl}           	sx={{ width: 45, height: 45 }}/>
        )
        }

    },
    
    {
      field: 'refname',
      headerName: 'Referee',
      sortable: false,

      width: 150,
      disableColumnMenu: true


    },
 
    {
        field: 'avg',
        headerName: 'Rating',
        width: 200,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => {
          return (
            <StyledRating
                name="read-only"
                          value={params.row.avg}
              precision={1}
              size="small"
              allowHalf={false}
              max={10}
              defaultValue={5}
              readOnly
            />
          );
        }
      },

      {
        field: 'avg2',
        headerName: 'Net Rating',
        sortable: false,
        width: 90,
        disableColumnMenu: true,
      },

      {
        field: 'matchname',
        headerName: 'Match',
        sortable: false,
        width: 250,
        disableColumnMenu: true,
      }
    ];
  const rows = rank;
  if (!isAvailable) {
    return (
      <center>
      <Box height="69vh">
        <Box height = "30vh"></Box>
      <Typography variant="h4" color="#A99985" font fontWeight="600">
      For this week, rankings information is not available or week is not found.
        </Typography>
        </Box>
  
      </center>
 
    );
  }
   else if (rank.length == 9){
    return (
        <>
     <CssBaseline />
        <Box
        sx={{
          height: 1450,
          width: '100%',
        }}
      >

        <Typography
        color="#A99985" font fontWeight="600"
          variant="h4"
          component="h3"
          sx={{ textAlign: 'center', mt: 9}}
        >
          Referee Rankings - Week {id}
        </Typography>
  
      <Container>
          <center>
      <Toolbar/>
        <Paper component={Box} width={850} height={600}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnMenu
        getRowId={(row) => row.rank}
        pageSize={20}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
          </Paper>
          </center>


          <Grid container rowSpacing={4.5} columnSpacing={2.75}>

<Grid item mt = {6} mr={2} xs={12} md={-3} lg={12}>
<center> <Typography variant="h5" color="#212d40" font fontWeight="600">
🥇 Best Performance Of The Week 🥇  </Typography></center>

{/* <Typography variant="h4" color="#212d40" font fontWeight="600">
Best Performance Of The Week     </Typography>
</center>
<Divider color = "#a99985" sx={{ mt:3, borderBottomWidth:2 }}/> */}
</Grid>
{/* row   1 */}
<Grid item mr={2} xs={3} md={0} lg={12}>
<center>
<Avatar
        src={rank[0].avatarurl}
      sx={{ width: 200, height: 200 }}

      />
      <Typography mt ={3} variant="h3" color="#AF9E6E" font fontWeight="600">
      {rank.reduce((prev, curr) => prev.avg > curr.avg ? prev : curr).refname} 
      </Typography>
      <Typography mt ={1} variant="h6" color="#A99985" font fontWeight="600">
      {rank.reduce((prev, curr) => prev.avg > curr.avg ? prev : curr).matchname} 
      </Typography>

      </center>
</Grid>

<Grid item ml = {7.5} mt = {0} xs={12} sm={6} md={1} lg={11/3}>
  <SmallCardDark title="Rating" subtitle =    {<StyledRating name="read-only" value=       {rank.reduce((prev, curr) => prev.avg > curr.avg ? prev : curr).avg} precision={1} size="small" allowHalf={false} max={10} defaultValue={5} readOnly />} />
</Grid>
<Grid item xs={12} mt = {0} sm={6} md={1} lg={11/3}>
  <SmallCardDark title="Yellow Cards" subtitle =       {rank.reduce((prev, curr) => prev.avg > curr.avg ? prev : curr).yels}/>
</Grid>
<Grid item xs={12} mt = {0} sm={6} md={1} lg={11/3}>
<SmallCardDark title="Red Cards " subtitle =       {rank.reduce((prev, curr) => prev.avg > curr.avg ? prev : curr).reds}/>
</Grid>
<Grid item xs={12} mt = {0} sm={6} md={1} lg={12}>
<center><Typography mt ={1} variant="h6" color="#A99985" font fontWeight="600">
      22/23 Summary
     </Typography></center>
     </Grid> 
<Grid item ml = {7.5} mt = {0} xs={12} sm={6} md={1} lg={2.75}>
  <SmallCardDark title="Matches - 22/23" subtitle =  {rank.reduce((prev, curr) => prev.avg > curr.avg ? prev : curr).currentseasonmatches}  />
</Grid>
<Grid item xs={12} mt = {0} sm={6} md={1} lg={2.75}>
  <SmallCardDark title="Yellow Cards" subtitle =       {rank.reduce((prev, curr) => prev.avg > curr.avg ? prev : curr).currentyel}/>
</Grid>
<Grid item xs={12} mt = {0} sm={6} md={1} lg={2.75}>
<SmallCardDark title="Red Cards " subtitle =       {rank.reduce((prev, curr) => prev.avg > curr.avg ? prev : curr).currentred}/>
</Grid>
<Grid item xs={12} mt = {0} sm={6} md={1} lg={2.75}>
<SmallCardDark title="Tension"  subtitle=      {rank.reduce((prev, curr) => prev.avg > curr.avg ? prev : curr).tension.toFixed(2)}   reftens =    {rank.reduce((prev, curr) => prev.avg > curr.avg ? prev : curr).tension}  />
</Grid>
</Grid>

          </Container>
    </Box>  
      </>
  ) 
  
}
else {
  if (isLoading){
    <div>
      <center>
      <Box height="69vh">
        <Box height = "30vh"></Box>
          <CircularProgress/>
        </Box>
  
      </center>
  </div>
  }
  else{ 
  return (
    <center>
    <Box height="69vh">
      <Box height = "30vh"></Box>
    <Typography variant="h4" color="#A99985" font fontWeight="600">
        For this week, matches are not completed yet.
      </Typography>
      </Box>

    </center>
  );
}}
}

 

