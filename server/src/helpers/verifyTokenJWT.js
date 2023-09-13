const jwt = require("jsonwebtoken");

const verifyTokenJWT = (token) => {
    const SECRET = process.env.JWT_SECRET;
    
    return jwt.verify(token,SECRET);
};
 
module.exports = verifyTokenJWT;