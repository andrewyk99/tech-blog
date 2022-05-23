const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcyrpt = require('bcrypt');

// Create User model
class User extends Model {
    checkPassword(loginPw) {
        return bcyrpt.compareSync(loginPw, this.password);
    }
};

// Define table columns and configuration
User.init(
    {
        // Define ID column
        id: {
            // Use the Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4]
            }
        }
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcyrpt.has(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcyrpt.has(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;