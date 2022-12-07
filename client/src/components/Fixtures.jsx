import { Grid } from "@mui/material";
import { Card, CardContent, CardHeader, Divider } from '@mui/material';
import { Navigate } from "react-router-dom";
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import matchCard from "../components/matchCard"
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import UserFinder from "../apis/UserFinder";


const FixturesComponent = ({}) => {

  const  [isLoading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const  [matches, setMacthes] = useState([]);

  useEffect( () => {
        const fetcData = async () => {
            try {
            const response = await UserFinder.get("/fixture");
            console.log("res:",response);
            setMacthes(response.data.data.users)
            } catch (err) {}
        };

        fetcData();
    }, []);
  const navigate = useNavigate();

  const handleAssign = (id) => {
    navigate(`/assign/${id}`);
  };

    return(
    <center> 
    
    <div className="col-md-4 animated fadeIn">
    
    <div className="card"
    onClick={() => console.log('CLICK')}>
                
                <div className="card-body">
                <Grid container spacing={2}
                justifyContent="center"
                alignItems="center"
                >
                
                <Grid item xs={4} >
                  <div className="avatar">
                    <img
                      src={"https://i.hizliresim.com/t6q9rs6.png" }
                      alt=""
                      height="66" width="50"
                    />
                  </div>
                  </Grid>
                  <Grid item xs={1} >
                    <p>3</p>
                  </Grid>
                  <Grid item xs={2} >
                    <p>-</p>
                  </Grid>
                  <Grid item xs={1} >
                    <p>3</p>
                  </Grid>
                  <Grid item xs={4} >
                  <div className="avatar">
                    <img
                      src={"https://i.hizliresim.com/t6q9rs6.png"}
                      
                      alt=""
                      height="66" width="50"
                    />
                  </div>
                  </Grid>
                  </Grid>
                  </div>
                  <h5 className="card-title">
                    alaa
                  </h5>
                  </div>
                  <Card sx={{ padding: 3, justifyContent: 'center' }} >
                  <div className="card-body">
                  <Grid container spacing={2}
                justifyContent="center"
                alignItems="center"
                >
                
                <Grid item xs={4} >
                  <div className="avatar">
                    <img
                      src={"https://i.hizliresim.com/t6q9rs6.png" }
                      alt=""
                      height="66" width="50"
                    />
                  </div>
                  </Grid>
                  <Grid item xs={1} >
                    <p>3</p>
                  </Grid>
                  <Grid item xs={2} >
                    <p>-</p>
                  </Grid>
                  <Grid item xs={1} >
                    <p>3</p>
                  </Grid>
                  <Grid item xs={4} >
                  <div className="avatar">
                    <img
                      src={"https://i.hizliresim.com/t6q9rs6.png"}
                      
                      alt=""
                      height="66" width="50"
                    />
                  </div>
                  </Grid>
                  
                  <CardContent>
                    <Grid container spacing={2}
                justifyContent="center"
                alignItems="center">
          

                    <Grid item xs = {2}>
                      <p>{matches[0].hometeamname}</p>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography gutterBottom variant="h7" component="div">
                      11.02.22
                    </Typography></Grid>
                    <Grid item xs = {2}>
                      <p>{matches[0].awayteamname}</p>
                    </Grid>
                    </Grid>
                  
                
                  </CardContent>
                  <CardActions>
                    
                    <Button size="medium" onClick={() => handleAssign(1)}>Assign Referee</Button>
                  </CardActions></Grid>
                    </div>
                    
                  </Card>
                  
                  </div>

    </center> 
    )
}

export default FixturesComponent;