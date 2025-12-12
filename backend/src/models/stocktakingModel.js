import { DataTypes } from "sequelize"
import sequelize from "../../config/db.js"

const StockTaking = sequelize.define('stockTaking', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    stockDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    zoneTrucks: {
        type: DataTypes.JSONB,
        allowNull: false,
        
    },

    isDeleted: {
        type: DataTypes.BOOLEAN
    }
})


export default StockTaking;
