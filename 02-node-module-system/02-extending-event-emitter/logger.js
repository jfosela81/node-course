/**
 * Created by jorgefosela on 19/4/20.
 */

const EventEmitter = require('events');

class Logger extends EventEmitter {

  log( message ) {

    console.log( message );

    this.emit( 'messageLogged', {id: '1', url: 'http'} );
  }

}

module.exports = Logger;