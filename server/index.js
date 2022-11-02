import app from "./server.js"
import dotenv from "dotenv";
import express from "express"
import path from "path"
import {fileURLToPath} from 'url';
//Initialize env path
dotenv.config({
    path: '../.env'
})
//const __dirname = "wingman"

//const API_URL =
  //process.env.NODE_ENV === "production"
    //? "YOUR_APP_URL"
    //: "http://localhost:5000";

const __filename = fileURLToPath(import.meta.url)
console.log(__filename)
const __dirname = path.dirname(__filename);
console.log(__dirname)
// Serve static files from the React frontend app

console.log(path.join(__dirname + '/../client/build'))


app.listen(process.env.PORT || 5000, () => {
    console.log(`server has started on port ${process.env.PORT || 5000}`)
})