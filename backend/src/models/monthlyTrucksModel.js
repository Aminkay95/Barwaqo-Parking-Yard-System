import { DataTypes } from "sequelize"

import sequelize from "../../config/db.js"

const MonthlyTrucks = sequelize.define('monthlyTrucks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    vehicleReg: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    ownerName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    rate: {
        type: DataTypes.INTEGER,
        defaultValue: 300
    },

    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

export default MonthlyTrucks
