import db from "../db.js"

export default class passwordController{

  static async createKey(req, res, next){
      try {
        const isUserExist = await db.query('SELECT * FROM wingman.users WHERE mail = $1', [req.body.mail])
        if (isUserExist.rows.length == 0)
        {
          res.status(406).json({error:"The email not exist", data:{users:[]}})
        }
        else{
          const payload = {
            user_id: isUserExist.rows[0].user_id
          };

          const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: 60*10 });
          
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
            subject: 'Reset your Password',
            text: `Dear ${isUserExist.rows[0].name},\n\nYou have been requested to reset your password. Please click on the following link, or paste this into your browser to complete the process:\n\nhttp://localhost:3000/recover/${token}\n\nThe link will expire in 10 minutes. If you did not request this, please ignore this email and your password will remain unchanged.\n\n`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });


          res.status(200).json({
          message: "Email sent!",
        })
        }
      } catch (error) {
        if (error) {
          res.status(400).json({error:error, data:{users:[]}})
          console.log(`Error when creating key ${JSON.stringify(error)}`)
        }
      }   
  }

  static async verify(req, res, next){
    try {
      const { otp } = req.params;
      const decoded = jsonwebtoken.verify(otp, process.env.JWT_SECRET);
      res.status(200).json({
        message: "Token is valid!",
      })
    } catch (error) {
      if (error) {
        res.status(400).json({error:"The token is invalid or expired", data:{users:[]}})
        console.log(`Error when verifying key ${JSON.stringify(error)}`)
      }
    }
  }

  static async recover(req, res, next){
    try {
      const { otp } = req.params;
      const { password } = req.body;
      try{
        const decoded = jsonwebtoken.verify(otp, process.env.JWT_SECRET);
      }
      catch(err){
        throw {
            detail: "The token is invalid or expired",
            code: 1,
            error: new Error()
          };
      }

      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
      const isUserExist = await db.query('SELECT * FROM wingman.users WHERE user_id = $1', [decoded.user_id])
      if (isUserExist.rows.length == 0)
      {
        res.status(406).json({error:"The email not exist", data:{users:[]}})
      }
      else{
        await db.query('UPDATE wingman.users SET password = $1 WHERE user_id = $2', [bcryptPassword, decoded.user_id])
        res.status(200).json({
          message: "Password changed!",
        })
      }
    } catch (error) {
      if(error.code == 1) { 
        res.status(401).json({error:error.detail, data:{users:[]}})
        console.log(`Error when recover password ${JSON.stringify(error)}`)
      }
      else{
        res.status(400).json({error:error.detail, data:{users:[]}})
        console.log(`Error when recover password ${JSON.stringify(error)}`)
      }
    }
  }
}