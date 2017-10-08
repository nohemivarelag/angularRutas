'use strict'
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema

const ProductSchema = Schema ({
    name: String,
    price: Number,
    description: String,
    images: String,
    stock: Number,
    discounts: [Number],
    reviews: {
        stars: Number,
        Comments: String,
        author: String
    }
});
module.exports = mongoose.model('fgemproduct', ProductSchema)
