const express = require('express');
const Listing = require('../models/listingModel');

const router = express.Router();

// Property creation endpoint
router.post('/', async (req, res) => {
    const { title, description, location, price } = req.body;

    try {
        // Create a new property listing
        const newListing = new Listing({
            title,
            description,
            location,
            price,
        });
        await newListing.save();

        res.status(201).json({ message: 'Property listing created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Property retrieval endpoint
router.get('/', async (req, res) => {
    try {
        // Retrieve all property listings from the database
        const listings = await Listing.find();

        res.json({ listings });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        // Retrieve all property listings from the database
        const list = await Listing.findById(req.params.id);
        
        res.json({ list });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
