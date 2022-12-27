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

      

      static async getPlayedMatchDatasByRef(req, res, next) {
        try {
          
          const results = await db.query('SELECT * ,t.teamname AS HomeTeamName, t1.teamname AS AwayTeamName, t.teamlogo AS HomeTeamLogo, t1.teamlogo AS AwayTeamLogo FROM wingman.matches m, wingman.referees r, wingman.teams t, wingman.teams t1 WHERE  m.home_id = t.teamid AND m.away_id = t1.teamid  AND m.referee_id = r.id AND r.user_id = $1 AND is_played = true ;  ', [req.params.id])
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
    /**
 * Get a match by its ID from the `wingman.matches` table.
 *
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 *
 * @throws {NotFoundError} - { detail: 'Match not found.', code: 1} If the match is not found
 * @throws {DatabaseError} - { detail: 'Error when getting one match' } If there is a general error
 *
 * @return {JSON} - The response json with the data of the match given
 */
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

    static async getMatchByRefAssign(req, res, next){
      try {
        const result = await db.query('SELECT * ,t.teamname AS HomeTeamName, t1.teamname AS AwayTeamName, t.teamlogo AS HomeTeamLogo, t1.teamlogo AS AwayTeamLogo FROM wingman.matches m, wingman.referees r, wingman.teams t, wingman.teams t1 WHERE  m.home_id = t.teamid AND m.away_id = t1.teamid  AND m.referee_id = r.id AND r.user_id = $1 AND is_played = false ;  ', [req.params.id])
        

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
    
    //const result = await db.query('SELECT * ,team.teamname AS HomeTeamName, team1.teamname AS AwayTeamName FROM wingman.report r, wingman.users u,wingman.teams team, wingman.matchtimelines t, wingman.matches m, wingman.teams team1 WHERE r.reported_element_id = t.timeline_id AND t.match_id = m.match_id AND r.reporter_id = u.user_id AND m.home_id = team.teamid AND m.away_id = team1.teamid  AND r.reporter_id = $1 ORDER BY m.match_id  ', [req.params.id])

    static async getReportById(req, res, next) {
      try {
        
        const results = await db.query('SELECT * ,team.teamname AS HomeTeamName, team1.teamname AS AwayTeamName FROM wingman.report r, wingman.users u,wingman.teams team, wingman.matchtimelines t, wingman.matches m, wingman.teams team1 WHERE r.reported_element_id = t.timeline_id AND t.match_id = m.match_id AND r.reporter_id = u.user_id AND m.home_id = team.teamid AND m.away_id = team1.teamid  AND r.reporter_id = $1 ORDER BY m.match_id  ', [req.params.id])
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

      static async getAllReports(req, res, next) {
        try {
          
          const results = await db.query('SELECT * ,team.teamname AS HomeTeamName, team1.teamname AS AwayTeamName FROM wingman.report r, wingman.users u,wingman.teams team, wingman.matchtimelines t, wingman.matches m, wingman.teams team1 WHERE r.reported_element_id = t.timeline_id AND t.match_id = m.match_id AND r.reporter_id = u.user_id AND m.home_id = team.teamid AND m.away_id = team1.teamid ORDER BY m.match_id  ')
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

      static async deleteReportById(req, res, next){
        try {
          const results = await db.query("DELETE FROM wingman.report WHERE report_id = $1 returning *", [req.params.id])
          if(results.rows.length == 0)
            {
              throw {
                detail: "User not found.",
                code: 1,
                error: new Error()
              };
            }
    
          res.status(200).json({data: results.rows[0]})
        } catch (err) {
          console.log(`Failed to delete user ${err}.`)
            if(err.code == 1)
            {
              res.status(404).json({detail:err.detail, data:[]})
              return
            }
            res.status(400).json({detail:err, data:[]})
        }   
      }

    /**
     * This function gets match data for a given week.
     * @param {Object} req - The request object containing information about the request.
     * @param {Object} res - The response object used to send a response to the client.
     * @param {function} next - The next middleware function in the application's request-response cycle.
     * @returns {JSON} An object containing the length of the match data and the match data itself.
     */

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
          const timeline = await db.query('SELECT * FROM wingman.matchtimelines WHERE match_id = $1 ORDER BY event_time::int ASC', [req.params.id])
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

      static async rateMatch(req, res, next){
        try {
          const userRole = await db.query('SELECT role FROM wingman.users WHERE user_id = $1', [req.body.user_id])
          if(userRole.rows.length == 0)
          {
            throw {
              detail: "Rater not found.",
              code: 1,
            };
          }
          if(userRole.rows[0].role == "TFF Admin" || userRole.rows[0].role == "Super Admin")
          {
            throw {
              detail: "User can't rate.",
              code: 1,
            };
          }
          const match = await db.query('SELECT * FROM wingman.matches WHERE match_id = $1', [req.body.match_id])
          if(match.rows.length == 0)
          {
            throw {
              detail: "Match not found.",
              code: 1,
            };
          }
          let r_id = match.rows[0].referee_id;
        
          if(req.body.rate <= 0 || req.body.rate >= 11)
          {
            throw {
              detail: "Rate range wrong.",
              code: 1,
            };
          }
          const result = await db.query('SELECT * FROM wingman.ratings WHERE user_id = $1 AND match_id = $2', [req.body.user_id, req.body.match_id])
          if(result.rows.length != 0)
          {
            throw {
              detail: "You already rated this match.",
              code: 1
            };
          }

          const newInsert = await db.query('INSERT INTO wingman.ratings (referee_id, user_id, match_id, rate) VALUES ($1, $2, $3, $4) returning *', [r_id, req.body.user_id, req.body.match_id, req.body.rate])
          if(newInsert.rows.length == 0)
          {
            throw {
              detail: "Error on insert.",
              code: 1
            };
          }

          res.status(200).json({
          data: newInsert.rows[0],
          })
        } catch (err) {
          console.log(`Error when rating ${err}`)
          if(err.code == 1)
          {
            res.status(401).json({detail:err.detail, data:[]})
            return
          }
          res.status(400).json({detail:err, data:[]})
        }   
      }

/**
 * Get one or more rates from the `wingman.ratings` table.
 *
 * @param {Object} req - The request object.
 * @param {string} req.query.uid - The user ID of the rate(s).
 * @param {string} req.query.rid - The referee ID of the rate(s).
 * @param {string} req.query.mid - The match ID of the rate(s).
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function in the app.
 *
 * @returns {Array} The rate(s) that were retrieved. Each array is json with it's info.
 *
 * @throws {NotFoundError} If no rate is found for the specified parameters.
 * @throws {DatabaseError} If a database error occurs while getting the rate(s).
 */
      static async getRate(req, res, next){
        try {
          const uid = req.query.uid;
          const rid = req.query.rid;
          const mid = req.query.mid;
          let result = [];
          let avg = -1;
          // Get rates where user_id, referee_id, and match_id all match the provided values or any combination.
          if(uid && rid && mid)
          {
            result = await db.query('SELECT * FROM wingman.ratings WHERE user_id = $1 AND referee_id = $2 AND match_id = $3', [uid,rid,mid])
            avg = await db.query('SELECT AVG(rate)::numeric(10,2) FROM wingman.ratings WHERE user_id = $1 AND referee_id = $2 AND match_id = $3', [uid,rid,mid])
          }
          else if(uid && rid)
          {
            result = await db.query('SELECT * FROM wingman.ratings WHERE user_id = $1 AND referee_id = $2', [uid,rid])
            avg = await db.query('SELECT AVG(rate)::numeric(10,2) FROM wingman.ratings WHERE user_id = $1 AND referee_id = $2', [uid,rid])
          }
          else if(uid && mid)
          {
            result = await db.query('SELECT * FROM wingman.ratings WHERE user_id = $1 AND match_id = $2', [uid,mid])
            avg = await db.query('SELECT AVG(rate)::numeric(10,2) FROM wingman.ratings WHERE user_id = $1 AND match_id = $2', [uid,mid])
          }
          else if(rid && mid)
          {
            result = await db.query('SELECT * FROM wingman.ratings WHERE referee_id = $1 AND match_id = $2', [rid,mid])
            avg = await db.query('SELECT AVG(rate)::numeric(10,2) FROM wingman.ratings WHERE referee_id = $1 AND match_id = $2', [rid,mid])
          }
          else if(uid)
          {
            result = await db.query('SELECT * FROM wingman.ratings WHERE user_id = $1', [uid])
            avg = await db.query('SELECT AVG(rate)::numeric(10,2) FROM wingman.ratings WHERE user_id = $1', [uid])
          }
          else if(rid)
          {
            result = await db.query('SELECT * FROM wingman.ratings WHERE referee_id = $1', [rid])
            avg = await db.query('SELECT AVG(rate)::numeric(10,2) FROM wingman.ratings WHERE referee_id = $1', [rid])
          } 
          else if(mid)
          {
            result = await db.query('SELECT * FROM wingman.ratings WHERE match_id = $1', [mid])
            avg = await db.query('SELECT AVG(rate)::numeric(10,2) FROM wingman.ratings WHERE match_id = $1', [mid])
          }  
          else
          {
            result = await db.query('SELECT * FROM wingman.ratings')
            avg = await db.query('SELECT AVG(rate)::numeric(10,2) FROM wingman.ratings')
          }

          if(result.rows.length == 0)
          {
            throw {
              detail: "Rate not found.",
              code: 1,
            };
          }
          res.status(200).json({
          data: result.rows,
          avg: avg.rows[0],
          })
        } catch (err) {
          console.log(`Error when getting one rate ${err}`)
          if(err.code == 1)
          {
            res.status(404).json({detail:err.detail, data:[]})
            return
          }
          res.status(400).json({detail:err, data:[]})
        }   
      }


      static async createReport(req, res, next){
        try {
          const newReport = await db.query('INSERT INTO wingman.report (reporter_id, reported_element_id, report) values ($1,$2,$3) returning *'
          , [req.params.id,req.params.element, req.params.rep])
          res.status(200).json({
            data: newReport.rows[0],
          })
    
        } catch (error) {
          console.log(`Error when creating report ${JSON.stringify(error)}`)
          console.log(`Error when creating report ${error}`)
          if(String(error).includes("users_mail_key") )
          {
            res.status(401).json({error:error, data:{users:[]}})
          }
          else if(error.code == 1)
          {
            res.status(402).json({detail:error.detail, data:[]})
            return
          }
          else{
            res.status(400).json({error:error, data:{users:[]}})
          }
    
          
        }   
    }

}