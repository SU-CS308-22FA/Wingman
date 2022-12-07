import db from "../db.js"
import dotenv from "dotenv"

export default class matchController{
    static async getMatchDataById(req, res, next){
        try {
          const result = await db.query('SELECT * FROM wingman.matches m, wingman.referees r, wingman.matchtimelines tl, wingman.teams t WHERE m.match_id = $1 AND  t.teamid = m.home_id AND t.teamid = m.away_id AND m.referee_id = r.id', [req.params.id])
          if(result.rows.length == 0)
          {
            throw {
              detail: "Match not found.",
              code: 1,
              error: new Error()
            };
          }
          res.status(200).json({
          data: result.rows[0]
          })
        } catch (err) {
          console.log(`Error when getting one referee ${err}`)
          if(err.code == 1)
          {
            res.status(404).json({detail:err.detail, data:[]})
            return
          }
          res.status(400).json({detail:err, data:[]})
        }   
      }
}