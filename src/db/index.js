const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  password: "123123",
  user: "root",
  host: "localhost",
  database: "inventory-development",
  port: '3306'
})

let invertorydb = {};

invertorydb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM products;`, (err, result) => {
      if(err){
        return reject(err);
      }else{
        return resolve(result)
      }
    })
  })
}

invertorydb.findOne = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM products WHERE id = ?`, id, (err, result) => {
      if(err){
        return reject(err);
      }else{
        return resolve(result);
      }
    })
  })
}

invertorydb.create = (newProduct) => {
  return new Promise((resolve, reject) => {
    pool.query(`
      INSERT INTO products (product_name) VALUES (?)`, 
      newProduct.product_name, 
    (err, result) =>{
      if(err){
        return reject(err);
      }else{
        return resolve(result);
      }
    })
  })
}

invertorydb.update = (id, editProduct) => {
  return new Promise((resolve, reject) => {
    pool.query(`
      UPDATE products SET product_name = ? WHERE id = ?;
    `, [editProduct.product_name, id], (err, result) => {
      if(err){
        return reject(err);
      }else{
        return resolve(result);
      }
    })
  })
}

module.exports = invertorydb;