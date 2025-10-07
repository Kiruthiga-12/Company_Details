const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true,
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    about:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    employee_count:{
        type:Number,
        required:true
    },
    company_type:{
        type:String,
        required:true
    },
    total_revenue:{
        type: Number,
        required:true
    },
    logo:{
        type:Buffer,
        required:true,
        unique:true
    }
    // address:{
    //    type:[{
    //      location:{type:String,required:true},
    //      street:{type:String,required:true},
    //      zip:{type:String,required:true}
    //    }]
    // }
})

module.exports = mongoose.model('company_db',schema);