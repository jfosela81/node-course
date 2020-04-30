/**
 * Created by jorgefosela on 30/4/20.
 */

const Joi = require( 'joi' );
const express = require( 'express' );
const router = express.Router();

const genres = [
  { id: 1, name: 'Sci-fi' },
  { id: 2, name: 'Western' },
  { id: 3, name: 'Comedy' },
  { id: 4, name: 'Horror' }
];

router.get( '/', ( req, res ) => {

  if ( req.query.sortBy === 'name' ) {

    let genres_ordered = genres.slice(); // Hacemos una copia del array original
    genres_ordered = genres_ordered.sort( (el1, el2) => {
      let x = el1.name.toLowerCase();
      let y = el2.name.toLowerCase();

      if ( x < y ) return -1;
      if ( x > y ) return 1;
      return 0;
    });

    res.send( genres_ordered );

  } else {

    res.send( genres );

  }

});

router.get( '/:id', ( req, res ) => {

  const genre = genres.find( single_genre => single_genre.id === parseInt( req.params.id ) );

  if ( ! genre ) {
    res.status(404).send('No genre found');
    return;
  }

  res.send( genre );

});

router.get( '/name/:name', ( req, res ) => {

  const genre = genres.find( single_genre => single_genre.name.toLowerCase() === req.params.name.toLowerCase() );

  if ( ! genre ) {
    res.status(404).send('No genre found');
    return;
  }

  res.send( genre );

});

router.post( '/', ( req, res ) => {

  const { error } = validateGenre( req.body );

  if ( error ) {
    res.status(400).send( error.details[0].message );
    return;
  }

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };

  genres.push(genre);
  res.send(genre);

});

router.put( '/:id', ( req, res ) => {

  const { error } = validateGenre( req.body );

  if ( error ) {
    res.status(400).send( error.details[0].message );
    return;
  }

  const element = genres.find( g => g.id === parseInt( req.params.id ) );

  if ( element ) {
    element.name = req.body.name;
    res.send( genres );

  } else {
    return res.status(404).send( 'Genre not found!' );
  }

});

router.delete( '/:id', ( req, res ) => {

  const element = genres.find( g => g.id === parseInt( req.params.id ) );

  if ( element ) {

    const indexOf = genres.indexOf(element);

    genres.splice( indexOf, 1 );
    res.send( genres );

  } else {
    return res.status(404).send( 'Genre not found!' );
  }
});

function validateGenre( genre ) {

  const schema = {
    name: Joi.string().required()
  };

  return Joi.validate( genre, schema );
}

module.exports = router;