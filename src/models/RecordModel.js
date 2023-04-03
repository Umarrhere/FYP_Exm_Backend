const mongoose = require("mongoose");
const RecordModalSchema = 'Record'

const Schema = mongoose.Schema;

let Record = new Schema({
  dept: {
    type: String
  },
  program: {
    type: String
  },
  session: {
    type: String
  },
  batch: {
    type: String
  },
  semester: {
    type: String
  },
  instructor: {
    type: String
  },
  courseCode: {
    type: String
  },
  courseTitle: {
    type: String
  },
  creditHour: {
    type: Object
  },
  midTotal: {
    type: Number
  },
  sessionalTotal: {
    type: Number
  },
  practicalTotal: {
    type: Number
  },
  finalTotal: {
    type: Number
  },
  rows: {
    type: Array
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
},
{ 
  timestamps: true,
  collection: RecordModalSchema 
}
);

module.exports = mongoose.model(RecordModalSchema, Record);
