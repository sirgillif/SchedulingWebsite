const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const infoSchema = new Schema({
    user:{type:ObjectId, ref:"User"},
    
    streetAddress:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true,
        mixLength:2,
        maxLength:2
    },
    zipcode:{
        type:String,
        required:true,
        mixLength:5,
        maxLength:5
    },
    creditCard:{
        type:String, 
    }


   

});

module.exports = mongoose.model("Info",infoSchema);