import Copyright from "../../components/Copyright.component";
import WellcomeAppBar from "../../components/WelcomeBar";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../context/UserContex";
import { AuthContext } from "../../context/authContext";
import UserFinder from "../../apis/UserFinder";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ReporterList } from "../../components/ReportorList.component";
import { DeleteRequestList } from "../../components/DeleteRequests.component";

const DeleteRequestPage = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const { user, setUser } = useContext(UsersContext);
  const { setAuth } = useContext(AuthContext);
  const getData = async () => {
    try {
      await UserFinder.get(`/users/1`, {
        headers: { jwt_token: localStorage.token },
      }).then((userData) => {
        let val = {
          id: userData.data.data.user_id,
          mail: userData.data.data.mail,
          name: userData.data.data.name,
          surname: userData.data.data.surname,
          role: userData.data.data.role,
        };
        setUser(val);
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const checkAuthenticated = async () => {
    try {
      const res = await UserFinder.post(
        "/verify",
        {},
        { headers: { jwt_token: localStorage.token } }
      );
      if (res.data.isAuth === true) {
        await getData();
        await setAuth(true);
        setLoading(false);
      } else {
        await setAuth(false);
        navigate("/");
      }
    } catch (err) {
      console.error(err.message);
      await setAuth(false);
      navigate("/");
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  if (isLoading || user === undefined) {
    return (
      <div>
        <Box m={0} pt={34}>
          {" "}
        </Box>
        <center>
          {" "}
          <CircularProgress />
        </center>
      </div>
    );
  } else if (user.role == "Super Admin") {
    return (
      <div>
        <WellcomeAppBar />
        <DeleteRequestList />
        <Box m={0} pt={34}>
          {" "}
        </Box>

        <center>
          {" "}
          <img
            src="https://i.hizliresim.com/t6q9rs6.png"
            height="66"
            width="50"
          />
        </center>
        <Copyright sx={{ mt: 5 }} />
      </div>
    );
  } else if (
    user.role == "Reporter" ||
    user.role == "Retired Referee" ||
    user.role == "TFF Admin"
  ) {
    navigate("/profile/");
  } else {
    return (
      <div>
        <Box m={0} pt={34}>
          {" "}
        </Box>
        <center>
          {" "}
          <CircularProgress />
        </center>
      </div>
    );
  }
};

export default DeleteRequestPage;
