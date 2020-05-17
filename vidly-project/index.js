/**
 * Created by jorgefosela on 26/4/20.
 */

const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require( 'express' );
const app = express();

mongoose.connect('mongodb://localhost/vidly-project')
  .then( () => console.log('Connected to vidly...'))
  .catch( (err) => console.log(err.message) );

app.use(express.json());
app.use( '/vidly/api/v1/genres', genres );
app.use( '/vidly/api/v1/customers', customers );

const port = process.env.PORT || 3000;

app.listen( port, () => {
  console.log(`Listening in ${port}...`);
});