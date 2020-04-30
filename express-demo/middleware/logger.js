/**
 * Created by jorgefosela on 28/4/20.
 */

function log ( req, res, next ) {
  console.log('Loggin...');
  next();
}

module.exports = log;