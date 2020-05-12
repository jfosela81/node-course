/**
 * Created by jorgefosela on 30/4/20.
 */

const mongoose = require('mongoose');
const Joi = require( 'joi' );
const express = require( 'express' );
const router = express.Router();

const Genre = new mongoose.model('Genre', new mongoose.Schema({
  name: String
}));

/* async function getGenres( sort = '' ) {

  const genres = await Genre
    .find()
    .sort(sort)
    .select( { name: 1 } );
  return genres;

} */

async function getGenreById( id ) {

  const genre = await Genre
    .find( { _id: id } )
    .select( { name: 1 } );

  return genre;
}

async function createGenre( body ) {

  const genre = new Genre({
    name: body.name
  });

  return await genre.save();

}

async function updateGenre( id, body ) {

  const genre = await Genre.findByIdAndUpdate(
    { _id: id },
    {
      $set: { name: body.name }
    },
    {
      new: true
    }
  );

  return genre;

}

async function deleteGenre( id ) {

  return await Genre.findByIdAndRemove( id );

}

router.get( '/', async ( req, res ) => {

  const genres = await Genre.find().sort('name');
  res.send(genres);

});

router.get( '/:id', ( req, res ) => {

  getGenreById( req.params.id )
    .then( (genre) => res.send( genre ) )
    .catch( (err) => {
      res.status(404).send('No genre found');
      return;  
    });
    
});

router.get( '/name/:name', ( req, res ) => {

/*   const genre = genres.find( single_genre => single_genre.name.toLowerCase() === req.params.name.toLowerCase() );

  if ( ! genre ) {
    res.status(404).send('No genre found');
    return;
  }

  res.send( genre ); */

});

router.post( '/', ( req, res ) => {

  const { error } = validateGenre( req.body );

  if ( error ) {
    res.status(400).send( error.details[0].message );
    return;
  }

  res.send( createGenre( req.body ) );

});

router.put( '/:id', ( req, res ) => {

  const { error } = validateGenre( req.body );

  if ( error ) {
    res.status(400).send( error.details[0].message );
    return;
  }

  updateGenre( req.params.id, req.body )
    .then( (genre) => res.send( genre ) )
    .catch( (err) => res.status(404).send( 'Genre not found!' ) );

});

router.delete( '/:id', ( req, res ) => {

  deleteGenre( req.params.id )
    .then( (result) => result ? res.send( result ) : res.status(404).send('Document not found!') )
    .catch( (err) => res.status(400).send(err.message) );
});

function validateGenre( genre ) {

  const schema = {
    name: Joi.string().required()
  };

  return Joi.validate( genre, schema );
}

module.exports = router;