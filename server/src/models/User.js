const { DataTypes } = require('sequelize');
const { sequelize } = require('./config');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    nric: {
        type: DataTypes.STRING(9),
        allowNull: false,
        unique: true
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

// Instance method to check password
User.prototype.checkPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = User;