const { Router } = require('express');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const RoutesDogs = require("./RoutesDogs")
const RoutesTemperament = require("./RoutesTemperament")

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/dogs",RoutesDogs)
router.use("/temperament",RoutesTemperament)



module.exports = router;
