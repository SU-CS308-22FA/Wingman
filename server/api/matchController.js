import db from "../db.js"

export default class matchController{
    static async getMatchDataById(req, res, next){
        try {
          const result = await db.query('SELECT m.*, r.name, r.surname, r.age, r.currentseasonmatches,r.avatarurl, t.teamname as home_teamname, t.teamlogo as home_logo, t1.teamname as away_teamname, t1.teamlogo as away_logo FROM wingman.matches m, wingman.referees r, wingman.teams t, wingman.teams t1 WHERE m.match_id = $1 AND  t.teamid = m.home_id AND t1.teamid = m.away_id AND m.referee_id = r.id', [req.params.id])
          if(result.rows.length == 0)
          {
            throw {
              detail: "Match not found.",
              code: 1,
              error: new Error()
            };
          }
          const timeline = await db.query('SELECT * FROM wingman.matchtimelines WHERE match_id = $1', [req.params.id])
          res.status(200).json({
          data: result.rows[0],
          timeline: timeline.rows
          })
        } catch (err) {
          console.log(`Error when getting one match ${err}`)
          if(err.code == 1)
          {
            res.status(404).json({detail:err.detail, data:[]})
            return
          }
          res.status(400).json({detail:err, data:[]})
        }   
      }
}