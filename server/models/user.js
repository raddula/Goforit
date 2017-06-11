"use strict";

module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define('user', {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            get: function() {
                return this.getDataValue('user_id');
            }
        },
        email_id: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            get: function() {
                this.getDataValue('email_id');
            },
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            get: function() {
                this.getDataValue('password');
            }
        }
    }, {
        freezeTableName: true,
        indexes: [{
            unique: true,
            fields: ['email_id']
        }],
        timestamps: false
    });
    return User;
};
