class AuthorizationError extends Error{
    #status;
    constructor(message){
        super(message);
        this.type = 'AuthorizationError';
        this.#status = 401;
    };

    get status(){
        return this.#status;
    }
};

module.exports = AuthorizationError;
