import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserFinder from "../apis/UserFinder";

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
        <p>{referee.surname}</p>
    )
}

export default RefereeProfile;