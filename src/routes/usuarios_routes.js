const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usuarios_controller');

/* GET users listing. */
router.get('/registro', usersController.registro );
router.post('/registrar', usersController.crear );
router.get('/acceso', usersController.acceso );
router.post('/acceder', usersController.login );
router.get('/cerrarsesion', usersController.logout );

module.exports = router;
