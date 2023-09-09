const register = (req,res) => {
    try {
        const { email, password, name } = req.body;

        //! Response with json
        res.json();
    } catch ({message}) {
        res.json({error:message})
    }
};

const profile = (req,res) => {
    res.send('Eso');
};

module.exports = {
    register,
    profile
}