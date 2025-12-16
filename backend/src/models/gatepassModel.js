import { DataTypes } from "sequelize";

import sequelize from "../../config/db.js";


const Gatepass = sequelize.define('gatepass', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    gatepass: {
        type: DataTypes.INTEGER,
        
        allowNull: false,
        unique: true
    },

    vehicleReg: {
        type: DataTypes.STRING,
        allowNull: false
    },

    trailerReg: {
        type: DataTypes.STRING,
    },

    driverName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    driverLicenseNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },

    ownerName: {
        type: DataTypes.STRING
    },

    category: {
        type:DataTypes.STRING,

    },

    dateIn: {
        type: DataTypes.DATE,
        allowNull: false
    },

    dateOut: {
        type: DataTypes.DATE
    },

    status: {
        type:DataTypes.STRING
    },

    balance: {
        type: DataTypes.INTEGER
    },

    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }


})


export default Gatepass
