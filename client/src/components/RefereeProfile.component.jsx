import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import UserFinder from "../apis/UserFinder";
import { Avatar, Chip, Divider } from '@mui/material';
import { UsersContext } from "../context/UserContex";
import { AuthContext } from "../context/authContext";

export const RefereeProfile = () => {
    const [referee, setReferee] = useState({});

    const navigate = useNavigate();
    const queryString = window.location.href;
    const index = queryString.search("referee")
    const id = queryString.substring(index + 8)

    const {user, setUser} = useContext(UsersContext)
  const {setAuth} = useContext(AuthContext)
  const getData = async () => {
    try {
      await UserFinder.get(`/users/1`, {headers: {'jwt_token': localStorage.token}})
      .then(userData =>{
        let val = {
          id: userData.data.data.user_id,
          mail: userData.data.data.mail,
          name: userData.data.data.name,
          surname: userData.data.data.surname,
          role: userData.data.data.role,
        }
        setUser(val)
      })
    } catch (err) {
      console.error(err.message);
    }
  };

  const checkAuthenticated = async () => {
    try {
      const res = await UserFinder.post("/verify", {}, {headers: {'jwt_token': localStorage.token}})
      if (res.data.isAuth === true){
        await getData();
        await setAuth(true);
      }
      else{
        await setAuth(false);
        navigate("/")
      } 
    } catch (err) {
      console.error(err.message);
      await setAuth(false);
      navigate("/")
    }
  };
    
    useEffect( () => {
      checkAuthenticated();
        try {
            UserFinder.get(`/referees/${id}`)
            .then(response =>{
            setReferee(response.data.data)}
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
              src={referee.avatarurl}
          	sx={{ width: 200, height: 200 }}
 
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