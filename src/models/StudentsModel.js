const mongoose = require("mongoose");
const StudentModelSchema = 'Student'

const Schema = mongoose.Schema;

let Student = new Schema({
  name: {
    type: String,
  },
  regno: {
    type: String,
  },
  session: {
    type: String,
  },
  image: {
    type: String,
    default: 'https://ratedss-images.s3.amazonaws.com/default_profile.png'
  },
  dept: {
    type: String,
  },
  degree  : {
    type: String,
  },
  batch: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true
  },
  marks: {
    type: Array
  }
},
{ 
  timestamps: true,
  collection: StudentModelSchema 
}
);

module.exports = mongoose.model(StudentModelSchema, Student);
