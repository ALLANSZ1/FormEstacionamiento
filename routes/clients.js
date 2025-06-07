const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');

router.get('/', clientsController.getClients);
router.post('/', clientsController.addClient);

module.exports = router;