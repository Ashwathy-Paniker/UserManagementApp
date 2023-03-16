const express = require('express')
const cors = require('cors')
const PORT = 9000;
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const userrouter = require('./Router/userrouter')
app.use('/api', userrouter)

const connectDB = require('./DBConnect/connectDB')
connectDB()

app.listen(PORT, (err) => {
    if (err) throw err;
    else {
        console.log("Server runs on " + PORT)
    }
})