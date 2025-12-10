import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Hello from docker-dev with hot reload on save?')
})
app.listen(PORT, () => {
    console.log(`Backend up and running on port hello000000${PORT}`)
})
