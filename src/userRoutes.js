const express = require('express');
const routes = express.Router();
const userController = require('./controllers/userController');

routes.post('/', userController.post); //sign up
routes.post('/authenticate', userController.authenticate); // sign in

module.exports = routes;