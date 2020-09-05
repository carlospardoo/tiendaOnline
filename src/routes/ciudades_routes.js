const express = require('express');
const router = express.Router();
const ciudadesController = require('../controllers/ciudades_controller');

router.get('/listar', ciudadesController.listarCiudades );

module.exports = router;
