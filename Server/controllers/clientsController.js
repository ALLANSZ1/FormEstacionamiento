const { Client } = require('../models'); // Ajusta la ruta si es necesario

exports.addClient = async (req, res) => {
    try {
        const { nombre, apellido, tipo, placas, telefono } = req.body;
        if (!nombre) {
            return res.status(400).json({ message: "Nombre is required" });
        }
        const client = await Client.create({ nombre, apellido, tipo, placas, telefono });
        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el cliente', error });
    }
};

exports.getClients = async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.json({ data: clients });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los clientes', error });
    }
};

exports.getClientById = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json(client); // Debe incluir todos los campos: nombre, apellido, tipo, placas, telefono
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el cliente', error });
    }
};
