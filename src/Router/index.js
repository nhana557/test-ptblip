const express = require('express')
const products = require('./products.routes')

const router = express.Router()

router
    .use("/products", products)

module.exports = router;