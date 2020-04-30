/**
 * Created by jorgefosela on 26/4/20.
 */

const genres = require('./routes/genres');
const express = require( 'express' );
const app = express();

app.use(express.json());
app.use( '/vidly/api/v1/genres', genres );

const port = process.env.PORT || 3000;

app.listen( port, () => {
  console.log(`Listening in ${port}...`);
});