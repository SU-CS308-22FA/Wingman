import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import UserFinder from "../apis/UserFinder";
import { Avatar, Chip, Divider } from '@mui/material';

export const TeamProfile = () => {
    const [team, setTeam] = useState({});

    const queryString = window.location.href;
    const index = queryString.search("teams")
    const id = queryString.substring(index + 6)
    
    useEffect( () => {
        try {
            UserFinder.get(`/teams/${id}`)
            .then(response =>{
            setTeam(response.data.data)
            console.log(team);}
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
                <Typography
                  variant="h3"
                  align="center"
                  color="#70798C"
                  gutterBottom
                >
                   {team.teamname} 
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="#70798C"
                  gutterBottom
                >   
                This profile with full details will be implemented in the next sprint.
                </Typography>
                
              </Container>
            </Box>
    
          </main>
      </div>
        
        
    )
}

export default TeamProfile;