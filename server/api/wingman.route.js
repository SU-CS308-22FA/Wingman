import express from "express";
import authorize from "../middleware/authorize.js";
import verify from "../middleware/verify.js";
import matchController from "./matchController.js";
import passwordController from "./passwordController.js";
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
router.route("/usersarchive").get(userController.getAllArchiveUsers)

router.route("/recover/:id").get(userController.createRecoverRequestUser)
router.route("/recoversend/:id").get(userController.getRecover)
router.route("/recovermail/:id").get(userController.mailRecoverRequestUser)
router.route("/recover").post(userController.recoverUser)
router.route("/recover/:id").delete(userController.permaDel)
router.route("/recommendation/:id").get(userController.getRecommendationById)
router.route("/referees").get(userController.getAllReferees)
router.route("/referees/:id").get(userController.getRefereeById)
router.route("/refereeSort/:par").get(userController.sortReferee)
router.route("/teams").get(userController.getAllTeams)
router.route("/referees/").post(userController.createReferee)
router.route("/teams/:id").get(userController.getTeamById)
router.route("/users/:id").get(authorize, userController.getUserById)
router.route("/users/").post(userController.createUser)
router.route("/users/:id").delete(userController.deleteById)
router.route("/users/:id").patch(userController.updateUser)
router.route("/auth").put(userController.userAuthTemp)
router.route("/rank/:id").get(userController.getRefereeRankings)
router.route("/verify").post(authorize, userController.verify)
router.route("/key").put(userController.createKey)
router.route("/fixture").get(matchController.getMaxWeek)
router.route("/assign/:id").get(matchController.getMatchById)
router.route("/fixture/:id").get(matchController.getMatchDatasByWeek)
router.route("/assign/:matchid/:refid/:wid").patch(matchController.updateReferee)
router.route("/referees/week/:wid").get(userController.getNonAssignedReferees)
router.route("/match/:id").get(matchController.getMatchDataById)
router.route("/reporters").get(userController.getReportes)
router.route("/request").get(userController.getAllRequests)
router.route("/request").post(userController.createDeleteRequest)
router.route("/request").put(userController.acceptDeleteRequest)
router.route("/request").patch(userController.rejectDeleteRequest)
router.route("/rate/").post(matchController.rateMatch)
router.route("/rate/").get(matchController.getRate)
router.route("/reset").post(passwordController.createMail)
router.route("/reset/verify/:token").post(passwordController.verify)
router.route("/reset/:token").post(passwordController.recover)
router.route("/reporters").get(userController.getAllReporters)
router.route("/activereferee/:id").get(userController.getActiveRefereeById)
router.route("/activematches/:id").get(matchController.getPlayedMatchDatasByRef)
router.route("/activematch/:id").get(matchController.getMatchByRefAssign)
router.route("/rank/:col/:id").get(userController.getRank)
router.route("/report/:id/:element/:rep").post(matchController.createReport)
router.route("/report/:id").get(matchController.getReportById)
router.route("/report/:id").delete(matchController.deleteReportById)
router.route("/report").get(matchController.getAllReports)





export default router