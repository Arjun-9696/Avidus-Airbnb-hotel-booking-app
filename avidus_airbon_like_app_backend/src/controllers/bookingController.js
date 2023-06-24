const express = require('express');
const Booking = require('../models/bookingModel');
const router = express.Router();

// Booking creation endpoint
router.post('/', async (req, res) => {
    const { propertyId, userId, startDate, endDate, days, cost } = req.body;
    try {
        // Create a new booking
        const newBooking = new Booking({
            propertyId,
            userId,
            startDate,
            endDate,
            days,
            cost,
        });
        await newBooking.save();
        res.status(201).json({ message: 'Booking created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Retrieve bookings for a specific user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const bookings = await Booking.find({ userId });
        res.json({ bookings });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
