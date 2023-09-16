const AuthorizationError = require("./AuthorizationError");
const NotFoundError = require("./NotFoundError");

class CustomError{
    NotFoundError(message){
        return new NotFoundError(message);
    };

    AuthorizationError(message){
        return new AuthorizationError(message);
    };
};

module.exports = new CustomError();