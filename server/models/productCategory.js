const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productCategorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    brand:{
        type: Array,
        required:true,
    },
    image: {
        type:String,
        default: "https://img.freepik.com/premium-photo/flat-lay-desk-arrangement_1257223-160146.jpg?w=996"
    }
},{timestamps: true});

//Export the model
module.exports = mongoose.model('ProductCategory', productCategorySchema);