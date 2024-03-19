// Note.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// for localhost
mongoose.connect('mongodb://127.0.0.1:27017/notesApp');


const noteSchema = new Schema({
  id:Number,
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdBy: {
    type: Number, // Assuming createdBy is the username of the user who created the note
    required: true
  },
  isImportant:Boolean,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
