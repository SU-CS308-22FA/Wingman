import app from "./server.js"
import dotenv from "dotenv";
import express from "express";
import path from  "path";

//Initialize env path
dotenv.config({
    path: '../.env'
})
const __dirname = "wingman"

const API_URL =
  process.env.NODE_ENV === "production"
    ? "YOUR_APP_URL"
    : "http://localhost:5000";


// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/build')))


app.listen(process.env.PORT || 5000, () => {
    console.log(`server has started on port ${process.env.PORT || 5000}`)
})