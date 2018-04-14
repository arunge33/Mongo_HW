var mongoose = require("mongoose");

//1*
var Schema = mongoose.Schema;

//2*
var NoteSchema = new Schema({
  title: String,
  body: String
});

// 3*
var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
