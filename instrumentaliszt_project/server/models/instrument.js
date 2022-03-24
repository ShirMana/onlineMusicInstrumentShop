const Joi = require("joi");
const mongoose = require('mongoose');
const _ = require('lodash');


//creating the Instrument Schema by fields 
const instrumentSchema = new mongoose.Schema({
  instrumentName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255
  },
  instrumentDescription: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024
  },
  instrumentBrand: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 400
  },
  instrumentPrice: {
    type: Number,
    required: true,
    minlength: 2,
    maxlength: 8
  },
  instrumentImage: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 1024
  }
});
 
const Instrument = mongoose.model('Instrument', instrumentSchema); //creating the model by the instrument schema


//validation of Instrument schema by joi  
function validateInstrument(instrument) {
 
  const schema = Joi.object({
    instrumentName: Joi.string().min(2).max(255).required(),
    instrumentDescription: Joi.string().min(2).max(2048).required(),
    instrumentBrand: Joi.string().min(2).max(400).required(),
    instrumentPrice: Joi.number().min(10).max(1000000).required(),
    instrumentImage: Joi.string().min(11).max(1024)
  });
 
  return schema.validate(instrument);
}
 

 
exports.Instrument = Instrument;
exports.validateInstrument = validateInstrument;
