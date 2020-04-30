/**
 * Created by jorgefosela on 22/4/20.
 */

const logger = require('./middleware/logger.js');
const auth = require('./middleware/authenticate.js');
const courses = require('./routes/courses');
const homepage = require('./routes/homepage');
const express = require('express');
const app = express();

app.use(express.json());

app.use(logger);
app.use(auth);

app.use( '/api/courses', courses );
app.use( '/', homepage );

const port = process.env.PORT || 3000;

app.listen( port, () => {
  console.log(`Listening in ${port}...`);
});