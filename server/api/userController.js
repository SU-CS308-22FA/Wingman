import db from "../db.js";
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator.js";
import authorize from "../middleware/authorize.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({
  path: "../../.env",
});

<<<<<<< HEAD
export default class userController {
  static async getAllUsers(req, res, next) {
=======
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

    static async getAllReferees(req, res, next) {
      try {
        
        const results = await db.query('SELECT * FROM wingman.referees WHERE id != 0 order by id')
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
<<<<<<< HEAD

      static async getNonAssignedReferees(req, res, next) {
        
        try {
          
          const results = await db.query('SELECT * FROM wingman.referees WHERE id != 0 EXCEPT SELECT name, surname, r.totalmatches, r.totalyellowcards, r.totalredcards, age, currentseasonmatches, totalfoulspg, totalfoulsdivtackles, totalpenpg, totalyelpg,totalredpg, currentfoulspg, currentfoulsdivtackles, currentpenpg, currentyelpg, currentyel, currentredpg, currentred, avatarurl, id  FROM wingman.matches m, wingman.referees r, wingman.teams t, wingman.teams t1 WHERE  m.home_id = t.teamid AND m.away_id = t1.teamid  AND m.referee_id = r.id AND m.week = $1;', [req.params.wid])
          
          res.status(200).json({
            lenght: results.rows.length,
            data:{
              users: results.rows
            }
            
          })
        } catch (error) {
          console.log(`Error when getting non-assigned referees for a week ${error.detail}`)
          res.status(400).json({error:error, data:{users:[]}})
        } 
        }

=======
      /**
       * Gets a referee by ID from the database.
       *
       * @param {Object} req - The request object.
       * @param {Object} res - The response object.
       * @param {function} next - The next middleware function in the route.
       *
       * @throws {Error} If the referee cannot be found.
       *
       * @returns {Object} The response object, containing the data for the found referee.
       */
  
>>>>>>> refs/rewritten/feature-dev-6
      static async getRefereeById(req, res, next){
        try {
          
<<<<<<< HEAD
          const result = await db.query('SELECT wingman.referees.*, COALESCE(AVG(rate), 11) AS avg_rate FROM wingman.referees LEFT JOIN wingman.ratings ON id = referee_id  WHERE id = $1 GROUP BY(id, referee_id)', [req.params.id])
=======
          const result = await db.query('SELECT * FROM wingman.referees WHERE id = $1', [req.params.id])
>>>>>>> refs/rewritten/feature-dev-3
          if(result.rows.length == 0)
          {
            throw {
              detail: "Referee not found.",
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

      static async getTeamById(req, res, next){
        try {
          
          const result = await db.query('SELECT DISTINCT * FROM wingman.teams t, wingman.teamref R WHERE teamid = $1 AND  t.teamname = R.teamname', [req.params.id])
          if(result.rows.length == 0)
          {
            throw {
              detail: "Team not found.",
              code: 1,
              error: new Error()
            };
          }
          res.status(200).json({
            data:{
              data: result.rows
            }
          })
        } catch (err) {
          console.log(`Error when getting one team ${err}`)
          if(err.code == 1)
          {
            res.status(404).json({detail:err.detail, data:[]})
            return
          }
          res.status(400).json({detail:err, data:[]})
        }   
      }
      // static async doubleQueryForFutureReference(req, res, next) {
      //   try {
      //     // First, get the team data
      //     const teamQuery = await db.query('SELECT DISTINCT * FROM wingman.teams t, wingman.teamref R WHERE teamid = $1 AND  t.teamname = R.teamname', [req.params.id]);
      
      //     // Then, get the referees data
      //     const refereesQuery = await db.query('SELECT id FROM wingman.referees');
      
      //     // Use Promise.all() to wait for both queries to finish
      //     const [teamData, refereesData] = await Promise.all([teamQuery, refereesQuery]);
      
      //     if (teamData.rows.length == 0) {
      //       throw {
      //         detail: "Team not found.",
      //         code: 1,
      //         error: new Error()
      //       };
      //     }
      
      //     res.status(200).json({
      //       data: {
      //         team: teamData.rows,
      //         referees: refereesData.rows
      //       }
      //     });
      //   } catch (err) {
      //     console.log(`Error when getting one team ${err}`);
      
      //     if (err.code == 1) {
      //       res.status(404).json({detail: err.detail, data: []});
      //       return;
      //     }
      //     res.status(400).json({detail: err, data: []});
      //   }
      // }
      static async sortReferee(req, res, next){
        try {
          
          const result = await db.query(`SELECT * FROM wingman.referees ORDER BY ${req.params.par} ASC`)
          console.log(result.rows);
          if(result.rows.length == 0)
          {
            throw {
              detail: "Could not sort.",
              code: 1,
              error: new Error()
            };
          }
  
          res.status(200).json({
            data: result.rows
          })
        } catch (err) {
          console.log(`Error when sorting referees ${err}`)
          if(err.code == 1)
          {
            res.status(404).json({detail:err.detail, data:[]})
            return
          }
          res.status(400).json({detail:err, data:[]})
        }   
      }
    
      static async getAllTeams(req, res, next) {
        try {
          const results = await db.query('SELECT * FROM wingman.teams')
          
          res.status(200).json({
            lenght: results.rows.length,
            data:{
              users: results.rows
            }
            
          })
        } catch (error) {
          console.log(`Error when getting all teams ${error.detail}`)
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
        console.log(`Error when getting one user ${err}`)
        if(err.code == 1)
        {
          res.status(404).json({detail:err.detail, data:[]})
          return
        }
        res.status(400).json({detail:err, data:[]})
      }   
    }

    static async createKey(req, res, next){
      try {
        const salt = await bcrypt.genSalt(10);
        const hashed_mail = await bcrypt.hash(req.body.mail, salt);
        const securityKey = hashed_mail.slice(0, 32);
        const isUserExist = await db.query('SELECT * FROM wingman.users WHERE mail = $1', [req.body.mail])
        if (isUserExist.rows.length !== 0)
        {
          res.status(406).json({error:"The user already registered", data:{users:[]}})
        }
        else{
          const key = await db.query('INSERT INTO wingman.keys (security_key, key_for_role, email) values ($1, $2, $3) returning *', [securityKey, req.body.role, req.body.mail])

          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.MAIL_MAIL,
              pass: process.env.MAIL_PASS,
            }
          });
          
          var mailOptions = {
            from: process.env.MAIL_MAIL,
            to: req.body.mail,
            subject: 'Invitation from TFF',
            text: `Dear ${req.body.role},\n\nYou have been selected by TFF to use our referee managment system Wingman! You can register to the platform using security key given below.\n\nKey: ${securityKey}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });


          res.status(200).json({
          data: key.rows[0],
        })
        }
      } catch (error) {
        if(String(error).includes("keys_email_key") )
        {
          res.status(401).json({error:error, data:{users:[]}})
        }
        else{
          res.status(400).json({error:error, data:{users:[]}})
          console.log(`Error when creating key ${JSON.stringify(error)}`)
        }
      }   
  }

    async check_then_delete_security_key(security_key, role, email) {
      const key = await db.query('SELECT * FROM wingman.keys WHERE security_key = $1 AND key_for_role=$2 AND email =$3', [security_key, role, email])
      if(key.rows.length == 0){
          throw {
            detail: "Wrong key.",
            code: 1,
            error: new Error()
          };
        }
        else{
          result = await db.query('DELETE FROM wingman.keys WHERE security_key = $1', [security_key])
        }
    }

    static async createUser(req, res, next){
      try {
        //Check and then delete sec key
        const key = await db.query('SELECT * FROM wingman.keys WHERE security_key = $1 AND key_for_role=$2 ANd email=$3', [req.body.security_key, req.body.role, req.body.mail])
        if(key.rows.length == 0){
            throw {
              detail: "Invalied security key.",
              code: 1,
              error: new Error()
            };
          }
          else{
            let result = await db.query('DELETE FROM wingman.keys WHERE security_key = $1', [req.body.security_key])
          }

        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(req.body.password, salt);
        const newUser = await db.query('INSERT INTO wingman.users (mail,name,surname, password, role) values ($1,$2,$3,$4, $5) returning *'
        , [req.body.mail, req.body.name, req.body.surname, hashed_password, req.body.role])

        const jwtToken = jwtGenerator(newUser.rows[0].user_id);

        res.status(200).json({
          data: newUser.rows[0],
          jwtToken: jwtToken
        })

      } catch (error) {
        console.log(`Error when creating user ${JSON.stringify(error)}`)
        console.log(`Error when creating user ${error}`)
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

  static async createReferee(req, res, next){
    try {
      const newReferee = await db.query('INSERT INTO wingman.referees (name,surname, totalmatches, totalyellowcards,totalredcards,age, currentseasonmatches,totalfoulspg,currentyel,currentred,currentfoulspg,totalpenpg,totalyelpg, currentyelpg, currentredpg, totalredpg,currentpenpg,avatarurl) values ($1,$2,$3,$4, $5, $6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16, $17, $18) returning *'
      , [req.body.name,req.body.surname, req.body.totalmatches, req.body.totalyellowcards,req.body.totalredcards,req.body.age, req.body.currentseasonmatches,req.body.totalfoulspg,req.body.currentyel,req.body.currentred,req.body.currentfoulspg,req.body.totalpenpg,req.body.totalyelpg, req.body.currentyelpg , req.body.currentredpg, req.body.totalredpg,req.body.currentpenpg,req.body.avatarurl])
      res.status(200).json({
        data: newReferee.rows[0],
      })

    } catch (error) {
      console.log(`Error when creating referee ${JSON.stringify(error)}`)
      console.log(`Error when creating referee ${error}`)
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

  static async userAuthTemp(req, res, next){
>>>>>>> refs/rewritten/feature-dev-4
    try {
      const results = await db.query("SELECT * FROM wingman.users");
      res.status(200).json({
        lenght: results.rows.length,
        data: {
          users: results.rows,
        },
      });
    } catch (error) {
      console.log(`Error when getting all users ${error.detail}`);
      res.status(400).json({ error: error, data: { users: [] } });
    }
  }

  static async getAllReferees(req, res, next) {
    try {
      const results = await db.query(
        "SELECT * FROM wingman.referees order by id"
      );

      res.status(200).json({
        lenght: results.rows.length,
        data: {
          users: results.rows,
        },
      });
    } catch (error) {
      console.log(`Error when getting all referees ${error.detail}`);
      res.status(400).json({ error: error, data: { users: [] } });
    }
  }

  static async getRefereeById(req, res, next) {
    try {
      const result = await db.query(
        "SELECT * FROM wingman.referees WHERE id = $1",
        [req.params.id]
      );
      if (result.rows.length == 0) {
        throw {
          detail: "Referee not found.",
          code: 1,
          error: new Error(),
        };
      }

      res.status(200).json({
        data: result.rows[0],
      });
    } catch (err) {
      console.log(`Error when getting one referee ${err}`);
      if (err.code == 1) {
        res.status(404).json({ detail: err.detail, data: [] });
        return;
      }
      res.status(400).json({ detail: err, data: [] });
    }
  }

  static async getTeamById(req, res, next) {
    try {
      const result = await db.query(
        "SELECT DISTINCT * FROM wingman.teams t, wingman.teamref R WHERE teamid = $1 AND  t.teamname = R.teamname",
        [req.params.id]
      );
      if (result.rows.length == 0) {
        throw {
          detail: "Team not found.",
          code: 1,
          error: new Error(),
        };
      }
      res.status(200).json({
        data: {
          data: result.rows,
        },
      });
    } catch (err) {
      console.log(`Error when getting one team ${err}`);
      if (err.code == 1) {
        res.status(404).json({ detail: err.detail, data: [] });
        return;
      }
      res.status(400).json({ detail: err, data: [] });
    }
  }
  static async sortReferee(req, res, next) {
    try {
      const result = await db.query(
        `SELECT * FROM wingman.referees ORDER BY ${req.params.par} ASC`
      );
      console.log(result.rows);
      if (result.rows.length == 0) {
        throw {
          detail: "Could not sort.",
          code: 1,
          error: new Error(),
        };
      }

      res.status(200).json({
        data: result.rows,
      });
    } catch (err) {
      console.log(`Error when sorting referees ${err}`);
      if (err.code == 1) {
        res.status(404).json({ detail: err.detail, data: [] });
        return;
      }
      res.status(400).json({ detail: err, data: [] });
    }
  }

  static async getAllTeams(req, res, next) {
    try {
      const results = await db.query("SELECT * FROM wingman.teams");

      res.status(200).json({
        lenght: results.rows.length,
        data: {
          users: results.rows,
        },
      });
    } catch (error) {
      console.log(`Error when getting all teams ${error.detail}`);
      res.status(400).json({ error: error, data: { users: [] } });
    }
  }

  static async getUserById(req, res, next) {
    try {
      const result = await db.query(
        "SELECT * FROM wingman.users WHERE user_id = $1",
        [req.params.id]
      );
      if (result.rows.length == 0) {
        throw {
          detail: "User not found.",
          code: 1,
          error: new Error(),
        };
      }

      res.status(200).json({
        data: result.rows[0],
      });
    } catch (err) {
      console.log(`Error when getting one user ${err}`);
      if (err.code == 1) {
        res.status(404).json({ detail: err.detail, data: [] });
        return;
      }
      res.status(400).json({ detail: err, data: [] });
    }
  }

  static async createKey(req, res, next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed_mail = await bcrypt.hash(req.body.mail, salt);
      const securityKey = hashed_mail.slice(0, 32);
      const isUserExist = await db.query(
        "SELECT * FROM wingman.users WHERE mail = $1",
        [req.body.mail]
      );
      if (isUserExist.rows.length !== 0) {
        res
          .status(406)
          .json({ error: "The user already registered", data: { users: [] } });
      } else {
        const key = await db.query(
          "INSERT INTO wingman.keys (security_key, key_for_role, email) values ($1, $2, $3) returning *",
          [securityKey, req.body.role, req.body.mail]
        );

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.MAIL_MAIL,
            pass: process.env.MAIL_PASS,
          },
        });

        var mailOptions = {
          from: process.env.MAIL_MAIL,
          to: req.body.mail,
          subject: "Invitation from TFF",
          text: `Dear ${req.body.role},\n\nYou have been selected by TFF to use our referee managment system Wingman! You can register to the platform using security key given below.\n\nKey: ${securityKey}`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        res.status(200).json({
          data: key.rows[0],
        });
      }
    } catch (error) {
      if (String(error).includes("keys_email_key")) {
        res.status(401).json({ error: error, data: { users: [] } });
      } else {
        res.status(400).json({ error: error, data: { users: [] } });
        console.log(`Error when creating key ${JSON.stringify(error)}`);
      }
    }
  }

  async check_then_delete_security_key(security_key, role, email) {
    const key = await db.query(
      "SELECT * FROM wingman.keys WHERE security_key = $1 AND key_for_role=$2 AND email =$3",
      [security_key, role, email]
    );
    if (key.rows.length == 0) {
      throw {
        detail: "Wrong key.",
        code: 1,
        error: new Error(),
      };
    } else {
      result = await db.query(
        "DELETE FROM wingman.keys WHERE security_key = $1",
        [security_key]
      );
    }
  }

  static async createUser(req, res, next) {
    try {
      //Check and then delete sec key
      const key = await db.query(
        "SELECT * FROM wingman.keys WHERE security_key = $1 AND key_for_role=$2 ANd email=$3",
        [req.body.security_key, req.body.role, req.body.mail]
      );
      if (key.rows.length == 0) {
        throw {
          detail: "Invalied security key.",
          code: 1,
          error: new Error(),
        };
      } else {
        let result = await db.query(
          "DELETE FROM wingman.keys WHERE security_key = $1",
          [req.body.security_key]
        );
      }

      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(req.body.password, salt);
      const newUser = await db.query(
        "INSERT INTO wingman.users (mail,name,surname, password, role) values ($1,$2,$3,$4, $5) returning *",
        [
          req.body.mail,
          req.body.name,
          req.body.surname,
          hashed_password,
          req.body.role,
        ]
      );

      const jwtToken = jwtGenerator(newUser.rows[0].user_id);

      res.status(200).json({
        data: newUser.rows[0],
        jwtToken: jwtToken,
      });
    } catch (error) {
      console.log(`Error when creating user ${JSON.stringify(error)}`);
      console.log(`Error when creating user ${error}`);
      if (String(error).includes("users_mail_key")) {
        res.status(401).json({ error: error, data: { users: [] } });
      } else if (error.code == 1) {
        res.status(402).json({ detail: error.detail, data: [] });
        return;
      } else {
        res.status(400).json({ error: error, data: { users: [] } });
      }
    }
  }

  static async userAuthTemp(req, res, next) {
    try {
      const resolvedUser = await db.query(
        "SELECT * from wingman.users WHERE mail = $1",
        [req.body.mail]
      );

      if (resolvedUser.rows.length == 0) {
        throw {
          detail: "User mail not found.",
          code: 1,
          error: new Error(),
        };
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        resolvedUser.rows[0].password
      );
      if (!validPassword) {
        throw {
          detail: "User password not found.",
          code: 1,
          error: new Error(),
        };
      }
      const jwtToken = jwtGenerator(resolvedUser.rows[0].user_id);

      res.status(200).json({
        data: resolvedUser.rows[0],
        jwtToken: jwtToken,
      });
    } catch (err) {
      console.log(`Error when auth user ${err.detail}`);
      if (err.code == 1) {
        res.status(404).json({ detail: err.detail, data: [] });
        return;
      }
      res.status(400).json({ detail: err, data: [] });
    }
  }
  static async verify(req, res, next) {
    try {
      res.status(200).json({
        isAuth: true,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }

  static async updateUser(req, res, next) {
    try {
      const user_info = await db.query(
        "SELECT password from wingman.users WHERE user_id = $1",
        [req.params.id]
      );
      let pass = req.body.password;

      if (user_info.rows.length == 0) {
        throw {
          detail: "User not found.",
          code: 1,
          error: new Error(),
        };
      }

      if (req.body.role == "TFF Admin") {
        //Check and then delete sec key
        const key = await db.query(
          "SELECT * FROM wingman.keys WHERE security_key = $1 AND key_for_role=$2",
          [req.body.security_key, req.body.role]
        );
        if (key.rows.length == 0) {
          throw {
            detail: "Wrong key.",
            code: 2,
            error: new Error(),
          };
        } else {
          let result = await db.query(
            "DELETE FROM wingman.keys WHERE security_key = $1",
            [req.body.security_key]
          );
        }
      }

      if (pass == "" || pass == null || pass == undefined) {
        const afterUpdate = await db.query(
          "UPDATE wingman.users SET mail = $1 ,name = $2 ,surname = $3 WHERE user_id = $4 returning *",
          [req.body.mail, req.body.name, req.body.surname, req.params.id]
        );
        res.status(200).json({ data: afterUpdate.rows[0] });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(pass, salt);
        const afterUpdate = await db.query(
          "UPDATE wingman.users SET mail = $1 ,name = $2 ,surname = $3, password = $4 WHERE user_id = $5 returning *",
          [
            req.body.mail,
            req.body.name,
            req.body.surname,
            hashed_password,
            req.params.id,
          ]
        );
        res.status(200).json({ data: afterUpdate.rows[0] });
      }
    } catch (error) {
      console.log(`Failed to update user ${error}.`);
      if (String(error).includes("users_mail_key")) {
        res.status(401).json({ error: error, data: { users: [] } });
      } else {
        res.status(400).json({ error: error, data: { users: [] } });
      }
    }
  }

  static async deleteById(req, res, next) {
    try {
      const results = await db.query(
        "DELETE FROM wingman.users WHERE user_id = $1 returning *",
        [req.params.id]
      );
      if (results.rows.length == 0) {
        throw {
          detail: "User not found.",
          code: 1,
          error: new Error(),
        };
      }

      res.status(200).json({ data: results.rows[0] });
    } catch (err) {
      console.log(`Failed to delete user ${err}.`);
      if (err.code == 1) {
        res.status(404).json({ detail: err.detail, data: [] });
        return;
      }
      res.status(400).json({ detail: err, data: [] });
    }
  }

  static async getReportes(req, res, next) {
    try {
      const results = await db.query(`select user_id, 
                                             name, 
                                             surname, 
                                             mail, 
                                             role, 
                                             round(avg(rate), 2) as average_rate, 
                                             count(rate) as rate_count,
                                             case when requester_id is null then 0
                                                 else 1 end as is_reported
                                       from wingman.users u 
                                         left join wingman.ratings r using(user_id) 
                                         left join wingman.delete_requests d on d.requested_id = u.user_id
                                       where role in ('Reporter', 'Retired Referee') group by 1, 2, 3, 4, 5, requester_id`);
      res.status(200).json({
        lenght: results.rows.length,
        data: {
          users: results.rows,
        },
      });
    } catch (error) {
      console.log(`Error when getting all users ${error.detail}`);
      res.status(400).json({ error: error, data: { users: [] } });
    }
  }

  static async createDeleteRequest(req, res, next) {
    try {
      const key = await db.query(
        "SELECT * FROM wingman.users WHERE user_id in ($1, $2)",
        [req.body.requester_id, req.body.requested_id]
      );
      const result = await db.query(
        "SELECT * FROM wingman.delete_requests WHERE requested_id = $1",
        [req.body.requested_id]
      );
      if (key.rows.length != 2) {
        throw {
          detail: "Invalid id/ids",
          code: 1,
          error: new Error(),
        };
      }
      if (result.rows.length != 0) {
        throw {
          detail: "Already open issue",
          code: 2,
          error: new Error(),
        };
      }
      const timeElapsed = Date.now();
      const now = new Date(timeElapsed).toISOString();
      const newRequest = await db.query(
        "INSERT INTO wingman.delete_requests (requester_id,requested_id,requested_at, reason) values ($1,$2,$3,$4) returning *",
        [req.body.requester_id, req.body.requested_id, now, req.body.reason]
      );

      res.status(200).json({
        data: newRequest.rows[0],
      });
    } catch (error) {
      if (error.code == 1) {
        //invalid ids
        res.status(402).json({ detail: error.detail, data: [] });
        return;
      } else if (error.code == 2) {
        //already_open
        res.status(403).json({ detail: error.detail, data: [] });
        return;
      } else {
        res.status(400).json({ error: error, data: { users: [] } });
      }
    }
  }

  static async acceptDeleteRequest(req, res, next) {
    try {
      const results = await db.query(
        "Select * FROM wingman.users WHERE user_id in ($1, $2)",
        [req.body.requested_id, req.body.requester_id]
      );
      const admin = await db.query(
        "Select * FROM wingman.users WHERE user_id = $1",
        [req.body.requested_id]
      );
      if (results.rows.length != 2) {
        throw {
          detail: "User not found.",
          code: 1,
          error: new Error(),
        };
      }
      const request = await db.query(
        "DELETE FROM wingman.delete_requests WHERE requested_id = $1 and requester_id = $2 returning *",
        [req.body.requested_id, req.body.requester_id]
      );

      const reporter = await db.query(
        "DELETE FROM wingman.users WHERE user_id = $1 returning *",
        [req.body.requested_id]
      );
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_MAIL,
          pass: process.env.MAIL_PASS,
        },
      });

      var mailOptionsReporter = {
        from: process.env.MAIL_MAIL,
        to: reporter.rows[0].mail,
        subject: "Your Account Has Been Deleted",
        text: `Dear ${reporter.rows[0].name},\n\nDue to your inappropriate rating habbits, one of the TFF Admins flagged your account as suspicious. As a result of our investigations, we have decided to delete your account. Below you can find the reason why your account is suspicious. \n\n${request.rows[0].reason}`,
      };

      transporter.sendMail(mailOptionsReporter, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      var mailOptionsAdmin = {
        from: process.env.MAIL_MAIL,
        to: admin.rows[0].mail,
        subject: "Your Deletion Request Has Been Evaluated",
        text: `Dear ${admin.rows[0].name},\n\nWe have evaluated your request. As a result of our investigations, we have decided to delete the account you flagged. Thank you for your cooperation!\n\n`,
      };
      transporter.sendMail(mailOptionsAdmin, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.status(200).json({ data: results.rows[0] });
    } catch (err) {
      console.log(`Failed to delete user ${err}.`);
      if (err.code == 1) {
        res.status(404).json({ detail: err.detail, data: [] });
        return;
      }
      res.status(400).json({ detail: err, data: [] });
    }
  }

  static async rejectDeleteRequest(req, res, next) {
    try {
      const admin = await db.query(
        "Select * FROM wingman.delete_requests WHERE requester_id = $1 and requested_id = $2",
        [req.body.requester_id, req.body.requested_id]
      );
      if (admin.rows.length == 0) {
        throw {
          detail: "User not found.",
          code: 1,
          error: new Error(),
        };
      }
      const request = await db.query(
        "DELETE FROM wingman.delete_requests WHERE requested_id = $1 and requester_id = $2 returning *",
        [req.body.requested_id, req.body.requester_id]
      );
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_MAIL,
          pass: process.env.MAIL_PASS,
        },
      });
      var mailOptionsAdmin = {
        from: process.env.MAIL_MAIL,
        to: admin.rows[0].mail,
        subject: "Your Deletion Request Has Been Evaluated",
        text: `Dear ${admin.rows[0].name},\n\nWe have evaluated your request. As a result of our investigations, we have decided not to delete the account you flagged. Thank you for your cooperation! Below you can find the reason. \n\n${req.body.reason}`,
      };
      transporter.sendMail(mailOptionsAdmin, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.status(200).json({});
    } catch (err) {
      console.log(`Failed to delete user ${err}.`);
      if (err.code == 1) {
        res.status(404).json({ detail: err.detail, data: [] });
        return;
      }
      res.status(400).json({ detail: err, data: [] });
    }
  }
  static async getAllRequests(req, res, next) {
    try {
      const results = await db.query(`select u.user_id,
                                    u.name,
                                    u.surname,
                                    u.mail,
                                    u.role,
                                    round(avg(rate), 2) as average_rate, 
                                    count(rate) as rate_count,
                                    d.reason,
                                    d.requested_at,
                                    uu.user_id as a_user_id,
                                    uu.name as a_name,
                                    uu.surname as a_surname,
                                    uu.mail as a_mail,
                                    uu.role as a_role
                                from wingman.delete_requests d
                                left join wingman.users u on d.requested_id = u.user_id
                                left join wingman.users uu on d.requester_id = uu.user_id
                                left join wingman.ratings r on r.user_id = d.requested_id 
                                group by 1, 2, 3, 4, 5, 8, 9, 10, 11, 12`);
      res.status(200).json({
        lenght: results.rows.length,
        data: {
          users: results.rows,
        },
      });
    } catch (error) {
      console.log(`Error when getting all users ${error.detail}`);
      res.status(400).json({ error: error, data: { users: [] } });
    }
  }
}
