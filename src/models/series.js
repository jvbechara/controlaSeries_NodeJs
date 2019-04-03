const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema


const SeriesSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    sinopse: {
        type: String,
        required: true,
    },
    seasons: {
        type: Number,
        required: true,
    },
    seasonCurr: {
        type: Number,
        default: 1,
    },
    epCurr: {
        type: Number,
        default: 1,
   },
    status: {
        //type: ["MinhaLista", "EmAndamento", "Assistidas"],
        type: Number,
        min: 0,
        max: 2,
        required: true,
    },
    image: {
        type: Buffer
    }, 
    userId: {
        type: String
    }
});


SeriesSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Series', SeriesSchema);