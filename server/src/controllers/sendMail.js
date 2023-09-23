const transportEmail = require('../transportEmail.js');

//! Send mail
const sendMail = async ({mailOptions}) => {
    transportEmail.sendMail(mailOptions, console.log);
}

module.exports = sendMail;