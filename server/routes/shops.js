const express = require('express');
const router = express.Router();
const passport = require('passport');
const Shop = require('../models/shop');
const User = require('../models/user');

// Return User's Nearby Shops

router.get('/nearbyShops', passport.authenticate('jwt', {session: false}),(req, res, next) => {
	const query = {
		location: {
			$near: {
				$geometry: {
					type: "Point",
					coordinates: [ 0 , 0 ]
				}
			}
		}
	}

	Shop.find(query, (err, shops) => {
		if (err) throw err;
		return res.json(shops);
	})
});

// Return User's Preferred Shops

router.post('/preferredShops', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    User.getUserByEmail(req.body.email, (err, user) => {
    	if (err) throw err;
    	return res.json(user.preferred)
    });
});

// Add Shop to User's preferred shops

router.post('/addShop', passport.authenticate('jwt', {session: false}), (req, res, next) => {
	Shop.getShopById(req.body.shopID, (err, shop) => {
		if (err) throw err;
		User.findByIdAndUpdate(req.body.userID,
    	{$push: {preferred: shop}},
    	{safe: true, upsert: true},
        (err, model) => {
        if (err) throw err;
        return res.json({status: "Shop added successfully"})
    });
 });
});

module.exports = router;