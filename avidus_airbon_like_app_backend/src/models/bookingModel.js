const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    days: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Booking', bookingSchema);
