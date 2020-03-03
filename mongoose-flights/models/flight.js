const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const destination = new Schema({
    airport:{
        type: String,
        enum: ['AUS','DFW','DEN','LAX','SAN'],
    },
    arrival: Date,
})


const flight = new Schema({
    airline: {
        type: String,
        enum: ['American','Southwest','United']
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999,
    },
    departs: {
        type: Date,
    },
    airport:{
        type: String,
        enum: ['AUS','DFW','DEN','LAX','SAN'],
    },
    destinations: [destination],
})




module.exports = mongoose.model('Flight',flight);
