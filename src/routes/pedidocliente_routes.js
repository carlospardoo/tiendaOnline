const express = require('express');
const router = express.Router();
const pedidoClienteController = require('../controllers/pedidocliente_controller');

router.get('/cargarpedido', pedidoClienteController.cargarPedido);
router.get('/crearpedido', pedidoClienteController.crearPedido);
router.post('/agregarproducto', pedidoClienteController.agregarItem );
router.post('/quitarproducto', pedidoClienteController.quitarItem );
router.get('/vaciar', pedidoClienteController.vaciarPedido ); 

module.exports = router;