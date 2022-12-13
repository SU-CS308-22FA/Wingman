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
      console.log(`Error when getting all matches ${error.detail}`)
      res.status(400).json({error:error, data:{users:[]}})
    } 
    }

    static async getMatchDatasByWeek(req, res, next) {
      try {
        
        const results = await db.query('SELECT * ,t.teamname AS HomeTeamName, t1.teamname AS AwayTeamName, t.teamlogo AS HomeTeamLogo, t1.teamlogo AS AwayTeamLogo FROM wingman.matches m, wingman.referees r, wingman.teams t, wingman.teams t1 WHERE  m.home_id = t.teamid AND m.away_id = t1.teamid  AND m.referee_id = r.id AND m.week = $1 ORDER BY match_id ;  ', [req.params.id])
        res.status(200).json({
          lenght: results.rows.length,
          data:{
            users: results.rows
          }
          
        })
      } catch (error) {
        console.log(`Error when getting matches for a week ${error.detail}`)
        res.status(400).json({error:error, data:{users:[]}})
      } 
      }


    static async getMatchById(req, res, next){
      try {
        const result = await db.query('SELECT * ,t.teamname AS HomeTeamName, t1.teamname AS AwayTeamName, t.teamlogo AS HomeTeamLogo, t1.teamlogo AS AwayTeamLogo FROM wingman.matches m, wingman.referees r, wingman.teams t, wingman.teams t1 WHERE m.match_id = $1 AND m.home_id = t.teamid AND m.away_id = t1.teamid  AND m.referee_id = r.id;  ', [req.params.id])
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
        console.log(`Error when getting one match ${err}`)
        if(err.code == 1)
        {
          res.status(404).json({detail:err.detail, data:[]})
          return
        }
        res.status(400).json({detail:err, data:[]})
      }   
    }

    static async getMaxWeek(req, res, next){
      try {
        const result = await db.query('SELECT MAX(week) FROM wingman.matches')
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
        console.log(`Error when getting one match ${err}`)
        if(err.code == 1)
        {
          res.status(404).json({detail:err.detail, data:[]})
          return
        }
        res.status(400).json({detail:err, data:[]})
      }   
    }

    static async updateReferee(req, res, next){
      try{
        const check = await db.query('SELECT name, surname, r.totalmatches, r.totalyellowcards, r.totalredcards, age, currentseasonmatches, totalfoulspg, totalfoulsdivtackles, totalpenpg, totalyelpg,totalredpg, currentfoulspg, currentfoulsdivtackles, currentpenpg, currentyelpg, currentyel, currentredpg, currentred, avatarurl, id  FROM wingman.matches m, wingman.referees r, wingman.teams t, wingman.teams t1 WHERE  m.home_id = t.teamid AND m.away_id = t1.teamid  AND m.referee_id = r.id AND m.week = $1;', [req.params.wid])
        const refs = check.rows;

        for (var i = 0; i < refs.length; i++) { 
          if(req.params.refid == refs[i].id){
            throw {
              detail: "This Referee is already assigned to a match for this week",
              code: 1,
              error: new Error()
            };
          } 
        }

        
       
      }
      catch{
        console.log("This Referee is already assigned to a match for this week")
      }
      try {
        const result = await db.query('UPDATE wingman.matches SET referee_id = $2 WHERE match_id = $1 returning *', [req.params.matchid, req.params.refid])
        if(result.rows.length == 0)
        {
          throw {
            detail: "Update not found.",
            code: 1,
            error: new Error()
          };
        }

        res.status(200).json({
        data: result.rows[0]
        })
      } catch (err) {
        console.log(`Error when updating one match ${err}`)
        if(err.code == 1)
        {
          res.status(404).json({detail:err.detail, data:[]})
          return
        }
        res.status(400).json({detail:err, data:[]})
      }   
    }


    
}