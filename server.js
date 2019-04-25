const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./src/config');
require('dotenv').config();

// Inicia o App
const app = express();

// Permitir POST com json
app.use(express.json()); 
app.use(cors());

// Inicia o DB
mongoose.connect(process.env.connection_genericflix, {useNewUrlParser: true});

require('./src/models/series');
require('./src/models/users');

//Carregando Rotas
const userRoute = require('./src/userRoutes');
const serieRoute = require('./src/routes');

// Rota
app.use('/', serieRoute);
app.use('/user', userRoute);

app.listen(3021); // tava 3001
  
module.exports = app;