const mongoose = require('mongoose');
const HolidayModelName = 'Holiday'

const Schema = mongoose.Schema;

let HolidaySchema = new Schema({
    year: {
        type: String
    },
    month: {
        type: String
    },
    day:{
        type: String
    },
    status: {
        type: String,
        default: 'Normal Holiday'
    }
},
{ 
    timestamps: true,
    collection: HolidayModelName 
});

module.exports = mongoose.model(HolidayModelName, HolidaySchema);