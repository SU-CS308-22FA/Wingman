import wingman from "./api/wingman.route.js";
import express from "express";
import cors from "cors";

const app = express()

app.use(cors())
app.use(express.json()) //For funcionality to read json


//initial route > url where app is stored for our case localhost/api/v1/restaurants leads to route in Restaurants file
app.use("/api/Wingman", wingman) 

// After defining your routes, anything that doesn't match what's above, we want to return index.html from our built React app
app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname + '/../client/build/index.html'))
    res.status(404).json({error: "not found"})
})

//export app as a module > than import app to accses database
export default app