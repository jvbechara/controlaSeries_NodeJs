const express = require('express');
const routes = express.Router();
const seriesController = require('./controllers/seriesController');

routes.get("/series", seriesController.getSeries);
routes.get("/series/:id", seriesController.getSerie);
routes.get("/series-status/:status", seriesController.getSeriesByStatus);
routes.get("/series-search/:title", seriesController.getSeriesBySubstring);
routes.post("/series-create", seriesController.post);
routes.put("/series/:id", seriesController.update);
routes.delete("/series/:id", seriesController.destroy);

module.exports = routes;