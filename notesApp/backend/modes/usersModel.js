const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// for localhost
mongoose.connect('mongodb://127.0.0.1:27017/notesApp');


const userSchema = new Schema({
  id:{
    type:Number
  },
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  profilePic:String,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
