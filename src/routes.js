const express = require('express');
const routes = express.Router();
const seriesController = require('./controllers/seriesController');
const auth = require('./services/auth');

routes.get("/series", auth.isUserValid, seriesController.getSeries);
routes.get("/series/:id", auth.isUserValid, seriesController.getSerie); 
routes.get("/series-status/:status", auth.isUserValid, seriesController.getSeriesByStatus);
routes.get("/series-search/:title", auth.isUserValid, seriesController.getSeriesBySubstring);
routes.post("/series-create", auth.isUserValid, seriesController.post);

routes.put("/series/:id", auth.isUserValid, seriesController.update);
routes.delete("/series/:id", auth.isUserValid, seriesController.destroy);

module.exports = routes;