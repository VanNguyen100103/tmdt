const mongoose = require('mongoose'); // Erase if already required
const bcrypt= require("bcrypt");
const crypto = require("crypto");
const product = require('./product');
const { type } = require('os');

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
    cart: [
        {product: {type: mongoose.Types.ObjectId, ref: "Product"}, quantity: Number, color: String}
    ],
    address: {type: Array, default: []},
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
userSchema.methods = {
    comparePassword: async function(enteredPass){
        return await bcrypt.compare(enteredPass, this.password)
    },
    createPasswordChangedToken: function(){
        const resetToken = crypto.randomBytes(32).toString("hex");
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpires = Date.now() + 24 * 60 * 60 * 1000 
        return resetToken
    }
}
//Export the model
module.exports = mongoose.model('User', userSchema);

