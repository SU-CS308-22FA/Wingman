import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserFinder from "../../apis/UserFinder";
import { useParams } from 'react-router-dom';
import { Box, Typography } from "@mui/material";

export const Recover = () => {
    const [isRecoverd, setRecovered] = useState(false);
    const { otp } = useParams();
  
    const fetcData = async () => {
      try {
        const response = await UserFinder.post("/recover", {otp:otp});
        console.log("res:", response);
        setRecovered(true);
      } catch (err) {}
    };
  
    useEffect(() => {
        fetcData();
      console.log(otp)
    }, []);
  
    if(isRecoverd)
    {return (<Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="600px"
      >
        <Typography variant="h5">Your account is successfully recovered! You can login with your old credentials</Typography>
      </Box>)}
    else{
        return (<Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="600px"
          >
            <Typography variant="h5">Bad URL</Typography>
          </Box>)
    }

}