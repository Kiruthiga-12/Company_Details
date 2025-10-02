const mongoose = require('mongoose');

const schema = mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    emailid:{
      type:String,
      required:true,
      unique:true
    },
    logo:{
        type:Buffer
    },
         location:{type:String},
         street:{type:String},
         zip:{type:String}
})

module.exports = mongoose.model('admin_db',schema);