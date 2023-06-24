const express = require('express')
const Property = require('../models/listingModel');
const router = express.Router();

// Search for properties based on filters
router.get("/", async (req, res) => {
    try {
        const { title, description, price, location, startDate, endDate } = req.query;
        // Build the query object based on the provided filters
        const query = {};

        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }
        if (description) {
            query.description = { $regex: description, $options: 'i' };
        }
        if (price) {
            query.price = price;
        }
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }
        if (startDate && endDate) {
            query.startDate = { $gte: startDate };
            query.endDate = { $lte: endDate };
        }

        const properties = await Property.find(query);
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
module.exports = router;