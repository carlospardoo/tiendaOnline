const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categorias_controller');

router.get('/listar', categoriasController.listarCategorias );

module.exports = router;
