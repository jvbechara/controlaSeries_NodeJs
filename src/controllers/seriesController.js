const mongoose = require('mongoose');
const Series = mongoose.model('Series');
const auth = require('../services/auth');

const getIdUser = async(req) => {
    var token = req.body.token || req.query.token || req.headers['genericflix_token'];
    const iduser = await auth.decodeToken(token);
    return(iduser.id);
}

const getSeries = async(req, res) => {
    var data = await getIdUser(req);

    const {page = 1} = req.query;
    const series = await Series.paginate({userId: data}, {page, limit:6, sort: 'title'});    
    return res.json(series);
}

const getSerie = async(req, res) => {
    var data = await getIdUser(req);
    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        const serie = await Series.find({_id: req.params.id, userId: data});
        return res.json(serie);
    } else {
        return res.status(404).send('Page not Found');
    }
}

const getSeriesByStatus = async(req, res) => {
    var data = await getIdUser(req);
    const {page = 1} = req.query;

    if(req.params.status >= 0 && req.params.status <=2){
        const series = await Series.paginate({status: req.params.status, userId: data}, {page, limit:6, sort: 'title'});
        return res.json(series);
    } else {
        return res.status(404).send('Not found');
    }
}

const getSeriesBySubstring = async(req, res) => {
    var data = await getIdUser(req);
    
    const searchText = req.params.title;
    const series = await Series.paginate({ "title": { "$regex": searchText, "$options": "i" }, userId: data }, function(err,docs) {})
    if(series.total > 0){
        return res.json(series);
    } else
        return res.status(404).send('Not found');
}

const post = async(req, res) => {
    var data = await getIdUser(req);
    const objSerie = req.body;
    objSerie['userId'] = data;

    Series.create(objSerie, function(err, serie){
        if(err)
            return res.status(400).send();
        else
            return res.json(serie);
    });
}

const update = async(req, res) => {
    var data = await getIdUser(req);

    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        Series.findOneAndUpdate({_id: req.params.id, userId: data}, req.body, function(err, serie){
            if(err)
                return res.status(400).send('Not found');
            else
                return res.json(serie);
        });
    } else {
        return res.status(400).send('Not found');
    }
}

const destroy = async(req, res) => {
    var data = await getIdUser(req);

    if(mongoose.Types.ObjectId.isValid(req.params.id)){
        await Series.findOneAndRemove({_id: req.params.id, userId: data}, function(err){
                if(err)
                    return res.status(400).send('Not found');
                else
                    return res.send();
            });
        return res.send();
    }
    else{
        return res.status(400).send();
    }
}

module.exports = {
    getSeries,
    getSerie,
    getSeriesByStatus,
    getSeriesBySubstring,
    post,
    update,
    destroy
};