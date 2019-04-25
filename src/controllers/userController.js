const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const auth = require('../services/auth');
const md5 = require('md5');

const post = async(req, res) => {
    await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password + global.SALT_KEY) }, function(err, cliente){
        if(err)
            return res.status(400).send();
        else
            return res.status(200).json(cliente);
    });
}

const authenticate = async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await Users.findOne({email, password});

        if(!user){
            res.status(404).send('Email ou senha inválidos');
            return
        }
        
        console.log(user._id);

        const token = await auth.generateToken({
            id: user._id,
            email: user.email,
            password: user.password,
            roles: user.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: user.email,
                name: user.name
            }
        });
    } catch(e){
        res.status(500).send('Falha na requisição!');
    }
}

module.exports = {
    post,
    authenticate
};