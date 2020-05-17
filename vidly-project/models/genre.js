const mongoose = require('mongoose');
const Joi = require( 'joi' );

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: String
}));

function validateGenre( genre ) {

    const schema = {
      name: Joi.string().required()
    };
  
    return Joi.validate( genre, schema );
}

exports.validate = validateGenre;
exports.Genre = Genre;
  