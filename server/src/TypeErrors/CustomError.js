const AuthorizationError = require("./AuthorizationError");
const NotFoundError = require("./NotFoundError");
const InternalServerError = require("./InternalServerError");

class CustomError{
    NotFoundError(message){
        return new NotFoundError(message);
    };

    AuthorizationError(message){
        return new AuthorizationError(message);
    };

    InternalServerError(message){
        return new InternalServerError(message);
    }
};

module.exports = new CustomError();