const {Router} = require('express');
const router = Router();
const {getTemperament} = require('../Functions/TemperamentRequest');

router.get('/',getTemperament);

module.exports= router;