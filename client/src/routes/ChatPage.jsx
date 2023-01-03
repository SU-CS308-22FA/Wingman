import React, { useContext, useState, useEffect } from "react";
import Copyright from "../components/Copyright.component";
import RefAppBar from "../components/RetiredRefReporterAppBar";
import Box from '@mui/material/Box';
import { UsersContext } from "../context/UserContex";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import UserFinder from "../apis/UserFinder";
import { CircularProgress } from "@mui/material";
import Chat from "../components/Chat.component";
import { db } from "../firestore";
import { doc, getDoc } from "firebase/firestore";

const ChatPage = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true)
  const { id } = useParams();
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
        checkChatters(userData.data.data.user_id);
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

  const checkChatters = async (user_id) => {
    try {
        const docRef = doc(db, "chatRooms", id);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data())
        if (docSnap.exists()) {
            if(docSnap.data().usersChatting[0].id === user_id || docSnap.data().usersChatting[1].id === user_id)
            {
              setLoading(false);
            }
            else{
                navigate("/profile");
                }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (err) {
        console.error(err.message);
    }
    };


  useEffect(() => {
    checkAuthenticated();
  }, []);
  if(isLoading || user === undefined){
    return (
      <div>
        <Box m={0} pt={34}> </Box>
        <center> <CircularProgress /></center>
        <Box m={0} pt={34}> </Box>
      </div>
    );
  }
  else if(user.role == "Reporter" || user.role == "Retired Referee"){
    return (
      <div>
        <RefAppBar/>
        <Chat/>
      </div>
    );
  }
  else if(user !== undefined){
    navigate("/profile")
  }
  else{
    return (
      <div>
        <Box m={0} pt={34}> </Box>
        <center> <CircularProgress /></center>
        <Box m={0} pt={34}> </Box>
      </div>
    );
  }
}
   
  export default ChatPage;