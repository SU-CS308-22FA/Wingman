import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate} from "react-router-dom"
import React, { useContext, useState, useEffect } from "react";
import UserFinder from "../apis/UserFinder";
import { UsersContext } from "../context/UserContex";




const ProfilePage = ({}) => {
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

  return (
    <div>
      {isLoading? 
            <h1>Loading...</h1>
          :
          <main>
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                variant="h3"
                align="center"
                color="#70798C"
                gutterBottom
              >
                Welcome {user.name}!
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="#70798C"
                gutterBottom
              >
                {user.name} {user.surname}
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="#70798C"
                gutterBottom
              >
                  {user.mail}
              </Typography>
              <Typography variant="h6" align="center" color="text.secondary" paragraph>
                  Welcome the Wingman, {user.name}! You will be able to see information about the user in the near future. For now, you can update your name if you did any mistake or you can delete your account to start again!
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button onClick={onUpdate} color = 'fourth' variant="contained">UPDATE ACCOUNT</Button>
                <Button onClick={onDelete} color = 'error' variant="contained">DELETE ACCOUNT</Button>
              </Stack>
            </Container>
          </Box>
  
        </main>
          }
    </div>
  );
}

export default ProfilePage