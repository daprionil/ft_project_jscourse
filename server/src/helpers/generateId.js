const generateId = () => {
    const SECTIONS = 4;
    let complexId = [];

    for(let i = SECTIONS; i > 0; i--){
        complexId.push(parseInt(Date.now() * Math.random()).toString(16));
    };
    
    return complexId.join('-');
};

module.exports = generateId;