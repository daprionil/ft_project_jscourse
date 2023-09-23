const nodemailer = require('nodemailer');;

//! Extract credentials of enviroment
const {
    MAIL_HOST,
    MAIL_PORT,
    MAIL_AUTH_USER,
    MAIL_AUTH_PASS
} = process.env;

//! Create transport to sendEmails
const transportEmail = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    auth: {
        user: MAIL_AUTH_USER,
        pass: MAIL_AUTH_PASS
    }
});

module.exports = transportEmail;