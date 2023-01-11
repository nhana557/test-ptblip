const model  =require('../models/products.model')
const { v4 : uuid } =require('uuid')
const cloudinary = require('../middleware/cloudinary')
const common = require('../helper/common')
const controllersProducts = {
    getProducts: async(req, res, next) =>{
        try {
            const page = Number(req.query.page) || 1
            const limit = Number(req.query.limit) || 5;
            const offset = (page - 1) * limit
            const searchby = req.query.searchby || 'name'
            const sortby = req.query.sortby || 'name'
            const sort = req.query.sort || "ASC"
            const {rows: [count]} = await model.countData()

            const search = req.query.search;
            let querySearch = '';
            if (search) {
                querySearch =  `where ${searchby} ILIKE '%${search}%'` ;
            }
            const result={
                limit,
                offset,
                sort,
                sortby,
                querySearch
            
            }
            const data = await model.getProducts(result)
            const totalData = parseInt(count.count)
            const totalPage = Math.ceil(totalData / limit)
            const pagination ={     
                    currentPage : page,
                    limit:limit,
                    totalData:totalData,
                    totalPage:totalPage
            }
            common.response(res, data.rows, "getAllProducts", 201, pagination)
        } catch (error) {
            next(error)
        }
    },
    getProductsById: async(req, res, next) =>{
        try {
            const { id } = req.params;
            const result = await model.getProductsById(id)
            common.response(res, result.rows, "products detail", 201)
        } catch (error) {
            next(error)
        }
    },
    createProduct : async(req, res, next) =>{
        try {
            const { name, price, description } = req.body;
            const file = req.file.path;
            const result = await cloudinary.uploader.upload(file)
            console.log(result);
            const image = result.url
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
            next(error)

        }
    },
    updateProduct : async(req, res, next) =>{
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
            next(error)

        }
    },
    deleteProducts: async(req, res, next) =>{
        try {
            const { id } = req.params;
            await model.deleteProducts(id)
            common.response(res, null, "deleted", 201)
        } catch (error) {
            next(error)

        }
    }
}
module.exports = controllersProducts