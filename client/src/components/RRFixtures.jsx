import { Grid } from "@mui/material";
import { Card, CardContent, CardHeader, Divider } from '@mui/material';
import { Navigate } from "react-router-dom";
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import matchCard from "../components/matchCard"


const FixturesComponent = ({}) => {
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
                  <h5 className="card-title">
                    alaa
                  </h5>
                  <CardActions>
                    
                    <Button size="medium" onClick={() => handleAssign(1)}>Rate Referee</Button>
                  </CardActions></Grid>
                    </div>
                  </Card>
                  
                  </div>

    </center> 
    )
}

export default FixturesComponent;