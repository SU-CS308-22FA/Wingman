import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import UserFinder from "../apis/UserFinder";
import { Avatar, Chip, Divider } from '@mui/material';

export const RefereeProfile = () => {
    const [referee, setReferee] = useState({});

    const navigate = useNavigate();
    const queryString = window.location.href;
    const index = queryString.search("referee")
    const id = queryString.substring(index + 8)
    
    useEffect( () => {
        try {
            UserFinder.get(`/referees/${id}`)
            .then(response =>{
            console.log("deneme",response.data.data.name)
            setReferee(response.data.data)
            console.log(referee);}
            );
        }catch (err) {}
    }, [])

    return (
    
        <div>
            <main>
            <Box
              sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
              }}
            >

              <Container maxWidth="md">
              <center>
              <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2JaMNC0bSDBRb4Ob4PjA5dqDxtPBXnXhmgDSl0KIsmA&s"
          	sx={{ width: 80, height: 80 }}
 
            /></center>
                <Typography
                  variant="h3"
                  align="center"
                  color="#70798C"
                  gutterBottom
                >
                   {referee.name} {referee.surname}
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="#70798C"
                  gutterBottom
                >   
                    <Divider>Information</Divider>
                    Age:  {referee.age}
                    <br></br>
                    Matches This Season:  {referee.currentseasonmatches}
                    <br></br>
                    All time Matches:  {referee.totalmatches}
                </Typography>
                
              </Container>
            </Box>
    
          </main>
      </div>
        
        
    )
}

export default RefereeProfile;