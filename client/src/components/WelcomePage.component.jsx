import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import {useNavigate} from "react-router-dom"
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { UsersContext } from '../context/UserContex';
import { AuthContext } from '../context/authContext';
import { useContext } from 'react';
import UserFinder from "../apis/UserFinder";
import { useEffect } from 'react';


function Welcome() {
  const navigate = useNavigate();
  const {setUser} = useContext(UsersContext)
  const {setAuth} = useContext(AuthContext)
  
  const getData = async () => {
    try {
      const userData =  await UserFinder.get(`/users/1`, {headers: {'jwt_token': localStorage.token}})
      let val = {
        id: userData.data.data.user_id,
        mail: userData.data.data.mail,
        name: userData.data.data.name,
        surname: userData.data.data.surname,
        role: userData.data.data.role
      }   
      return val;
    } catch (err) {
      console.error(err.message);
    }
  };

  const checkAuthenticated = async () => {
    try {
      const res = await UserFinder.post("/verify", {}, {headers: {'jwt_token': localStorage.token}})
      if (res.data.isAuth === true){
        await setAuth(true);
        const val = await getData();
        await setUser(val)
        navigate("/profile/")
      }
      else{
        await setAuth(false);
      } 
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const onTFFRegisterClicked = (e) => {
    navigate("/admin/register");
  };
  const onReporterRegisterClicked = (e) => {
    navigate("/reporter/register");
  };
  const onLoginClicked = (e) => {
    navigate("/login");
  };

const tiers = [
  {
    title: "c",
    description: [
        <img src="https://i.imgur.com/H3FEsox.png" height="152.2" width="76.2" /> 
    ],
    buttonText: 'Turkish Football Federation Register',
    buttonVariant: 'contained',
    onClick: onTFFRegisterClicked
  },
  {
    title: "e",
    description: [
      <img src="https://i.imgur.com/puRw0jj.png" height="152.2" width="176.3587302" /> 
    ],
    buttonText: 'Login',
    buttonVariant: 'contained',
    onClick: onLoginClicked
  },
  {
    title: "f",
    description: [
        <img src="https://i.imgur.com/23onXKz.png" height="152.2" width="76.2"/> 
    ],
    buttonText: 'Retired Referee & Reporter Register',
    buttonVariant: 'contained',
    onClick: onReporterRegisterClicked
  },
];

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
 
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
        <center>
      <img src="https://i.hizliresim.com/t6q9rs6.png" height="105.6" width="80" />  </center>        

           <Box m={3} pt={0}> </Box>
        <Typography variant="body1" align="center" color="text.secondary" component="p" >
        Welcome to the Wingman! If you are not registered to Wingman, you can go to the registration page for your role by clicking the relevant button. Make sure you have key before registration process.  If you are already authorized to use Wingman, you can directly log in!        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
            <Card elevation={0} style={{backgroundColor: "#F5F1ED"}}>
                  <CardContent>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button onClick = {tier.onClick}
                  style={{
                      textTransform: 'none',
        borderRadius: 12,
        color:  "#F5F1ED",
        backgroundColor: "#70798C",
        
    }}
     fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    
    </React.Fragment>
  );
}

export default function Landing() {
  return <Welcome/>;
}