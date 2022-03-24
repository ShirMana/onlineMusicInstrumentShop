const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const config = require('config');


//creating the User Schema by fields
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },

  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  phone:{
    type: String,
    required: true,
    minlength: 9,
    maxlength: 10
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },

  owner: {
    type: Boolean,
    required: true,
  },
  cart: {
    type: Array,
    required: true,
    default: []
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }

});

//creating the User token with id and owner
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, owner: this.owner }, config.get('jwtKey'));
  return token;
}

const User = mongoose.model("User", userSchema); //creating the model by the User schema


//validation of User schema by joi
function validateUser(data) {
 


  const schema = Joi.object({
    name: Joi.string().min(3).max(70).required(),
    email: Joi.string().min(5).max(255).required().email(),
    phone: Joi.string().min(9).max(10).required().regex(RegExp(/^(?:0(?!(5|7))(?:2|3|4|8|9))(?:-?\d){7}$|^(0(?=5|7)(?:-?\d){9})$/)),
    password: Joi.string().min(6).max(255).required().regex(RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)),
    owner: Joi.boolean().required()
  });

  return schema.validate(data);
}

exports.User = User;
exports.validateUser = validateUser;
