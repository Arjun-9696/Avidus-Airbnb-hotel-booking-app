const mongoose = require('mongoose');
module.exports = () => {
    return mongoose.connect(
        'mongodb+srv://Arjun:Arjun009@cluster0.4dwre.mongodb.net/avidus_airbon_app?retryWrites=true&w=majority'
    );
};

