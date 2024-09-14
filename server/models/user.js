const mongoose = require('mongoose'); // Erase if already required
const bcrypt= require("bcrypt");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type:String,
        default:"user",
    },
    cart: {
        type: Array,
        default: [],
    },
    address: [{type: mongoose.Schema.Types.ObjectId, ref: "Address"}],
    wishlist: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
    isBlocked: {
        type: Boolean,
        default: false
    },
    refreshToken: {type: String},
    passwordChangedAt: {type: String},
    passwordResetToken: {type: String},
    passwordResetExpires: {type: String},
    avatar: {
        public_id: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        }
    }
},{timestamps: true});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
          return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
      next();
});
//Export the model
module.exports = mongoose.model('User', userSchema);

