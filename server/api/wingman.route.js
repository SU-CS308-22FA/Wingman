import express from "express";
import userController from './userController.js';


//Api calls are done through uri and router routes uri correct functions
//get request send through uri > router makes correct controllerCall > controller makes DBOcall > DBO returns results from db to controller > controller adds json to response of the request
const router = express.Router()

router.use(express.json())

//tell a route to look for a GET request on the root "/" URL and return some JSON:
router.route("/test").get((req, res) => {
    res.json({ info: 'You request to WingmanApi has been received!' })
  })

router.route("/users").get(userController.getAllUsers)


export default router