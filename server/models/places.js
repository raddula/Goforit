"use strict";

module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define('places', {
        place_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            get: function() {
                return this.getDataValue('place_id');
            }
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
            get: function() {
                this.getDataValue('address');
            }
        },
        img: {
            type: Sequelize.STRING,
            allowNull: false,
            get: function() {
                this.getDataValue('img');
            }
        },
        trust_factor: {
            type: Sequelize.INTEGER,
            allowNull: false,
            get: function() {
                this.getDataValue('trust_factor');
            }
        },
        longitude: {
            type: Sequelize.INTEGER,
            allowNull: false,
            get: function() {
                this.getDataValue('longitude');
            }
        },
        latitude: {
            type: Sequelize.INTEGER,
            allowNull: false,
            get: function() {
                this.getDataValue('latitude');
            }
        },
        topic_name: {
            type: Sequelize.STRING,
            allowNull: false,
            get: function() {
                this.getDataValue('topic_name');
            }
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return User;
};
