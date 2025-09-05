const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,          
    required: true,        
    unique: true,          
    lowercase: true,        
    trim: true,             
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] 
  },
  password: {
    type: String,            
    required: true,
    minlength: 6            
  },
  role: {
    type: String,
    enum: ['user', 'admin'], 
    default: 'user'         
  },
   token: { 
    type: String,
     default: null 
  },
}, { timestamps: true });    


module.exports  = mongoose.model("User", userSchema);


