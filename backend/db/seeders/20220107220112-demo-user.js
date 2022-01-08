'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        profileImgUrl: null
      },
      {
        email: 'fakeUser1@fakeuser.com',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password'),
        profileImgUrl: null
      },
      {
        email: 'fakeUser2@fakeuser.com',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password'),
        profileImgUrl: null
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
