import { Sequelize } from "sequelize";

import sequelize from "../../config/db.js";

// import the models

import Gatepass from "./gatepassModel.js";
import MonthlyTrucks from "./monthlyTrucksModel.js";
import Users from "./usersModel.js";
import UsersAction from "./usersActionModel.js";
import StockTaking from "./stocktakingModel.js";
import Payments from "./paymentsModel.js";

// Association 

// each payment belongs to a gatepass
Payments.belongsTo(Gatepass, {foreignKey: 'gatepassId'});

Gatepass.hasMany(Payments, {foreignKey: 'gatepassId'});

// one User has many actions
Users.hasMany(UsersAction, {foreignKey: 'userId'});

// Each action has one user
UsersAction.belongsTo(Users, {foreignKey: 'userId'});

export {
    sequelize,
    Gatepass,
    MonthlyTrucks,
    Users,
    UsersAction,
    StockTaking,
    Payments
}
