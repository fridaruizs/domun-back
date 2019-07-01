const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email:{
        type: String,
        required: true, 
        unique: true, 
    },
    password:{
        type: String,
        required: true, 
    },
    zona:{
        type: String,
        required: true, 
    },
    direccion:{
        type: String,
        required: true, 
    },
   rate:{
       type: Integer,
       required: false, 
   },
    date: {
        type: Date,
        default: Date.now
      },
      info:{
        type: String,
        required: true, 
    },

    
})
function uuidv4() {
    return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  module.exports = mongoose.model('User' , userSchema)