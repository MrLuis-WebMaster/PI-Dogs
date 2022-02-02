const {Router} = require('express');
const router = Router();

const {Dogs,DogsId,DogPost} = require("../Functions/DogsRequest")

router.get('/', Dogs);
router.get('/:id', DogsId);
router.post('/',DogPost);

module.exports= router;