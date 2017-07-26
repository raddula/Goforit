"use strict";

module.exports = function(sequelize, Sequelize) {
    var Post = sequelize.define('post', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            get: function() {
                return this.getDataValue('id');
            }
        },
        parent_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            get: function() {
                this.getDataValue('parent_id');
            }
        },
        place_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            get: function() {
                this.getDataValue('place_id');
            }
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
            get: function() {
                this.getDataValue('type');
            }
        },
        comment_count: {
            type: Sequelize.INTEGER,
            allowNull: false,
            get: function() {
                this.getDataValue('comment_count');
            }
        },
        trust_count: {
            type: Sequelize.INTEGER,
            allowNull: false,
            get: function() {
                this.getDataValue('trust_count');
            }
        },
        posted_by: {
            type: Sequelize.INTEGER,
            allowNull: false,
            get: function() {
                this.getDataValue('posted_by');
            }
        },
        posted_as: {
            type: Sequelize.STRING,
            allowNull: false,
            get: function() {
                this.getDataValue('posted_as');
            }
        },
        content_type: {
            type: Sequelize.STRING,
            allowNull: false,
            get: function() {
                this.getDataValue('content_type');
            }
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
            get: function() {
                this.getDataValue('content');
            }
        },
        post_time: {
            type: Sequelize.DATE,
            defaultValue: function() {
            	return new Date();
            },
            allowNull: false,
            get: function() {
                this.getDataValue('post_time');
            }
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Post;
};
