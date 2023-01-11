require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Router = require('./src/Router/index')
const createError = require('http-errors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(Router)
app.all("*", (req, res, next) => {
    next(new createError.NotFound())
})

app.use((err,req,res,next)=>{
    const messageError = err.message || "internal server error"
    const statusCode = err.status || 500
    res.status(statusCode).json({
        message : messageError
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>{
    console.log("server running in http://localhost:5000")
})