const model  =require('../models/products.model')
const { v4 : uuid } =require('uuid')
const cloudinary = require('../middleware/cloudinary')
const common = require('../helper/common')
const controllersProducts = {
    getProducts: async(req, res) =>{
        try {
            const result = await model.getProducts()
            common.response(res, result.rows, "getAllProducts", 201)
        } catch (error) {
            console.log(error)
        }
    },
    createProduct : async(req, res) =>{
        try {
            const { name, price, description } = req.body;
            const file = req.file.path;
            const result = await cloudinary.uploader.upload(file)
            const image = result.secure_url
            const data = {
                id: uuid(),
                name,
                price,
                description,
                image
            }
            await model.create(data)
            common.response(res, data, "Created", 201)
        } catch (error) {
            console.log(error)
        }
    },
    updateProduct : async(req, res) =>{
        try {
            const { name, price, description } = req.body;
            const { id } = req.params;
            const file = req.file.path
            const result = await cloudinary.uploader.upload(file)
            const image = result.secure_url
            const data ={
                id,
                name, 
                price, 
                description, 
                image
            }
            await model.update(data)
            common.response(res, data, "Updated", 201)
        } catch (error) {
            console.log(error)
        }
    },
    deleteProducts: async(req, res) =>{
        try {
            const { id } = req.params;
            await model.deleteProducts(id)
            common.response(res, null, "deleted", 201)
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = controllersProducts