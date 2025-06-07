let clients = []; // Variable global para almacenar clientes

exports.getClients = (req, res) => {
    res.json({ data: clients });
};

exports.addClient = (req, res) => {
    const { nombre, apellido, tipo, placas, telefono } = req.body;
    clients.push({ nombre, apellido, tipo, placas, telefono });
    res.status(201).json({ message: "Cliente agregado" });
};