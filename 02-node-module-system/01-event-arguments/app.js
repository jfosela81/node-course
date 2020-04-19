/**
 * Created by jorgefosela on 19/4/20.
 */

const EventEmitter = require('events');

const emitter = new EventEmitter();

var data = { message: 'Hello Loggin Event' };

emitter.on( 'logging', (arg) => {

  console.log(arg.message);

});

emitter.emit( 'logging', data );