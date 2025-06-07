const express = require('express');
const cors = require('cors');
const app = express();
const clientsRouter = require('./routes/clients');

app.use(cors());
app.use(express.json()); // Esto es necesario para leer JSON en el body
app.use('/api/clients', clientsRouter);

module.exports = app;