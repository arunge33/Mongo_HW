var mongoose = require("mongoose");

//establish reference for mongoose schema 1*
var Schema = mongoose.Schema;

//Create schema for Headline object 2*
var HeadlineSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

//mongoose pushes HeadlineSchema 3*
var Headline = mongoose.model("Headline", HeadlineSchema);

module.exports = Headline;
