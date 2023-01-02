import {
  Button,
  Grid,
  TextField,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firestore";
import { doc, onSnapshot, updateDoc, getDoc } from "firebase/firestore";
import { UsersContext } from "../context/UserContex";
import { Box } from "@mui/system";
import { useRef } from "react";

const Chat = () => {
  const [value, setValue] = useState("");
  const { user } = useContext(UsersContext);
  const [chatRoom, setChatRoom] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const { id } = useParams();

  const sendMessage = async () => {
    if(value === ""){

    }
    else{
    setValue("");
    const docRef = doc(db, "chatRooms", id);
    const docSnap = await getDoc(docRef);
    let date = new Date().toLocaleString()
    if (docSnap.exists()) {
        let data = {
        messages: [
          ...messages,
          {
            content: value,
            sender_id: user.id,
            timestamp: date
          },
        ],
        lastMessage: value,
        lastSender: user.id,
        lastMessageCreatedAt: date,
      }
      await updateDoc(docRef, data);
    } else {
      console.log("No such document!");
    }
}
  };

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chatRooms", id), (doc) => {
      setChatRoom(doc.data());
      setMessages(doc.data().messages);
      setLoading(false)
    });
    return () => unsub();
  }, [id]);
  const chatListRef = useRef(null);

useEffect(() => {
    if (chatListRef.current) {
  chatListRef.current.scrollIntoView({ behavior: 'smooth' });
}
}, [messages]);

    if (!isLoading) {
  return (
    <div style={{
          width: "100%",
          height: "65vh",
        }}>
      <Typography
        variant="h5"
        align="center"
        fontWeight="600"
        sx={{ mt: 4, mb: 4 }}
      >
        {chatRoom.usersChatting[0].id === user.id ? chatRoom.usersChatting[1].name : chatRoom.usersChatting[0].name} {chatRoom.usersChatting[0].id === user.id ? chatRoom.usersChatting[1].surname : chatRoom.usersChatting[0].surname}
      </Typography>
      <div
        style={{
          width: "100%",
          height: "55vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((message) => (
          <div
            style={{
              display: "flex",
              justifyContent:
                user.id === message.sender_id
                  ? "flex-end"
                  : "flex-start",
            }}
          >
            <Card
              style={{
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
                borderBottomLeftRadius: user.id === message.sender_id ? 35 : 0,
                borderBottomRightRadius: user.id === message.sender_id ? 0 : 35,
                backgroundColor:
                  user.id === message.sender_id ? "#A99985" : "#DAD2BC",
                margin: "0px 40px 10px 40px", // add margin to top
                border:
                  user.id === message.sender_id ? "#1d3557" : "#CADFE2",
                width: "35%",
                padding: 1,
                fontSize: "0.8rem",
              }}
            >
              <CardContent
                style={{
                  color:"#252323",
                }}
              >
                <Typography variant="body2">
                  {user.id === message.sender_id ? "You" : chatRoom.usersChatting[0].id === user.id ? chatRoom.usersChatting[1].name : chatRoom.usersChatting[0].name}
                </Typography>
                <Typography variant="body3">{message.content}</Typography>
                <div
            style={{
              display: "flex",
              justifyContent:"flex-end",
            }}
          >
                <Typography variant="body3">{message.timestamp}</Typography>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
        <div ref={chatListRef}></div>
      </div>
            <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        >
        <Grid item>
        <TextField
          mt={20}
          style={{ width: "170vh" }}
          variant={"outlined"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        </Grid>
        <Grid item>
        <Button
          variant="contained"
          sx={{ mt: 5, mb: 5, align: "center" }}
          onClick={sendMessage}
        >
          Send{" "}
        </Button>
        </Grid>
        </Grid>
      <Grid
        container
        direction={"column"}
        alignItems={"flex-end"}
        style={{ width: "80%" }}
      ></Grid>
    </div>
  );
    } else {
        return (
      <div>
        <Box m={0} pt={34}> </Box>
        <center> <CircularProgress /></center>
        <Box m={0} pt={34}> </Box>
      </div>
    );
    }
};

export default Chat;
