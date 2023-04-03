const mongoose = require("mongoose");
const FacultyModelName = "Faculty"

const Schema = mongoose.Schema;

let FacultySchema = new Schema({
  name: {
    type: String,
  },
  regno: {
    type: String,
  },
  dept: {
    type: String,
  },
  joined: {
    type: String,
  },
  code: {
    type: String,
  },
},
{ 
  timestamps: true,
  collection: FacultyModelName 
}
);

module.exports = mongoose.model(FacultyModelName, FacultySchema);
