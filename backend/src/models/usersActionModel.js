import { DataTypes } from "sequelize";

import sequelize from "../../config/db.js";
import Users from "./usersModel.js";

const UsersAction = sequelize.define('usersAction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id'
        }
    },

    action: {
        type: DataTypes.JSONB
    },

    timeOfAction: {
        type: DataTypes.DATE
    },

    isDeleted: {
        type: DataTypes.BOOLEAN
    }
})

export default UsersAction;
