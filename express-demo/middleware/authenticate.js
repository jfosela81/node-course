/**
 * Created by jorgefosela on 28/4/20.
 */

function authenticate ( req, res, next ) {

  console.log('Authenticate...');
  next();

}

module.exports = authenticate;