import wingman from "./api/wingman.route.js";
import express from "express";
import cors from "cors";
import path from "path"
import {fileURLToPath} from 'url';

const app = express()

app.use(cors())
app.use(express.json()) //For funcionality to read json

app.use("/api/Wingman", wingman) 
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
// After defining your routes, anything that doesn't match what's above, we want to return index.html from our built React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/build/index.html'))
    //res.status(404).json({error: "not found in server.js"})
})

//export app as a module > than import app to accses database
export default app