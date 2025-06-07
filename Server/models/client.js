module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    telefono: DataTypes.STRING,
    tipo: DataTypes.STRING,      // <-- Agregado
    placas: DataTypes.STRING     // <-- Agregado
  });
  return Client;
};