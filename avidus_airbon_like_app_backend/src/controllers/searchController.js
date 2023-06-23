// routes/search.js
const express = require('express');
const Listing = require('../models/listingModel');

const router = express.Router();

// Search endpoint
router.post('/', async (req, res) => {
    const { location, dateRange, size } = req.body;

    try {
        let query = {};

        // Apply filters
        if (location) {
            query.location = location;
        }

        if (dateRange) {
            query.dateRange = dateRange;
        }

        if (size) {
            query.size = size;
        }

        // Retrieve filtered property listings from the database
        const listings = await Listing.find(query);

        res.json({ listings });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
