
const { Customer, validate } = require('../models/customer');
const express = require( 'express' );
const router = express.Router();

router.get( '/', async ( req, res ) => {

  const customers = await Customer.find().sort('name');
  res.send(customers);

});

router.get( '/:id', async ( req, res ) => {

  const genre = await Genre.find( { _id: req.params.id } );

  if (!genre) return res.status(404).send('No document found!');
  res.send(genre);
    
});

router.get( '/name/:name', ( req, res ) => {

/*   const genre = genres.find( single_genre => single_genre.name.toLowerCase() === req.params.name.toLowerCase() );

  if ( ! genre ) {
    res.status(404).send('No genre found');
    return;
  }

  res.send( genre ); */

});

router.post( '/', async ( req, res ) => {

    const { body } = req;
    const { error } = validate( body );

    if ( error ) {
      return res.status(400).send( error.details[0].message );
    }
  
    let customer = new Customer({ 
        name: body.name,
        isGold: body.isGold,
        phone: body.phone, 
      });
      customer = await customer.save(); 
  
    res.send( customer );  

});

router.put( '/:id', async ( req, res ) => {

    const { body } = req;
    const { error } = validate( body );

    if ( error ) {
      return res.status(400).send( error.details[0].message );
    }
  
    const customer = await Customer.findByIdAndUpdate( 
        req.params.id, 
        { 
            name: body.name,
            isGold: body.isGold,
            phone: body.phone 
        }, 
        { 
            new: true,
            omitUndefined: true
        } 
    );
    if (!customer) return res.status(404).send('No document found to update!');  
  
    res.send(customer);  

});

router.delete( '/:id', async ( req, res ) => {

    const customer = await Customer.findByIdAndRemove( req.params.id );
    if (!customer) res.status(404).send('No document found!');

    res.send(customer);
/*   
  deleteGenre( req.params.id )
    .then( (result) => result ? res.send( result ) : res.status(404).send('Document not found!') )
    .catch( (err) => res.status(400).send(err.message) );
 */
});

module.exports = router;