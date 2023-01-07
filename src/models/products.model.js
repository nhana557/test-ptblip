const db =require('../config/db')

const model = {
    getProducts : ({limit, offset, sort,sortby, querySearch}) =>{
        return db.query(`SELECT * FROM products ${querySearch} ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
    },
    getProductsById : (id) =>{
        return db.query('SELECT * FROM products WHERE id=$1', [id])
    },
    create: ({id, name, price, description, image}) =>{
        return db.query(
            "INSERT INTO products(id, name, price, description, image) VALUES($1, $2, $3, $4, $5)", [id, name, price, description, image])
    },
    update: ({id, name, price, description, image}) =>{
        return db.query("UPDATE products SET name=$1, price=$2, description=$3, image=$4 WHERE id=$5", [name, price, description, image, id])
    },
    deleteProducts: (id) =>{
        return db.query("DELETE FROM products WHERE id=$1", [id])
    },
    countData : () =>{
        return db.query('SELECT COUNT(*) FROM products')
    }
}

module.exports = model;