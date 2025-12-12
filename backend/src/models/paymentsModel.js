import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";
import Gatepass from "./gatepassModel.js";


const Payments = sequelize.define('payments', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    gatepassId: {
        type: DataTypes.INTEGER,
        references: {
            model: Gatepass,
            key: 'id'
        }
    },

    paymentMode: {
        type: DataTypes.STRING,
        allowNull: false
    },

    paymentRef: {
        type: DataTypes.STRING,
    },

    isDeleted: {
        type: DataTypes.BOOLEAN
    }
})


export default Payments
