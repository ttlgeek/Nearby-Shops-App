const mongoose = require('mongoose');
const config = require('../config/database');

//Shop Schema

const ShopSchema = mongoose.Schema({
	_id: {type: mongoose.Schema.Types.ObjectId},
	picture: {type: String},
	name: {type: String},
	email: {type: String},
	city: {type: String},
	location: {
		type: {type: String},
		coordinates: {type: Array}
	}
});

const Shop = module.exports = mongoose.model('shop', ShopSchema, "shops");

module.exports.getShopById = (id, callback) => {
	Shop.findById(id, callback);
}