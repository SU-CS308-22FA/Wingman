import axios from "axios";

export default axios.create({
  baseURL: "https://wingman-team29.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  }
});