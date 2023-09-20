class InternalServerError extends Error{
    #status;
    
    constructor(message){
        super(message);
        this.#status = 500;
        this.type = 'InternalServerError';
    }

    get status(){
        return this.#status;
    };
};

module.exports = InternalServerError;
