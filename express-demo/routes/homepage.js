/**
 * Created by jorgefosela on 29/4/20.
 */
const express = require('express');
const router = express.Router();

router.get( '/', ( req, res ) => {
  res.send('Hello World');
});

module.exports = router;
