const mongoose = require("mongoose");
const RealtimeModelName = "Realtime"
const Schema = mongoose.Schema;

let Realtime = new Schema({
  request: {
    type: String, //request url
  },
  title: {
    type: String, //request title
  },
  method: {
    type: String // GET, POST, PUT, PATCH, DELETE
  },
  status: {
    type: String, // request, approved, rejected
  }, 
  data: {
    type: Object, //request data
  },
},
{ 
  timestamps: true,
  collection: RealtimeModelName 
});

module.exports = mongoose.model(RealtimeModelName, Realtime);
