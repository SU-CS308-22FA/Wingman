import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config({
    path: '../.env'
})
function jwtGenerator(user_id) {
  const payload = {
    user_id: user_id
  };

  return jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: 60*60*7 });
}

export default jwtGenerator