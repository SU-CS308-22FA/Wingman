import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import { UsersContext } from "../context/UserContex";
import { db } from "../firestore";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import UserFinder from "../apis/UserFinder";
import { NewChat } from "./NewChat.component";

export const ChatRoomList = () => {
  const { user } = useContext(UsersContext);
  const [chatRooms, setChatRooms] = useState([]);
  const [reporters, setReporters] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const temp = onSnapshot(collection(db, "chatRooms"), (snapshot) => {
        let chats = [];
        snapshot.docs.forEach((doc) => {
            if (doc.data().usersChatting[0].id === user.id || doc.data().usersChatting[1].id === user.id) {
              let otherUser = doc.data().usersChatting[0].id === user.id ? doc.data().usersChatting[1] : doc.data().usersChatting[0]
              let lastMessage = doc.data().lastSender === user.id ? "You: "+ doc.data().lastMessage: otherUser.name +": "+doc.data().lastMessage
                chats.push({ id: doc.id, name: otherUser.name + " "+otherUser.surname, lastMessage: lastMessage, lastMessageCreatedAt: doc.data().lastMessageCreatedAt});
            }
        setChatRooms(chats);
        });
      });
    };
    
    const fetcReporters = async () => {
            try {
            const response = await UserFinder.get("/reporters");
            setReporters(response.data.data.users)
            } catch (err) {}
        };


    fetchData();
    fetcReporters();
  }, []);
  const handleChatRoomSelect = (id) => {
    navigate(`/chat/${id}`); 
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      disableColumnMenu: true,
    },
    {
      field: "lastMessage",
      headerName: "Last Message",
      width: 598,
      disableColumnMenu: true,
    },
    {
      field: "lastMessageCreatedAt",
      headerName: "Last Message At",
      width: 200,
      disableColumnMenu: true,
    },
  ];
  return (
    <center>
      <Paper sx={{ mt: 2 }} component={Box} width={1000} height={430}>
        <DataGrid
          rows={chatRooms}
          columns={columns}
          getRowId={function (row) {
            return row.id;
          }}
          pageSize={20}
          onRowClick={(e) => {
            handleChatRoomSelect(e.row.id);
          }}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Paper>
      <NewChat/>
    </center>
  );
};
