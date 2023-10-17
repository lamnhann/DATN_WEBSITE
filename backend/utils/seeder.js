const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/products');
const { connect } = require('mongoose');


// Setting dotenv file
dotenv.config({ path: 'backend/config/config.env' })

connectDatabase();

const seedProduct = async () => {
    try{
        await Product.deleteMany();
        console.log('Sản phẩm đã được xoá');

        await Product.insertMany(products);
        console.log('Sản Phẩm đã được thêm');

        process.exit();

    } catch(error){
        console.log(error.message);
        process.exit();
    }
};

seedProduct();