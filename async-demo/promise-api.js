/**
 * Created by jorgefosela on 1/5/20.
 */

const p1 = new Promise( (resolve, reject) => {
  setTimeout( () => {
    console.log('Accessing Facebook API...');
    reject(new Error('Because it is failed'));
  }, 2000);
});

const p2 = new Promise( (resolve) => {
  setTimeout( () => {
    console.log('Accessing Instagram API...');
    resolve(2);
  }, 2000);
});

Promise.race( [ p1, p2 ] )
  .then( result => console.log( result ) )
  .catch( err => console.log( err.message ) );