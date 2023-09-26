function generateId(){
    const SECTIONS = 4;
    //! This functions will be generate an Id
    const generate = () => {
        let complexId = [];
        
        for(let i = SECTIONS; i > 0; i--){
            complexId.push(parseInt(Date.now() * Math.random()).toString(16));
        };
        
        return complexId.join('-');
    };

    //! with new binding this will be validate token
    this.validateTokenId = (tokenId) => {
        //! If the value is a string
        if(typeof tokenId !== 'string') return false;

        //! Split tokenId by guion
        const tokenSplit = tokenId.split('-');
        if(tokenSplit.length !== 4) return false;
    
        //! Validate if each part have a eleven characters
        console.log(tokenSplit);
        return tokenSplit.every(v => v.length >= 9 && v.length <= 11);
    };

    return generate();
};

module.exports = generateId;