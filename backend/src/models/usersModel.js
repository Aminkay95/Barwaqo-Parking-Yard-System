import sequelize from "../../config/db.js"
import { DataTypes } from "sequelize"

const Users = sequelize.define('users', {
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    role : {
        type: DataTypes.STRING,
        allowNull: false
    },

    hashedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isDeleted:{
        type: DataTypes.STRING,
        defaultValue: 'false'
    }
},
{
    defaultScope:{
        attributes: { exclude: ['hashedPassword']}
    },
    scopes: {
        withPassword: {
            attributes: {}
        }
    }
}

)

export default Users;
