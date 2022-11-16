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
router.route("/referees").get(userController.getAllReferees)
router.route("/referees/:id").get(userController.getRefereeById)
router.route("/refereeSort/:par").get(userController.sortReferee)
router.route("/users/:id").get(userController.getUserById)
router.route("/users/").post(userController.createUser)
router.route("/users/:id").delete(userController.deleteById)
router.route("/users/:id").patch(userController.updateUser)
router.route("/auth").put(userController.userAuthTemp)






export default router