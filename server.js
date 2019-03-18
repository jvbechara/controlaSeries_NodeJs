const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Inicia o App
const app = express();

// Permitir POST com json
app.use(express.json()); 

app.use(cors());

// Inicia o DB
mongoose.connect('mongodb://jvbechara:crvg1995@ds018258.mlab.com:18258/controlaseries', {useNewUrlParser: true});

require('./src/models/series');

// Rota
app.use('/', require('./src/routes'));

app.listen(3001);