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
import { Avatar, Chip, Divider } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import FaceIcon from '@mui/icons-material/Face';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
 
 
 
 
const AdminProfile = ({}) => {
  const navigate = useNavigate();

  const {user} = useContext(UsersContext)
  
  function onDelete(){
    try {
      const response = UserFinder.delete(`/users/${id}`,  { data: { id: "5" }})
      .then(navigate("/login/"))
	}
    catch(err){
      console.error('profile delete  error: ', err);
      }
  }
 
  function onUpdate(){
    navigate("/update/")
  }
  function onAssign(){
    navigate("/assign")
  }


  return (
    <div>
          <main>
          <Box
            sx={{
          	bgcolor: '#F5F1ED',
          	pt: 8,
          	pb: 6,
            }}
          >
                      	<center>
            <Avatar
              src="https://mir-s3-cdn-cf.behance.net/projects/404/bf49ef66942191.Y3JvcCwxNTUzLDEyMTUsNDM0LDEzNA.png"
          	sx={{ width: 80, height: 80 }}
 
            /></center>
            <Box m={1} pt={0}> </Box>
            <Container maxWidth="sm">
          	<Typography
            	variant="h3"
            	align="center"
            	color="#252323"
          	>
            {user.name} {user.surname}
          	</Typography>
          	<Box m={1} pt={0}> </Box>
          	<center>
          	<Chip color="secondary" label = "TFF Authorized User" deleteIcon={<DoneIcon />} icon={<FaceIcon />}/>
          	</center>
          	<Box m={1} pt={0}> </Box>
          	<center>
          	<Chip color="secondary" label = {user.mail} deleteIcon={<DoneIcon />} icon={<EmailIcon />}/>
          	</center>
 
          	<Box m={1} pt={0}> </Box>
 
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
            	<Button onClick={onAssign} color = 'third' variant="contained">REFEREE ASSIGNMENT</Button>
 
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
    </div>
  );
}
 
export default AdminProfile
 

