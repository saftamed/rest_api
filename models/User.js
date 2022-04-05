// Create a User Schema

let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age:Number,
  email:{
    type: String,
    required: true,
    unique:true,
    dropDups: true 
  },
  password:{
    type: String,
    required: true,
  }
  })
module.exports = mongoose.model('User', userSchema)