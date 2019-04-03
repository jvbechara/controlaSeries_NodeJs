const jwt = require('jsonwebtoken');

const generateToken = (data) => {
    return jwt.sign(data, global.SALT_KEY, {expiresIn: '1d'});
}

const decodeToken = async(token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

const isUserValid = async(req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['genericflix_token'];

    if(!token){
        res.status(401).json({
            message: 'Token Inválido'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function(error, decoded){
            if(error){
                res.status(401).send('Token Inválido');
            } else {
                next();
            }
        });
    }
}

module.exports = {
    generateToken,
    decodeToken,
    isUserValid
};