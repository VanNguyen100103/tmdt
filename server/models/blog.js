const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    numberViews:{
        type:Number,
        default: 0
    },
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    dislikes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    image: {
        type:String,
        default: "https://img.freepik.com/premium-photo/flat-lay-desk-arrangement_1257223-160146.jpg?w=996"
    },
    author: {
        type:String,
        default: "Admin"
    }
},{timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);