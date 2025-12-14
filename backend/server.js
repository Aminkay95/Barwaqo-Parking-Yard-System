import express from 'express'
import dotenv from 'dotenv'
// import sequelize from './config/db.js'
import { sequelize, Gatepass, Users, UsersAction, Payments, MonthlyTrucks, StockTaking} from "./src/models/indexModel.js"
import errorMiddleware from './src/middlewares/errorMiddleware.js'

dotenv.config()

const app = express()
app.use(express.json())


try {
    await sequelize.authenticate();
    console.log('Connected to DB!');

    await sequelize.sync({ alter:true})
    console.log('DB Synced.')
} catch (err) {
    console.error("DB connection failed due to ",err)
}

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Hello from docker-dev with hot reload on save?')
})

//Error Middleware

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`Backend up and running on port hello${PORT}`)
})
