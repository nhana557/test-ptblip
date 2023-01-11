const express = require("express")
const controllersProducts  = require("../controllers/products.controller")
const upload = require('../middleware/upload')
const router = express.Router()

router
    .get("/", controllersProducts.getProducts)
    .get("/:id", controllersProducts.getProductsById)
    .post("/", upload.single("image"), controllersProducts.createProduct)
    .put("/:id", upload.single("image"), controllersProducts.updateProduct)
    .delete("/:id", controllersProducts.deleteProducts)

module.exports = router;