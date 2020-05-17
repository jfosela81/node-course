const mongoose = require('mongoose');
const Joi = require( 'joi' );

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    isGold: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        required: false,
        min: 9
    }
}));

function validateCustomer( customer ) {

    const schema = {
        name: Joi.string().required().min(2),
        isGold: Joi.boolean(),
        phone: Joi.string().min(9).regex(/^(6|9)/)
    };

    return Joi.validate( customer, schema );
}

module.exports.validate = validateCustomer;
module.exports.Customer = Customer;
      