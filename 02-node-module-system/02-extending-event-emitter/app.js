/**
 * Created by jorgefosela on 19/4/20.
 */

const Logger = require('./logger');
const logger = new Logger();

logger.on( 'messageLogged', (arg) => {

  console.log('Listener called', arg);

});

logger.log('Hello World!');