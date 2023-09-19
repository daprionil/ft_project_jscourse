class NotFoundError extends Error{
    #status;
    
    constructor(message){
        super(message);
        this.#status = 404;
        this.type = 'NotFoundError';
    }

    get status(){
        return this.#status;
    };
};

module.exports = NotFoundError;
