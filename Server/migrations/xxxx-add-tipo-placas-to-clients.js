'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('clients', 'tipo', Sequelize.STRING);
    await queryInterface.addColumn('clients', 'placas', Sequelize.STRING);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('clients', 'tipo');
    await queryInterface.removeColumn('clients', 'placas');
  }
};
