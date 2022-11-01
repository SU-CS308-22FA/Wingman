import db from "../db.js"
import bcrypt from "bcrypt"

export default class userController{
    static async getAllUsers(req, res, next){
        try {
          const results = await db.query('SELECT * FROM wingman.users')
          res.status(200).json({
            lenght: results.rows.length,
            data:{
              users: results.rows
            }
          })
        } catch (error) {
          console.log(`Error when getting all users ${error.detail}`)
          res.status(400).json({error:error, data:{users:[]}})
        }   
    }

    static async getUserById(req, res, next){
      try {
        const result = await db.query('SELECT * FROM wingman.users WHERE user_id = $1', [req.params.id])
        if(result.rows.length == 0)
        {
          throw {
            detail: "User not found.",
            code: 1,
            error: new Error()
          };
        }

        res.status(200).json({
        data: result.rows[0]
        })
      } catch (err) {
        console.log(`Error when getting one user ${err.detail}`)
        if(err.code == 1)
        {
          res.status(404).json({detail:err.detail, data:[]})
          return
        }
        res.status(400).json({detail:err, data:[]})
      }   
    }

    static async createUser(req, res, next){
      try {
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(req.body.password, salt);
        console.log(`I have recived this data from request ${req.body} "Full request:${req}"`)
        const newUser = await db.query('INSERT INTO wingman.users (mail,name,surname, password) values ($1,$2,$3,$4) returning *'
        , [req.body.mail, req.body.name, req.body.surname, hashed_password])
        res.status(200).json({
          data: newUser.rows[0]
        })

      } catch (error) {
        console.log(`Error when creating user ${error}`)
        res.status(400).json({error:error, data:{users:[]}})
      }   
  }

  static async updateUser(req, res, next){
    try {

      //TODO: Update with null fields.
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(req.body.password, salt);
      const results = await db.query('UPDATE wingman.users SET mail = $1 ,name = $2 ,surname = $3, password = $4 WHERE user_id = $5 returning *'
      , [req.body.mail, req.body.name, req.body.surname, hashed_password, req.params.id])

      if(results.rows.length == 0)
        {
          throw {
            detail: "User not found.",
            code: 1,
            error: new Error()
          };
        }



      res.status(200).json({data: results.rows[0]})
    } catch (error) {
      console.log(`Failed to update user ${error}.`)
      res.status(400).json({detail:error.detail})
    }   
  }

  static async deleteById(req, res, next){
    try {
      const results = await db.query("DELETE FROM wingman.users WHERE user_id = $1 returning *", [req.params.id])
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

}