const jwt = require('jsonwebtoken');

const generateJWT = (data) => {
    //? arguments
    //1. Value encripted
    //2. Secret signature
    return jwt.sign(data, process.env.JWT_SECRET,{
        expiresIn: "30d"
    })
}
 
module.exports = generateJWT;