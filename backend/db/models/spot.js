'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    title: {
      allowNull: false,
      type: DataTypes.STRING(150),
      validate: {
        len: [4, 150]
      }
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING(150),
      validate: {
        len: [3, 150]
      }
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING(100),
      validate: {
        len: [2, 100]
      }
    },
    state: {
      type: DataTypes.STRING(50)
    },
    zipCode: {
      allowNull: false,
      type: DataTypes.STRING(25),
      validate: {
        len: [3, 25]
      }
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING(100),
      validate: {
        len: [3, 100]
      }
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL,
      // validate: {
      //   min: 5,
      //   max: 100000
      // }
    },
    bedrooms: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 50
      }
    },
    bathrooms: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 50
      }
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [4, 500]
      }
    },
    hostId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    lat: {
      type: DataTypes.DECIMAL
    },
    lng: {
      type: DataTypes.DECIMAL
    },
  }, {});
  Spot.associate = function(models) {
    // associations can be defined here
    Spot.belongsTo(models.User, {foreignKey: 'hostId'})
    Spot.hasMany(models.Image, {
      foreignKey: 'spotId',
      onDelete: 'cascade',
      hooks: true
    })

  };
  return Spot;
};
