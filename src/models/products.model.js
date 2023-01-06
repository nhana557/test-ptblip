const db =require('../config/db')

const model = {
    getProducts : () =>{
        return db.query('SELECT * FROM products')
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
    }
}

module.exports = model;