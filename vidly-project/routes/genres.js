/**
 * Created by jorgefosela on 30/4/20.
 */
const { Genre, validate } = require( '../models/genre' );
const express = require( 'express' );
const router = express.Router();

router.get( '/', async ( req, res ) => {

  const genres = await Genre.find().sort('name');
  res.send(genres);

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

  const { error } = validate( req.body );

  if ( error ) {
    return res.status(400).send( error.details[0].message );
  }

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save(); 

  res.send( genre );

});

router.put( '/:id', async ( req, res ) => {

  const { error } = validate( req.body );

  if ( error ) {
    return res.status(400).send( error.details[0].message );
  }

  const genre = await Genre.findByIdAndUpdate( req.params.id, { name: req.body.name }, { new: true } );
  if (!genre) return res.status(404).send('No document found to update!');  

  res.send(genre);

});

router.delete( '/:id', async ( req, res ) => {

    const genre = await Genre.findByIdAndRemove( req.params.id );
    if (!genre) res.status(404).send('No document found!');

    res.send(genre);
/*   
  deleteGenre( req.params.id )
    .then( (result) => result ? res.send( result ) : res.status(404).send('Document not found!') )
    .catch( (err) => res.status(400).send(err.message) );
 */
});


module.exports = router;