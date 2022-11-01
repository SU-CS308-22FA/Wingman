import wingman from "./api/wingman.route.js";
import express from "express";
import cors from "cors";


const app = express()

app.use(cors())
app.use(express.json()) //For funcionality to read json

app.use("/api/Wingman", wingman) 


//export app as a module > than import app to accses database
export default app