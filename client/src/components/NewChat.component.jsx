import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import { UsersContext } from "../context/UserContex";
import { db } from "../firestore";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import UserFinder from "../apis/UserFinder";
import { Container } from "@mui/system";
import { Alert, Button, InputLabel, ListItemText, MenuItem, Select } from "@mui/material";

export const NewChat = () => {
  const { user } = useContext(UsersContext);
  const [reporters, setReporters] = useState([]);
  const navigate = useNavigate();
  const [selUser, setSelUser] = useState("");
  const [idUser, setIdUser] = useState("");
  const [error, setError] = useState(null)


  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
PaperProps: {
    style: {
    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    width: 250,
    },
},
};

   function isValidName(name) {
        if(name != "")
        {
          return true;
        } else{
          return false;
        }
      };

  useEffect(() => {
    const fetcReporters = async () => {
            try {
            const response = await UserFinder.get("/reporters");
            setReporters(response.data.data.users)
            } catch (err) {}
        };
    fetcReporters();
  }, []);

  const handleUserChange = (e, key) => {
    setSelUser(e.target.value);
    const orgKey = key.key.substr(2, key.key.length);
    setIdUser(parseInt(orgKey));
  };

  const handleSubmit = () => {
    const createRoom = async () => {
        try {
          if(!isValidName(selUser)){
            throw{fmessage: "Please select a user."}
          }
          
            let date = new Date().toLocaleString()
            let otherUser = null;
            reporters.forEach((reporter) => {
                if (reporter.user_id === idUser) {
                    otherUser = reporter;
                }
            });
            await addDoc(collection(db, "chatRooms"), {
                lastMessage: "",
                lastMessageCreatedAt: date,
                lastSender: user.id,
                messages: [],
                usersChatting: [user, {id: otherUser.user_id, mail: otherUser.mail, role:otherUser.role, surname:otherUser.surname, name:otherUser.name}]
            }).then(function(docRef) {
                 navigate(`/chat/${docRef.id}`);
            });
            console.log("Done");
            } catch (err) {
              if(err.fmessage)
              setError(err.fmessage)
            console.log(err);
            }
    };
    const fetchData = async () => {
      const temp = await getDocs(collection(db, "chatRooms"));
      let found = false;
      temp.forEach((doc) => {
          if ((doc.data().usersChatting[0].id === user.id || doc.data().usersChatting[1].id === user.id) && 
              (doc.data().usersChatting[0].id === idUser || doc.data().usersChatting[1].id === idUser)) {
              found = true;
              console.log(idUser);
              navigate(`/chat/${doc.id}`);
          }
      });
      if (!found) {
          createRoom();
      }
    };
    fetchData();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
              <Box>
                <Select
                  labelId="user"
                  id="user"
                  value={selUser}
                  onChange={handleUserChange}
                  style={{ width: 250 }}
                  MenuProps={MenuProps}
                >
                  {reporters.map((reporter) => (
                    <MenuItem key={reporter.user_id} value={reporter.name + " "+ reporter.surname}>
                        <ListItemText primary={reporter.name + " "+ reporter.surname} />
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box sx={{ width: 250 }}>
              {error &&<Alert variant="filled" severity="error"> {error} </Alert>}
              </Box>
              <Button onClick={handleSubmit} variant="contained" sx={{ width: 250}}>
                  New Chat
              </Button>
          </Container>
  );
};
