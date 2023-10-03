const transportEmail = require('../transportEmail.js');

//! Send mail
const sendMail = async ({mailOptions}) => {
    transportEmail.sendMail(mailOptions);
}

module.exports = sendMail;