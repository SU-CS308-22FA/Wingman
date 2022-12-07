import db from "../db.js"
import dotenv from "dotenv"

export default class matchController{

  static async getMatchDatas(req, res, next) {
    try {
      
      const results = await db.query('SELECT * ,t.teamname AS HomeTeamName, t1.teamname AS AwayTeamName, t.teamlogo AS HomeTeamLogo, t1.teamlogo AS AwayTeamLogo FROM wingman.matches m, wingman.referees r, wingman.teams t, wingman.teams t1 WHERE  m.home_id = t.teamid AND m.away_id = t1.teamid  AND m.referee_id = r.id;  ')
      res.status(200).json({
        lenght: results.rows.length,
        data:{
          users: results.rows
        }
        
      })
    } catch (error) {
      console.log(`Error when getting all referees ${error.detail}`)
      res.status(400).json({error:error, data:{users:[]}})
    } 
    }
    
}