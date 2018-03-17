const express = require('express');
const router = express.Router();
const passport = require('passport');
const Shop = require('../models/shop');

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

module.exports = router;