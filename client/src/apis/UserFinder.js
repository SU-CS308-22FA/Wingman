import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://wingman-team29.herokuapp.com/api/wingman"
    : "http://localhost:5000/api/wingman";

let instance = axios.create({
  baseURL: API_URL,
})

export default instance;
