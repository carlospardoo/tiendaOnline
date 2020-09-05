const express = require('express');
const router = express.Router();
const direccionController = require('../controllers/direccion_controller');

router.get('/', direccionController.consultaDirecciones );

module.exports = router;