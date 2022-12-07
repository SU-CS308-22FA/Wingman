import jwt from 'jsonwebtoken';
const {verify } = jwt;
import dotenv from "dotenv"

//this middleware will on continue on if the token is inside the local storage
dotenv.config({
  path: '../.env'
})
export default function(req, res, next) {
  // Get token from header
  const token = req.header("jwt_token");
  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  // Verify token
  try {
    const verified = verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};