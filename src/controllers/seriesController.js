const mongoose = require('mongoose');
const Series = mongoose.model('Series');

const getSeries = async(req, res, next) => {
    const {page = 1} = req.query;
    const series = await Series.paginate({}, {page, limit: 5});
    return res.json(series);
}

const getSerie = async(req, res) => {
    const serie = await Series.findById(req.params.id);
    return res.json(serie);
}

const getSeriesByStatus = async(req, res, next) => {
    //["MinhaLista", "EmAndamento", "Assistidas"]
    // switch(req.params.status){
    //     case 'MinhaLista' :
    //     var status = 0;
    //     break;
    //     case 'EmAndamento' :
    //     var status = 1;
    //     break;
    //     case 'Assistidas' :
    //     var status = 2;
    //     break;
    // }
    const {page = 1} = req.query;
    const series = await Series.paginate({status: req.params.status}, {page, limit:5});
    return res.json(series);
}

const post = async(req, res, next) => {
    const serie = await Series.create(req.body);
    return res.json(serie);
}

const update = async(req, res, next) => {
    const serie = await Series.findByIdAndUpdate(req.params.id, req.body, {new: true});
    return res.json(serie);
}

const destroy = async(req, res, next) => {
    await Series.findByIdAndRemove(req.params.id);
    return res.send();
}

module.exports = {
    getSeries,
    getSerie,
    getSeriesByStatus,
    post,
    update,
    destroy
};