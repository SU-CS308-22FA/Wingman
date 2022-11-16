import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate} from "react-router-dom"
import React, { useContext, useState, useEffect } from "react";
import UserFinder from "../apis/UserFinder";
import { UsersContext } from "../context/UserContex";
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import { Divider } from '@mui/material';



const AdminProfile = ({}) => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true)

  const {user} = useContext(UsersContext)

  useEffect(() => {
    if(user)
      setLoading(false)
  }, []);
  

  function onDelete(){
    try {
      const response = UserFinder.delete(`/users/${user.id}`)
      .then(navigate("/login/"))
    }
    catch(err){
      console.error('profile delete  error: ', err);
      }
  }

  function onUpdate(){
    navigate("/update/")
  }
  function onUpdate(){
    navigate("/assign")
  }

  return (
    <div>
      {isLoading? 
            <h1>Loading...</h1>
          :
          <main>
          <Box
            sx={{
              bgcolor: '#F5F1ED',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                variant="h3"
                align="center"
                color="#252323"
                gutterBottom
              >
            {user.name} {user.surname}
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="#70798C"
                gutterBottom
              >
                TFF Authorized User
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="#B3B5BD"
                gutterBottom
              >
                  {user.mail}
              </Typography>
              <Typography variant="h6" align="center" color="text.secondary" paragraph>
                  Welcome to Wingman, {user.name}! You are now on your profile page. From here, you can perform settings related to your account and actions such as account deletion. You can also see the latest updates of TFF account. If you want to take action about referees or teams, you can go to the relevant pages using the menu above.
              </Typography>
              <Stack
                sx={{ pt: 3 }}
                direction="row"
                spacing={1}
                justifyContent="center"
              >
                <Button onClick={onUpdate} color = 'fourth' variant="contained">UPDATE ACCOUNT</Button>
                <Button onClick={onDelete} color = 'error' variant="contained">DELETE ACCOUNT</Button>
                <Button onClick={onUpdate} color = 'third' variant="contained">REFEREE ASSIGNMENT</Button>

              </Stack>
              <Divider variant="middle" />
            </Container>
            <Box m={0} pt={5}> </Box>

            <Container maxWidth="sm">
            <Typography
                variant="h5"
                align="center"
                color="#70798C"
                gutterBottom
              >
                Latest Updates From @TFF
              </Typography>
              <Box m={0} pt={5}> </Box>

            <TwitterTimelineEmbed
  sourceType="profile"
  screenName="TFF_Org"
  options={{height: 400}}
/>
            </Container>
          </Box>
  
        </main>
          }
    </div>
  );
}

export default AdminProfile