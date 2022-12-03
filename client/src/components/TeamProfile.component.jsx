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
  const [team, setTeam] = useState(null);
  
  const queryString = window.location.href;
  const id = queryString.match(/teams\/(\d+)/)[1];
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await UserFinder.get(`/teams/${id}`);
        if (response.data.data.data) {
          setTeam(prevTeam => response.data.data.data);
        } else {
          setTeam(prevTeam => []);
        }
      } catch (err) {
        setTeam(prevTeam => []);
      }
    }
  
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    team !== null ? (
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
                {team.length}
                {team[9].teamname}

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
    ) : null
  )
}

export default TeamProfile;