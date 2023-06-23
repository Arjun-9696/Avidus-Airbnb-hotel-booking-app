const express = require('express');
const app = express();
const cors = require('cors');
const { Register, Login } = require('./src/controllers/authController');
const ListingController = require('./src/controllers/listingController');
const SearchController = require('./src/controllers/searchController');
const connect = require('./src/configs/db');
app.use(express.json());
app.use(cors());
app.post('/register', Register);
app.post('/login', Login);
app.use('/listings', ListingController);
app.use('/search', SearchController);
app.use('/', (req, res) => {
    res.json({ message: 'Hello🥳 server is running' })
});


const port = process.env.PORT || 9080;
app.listen(port, async () => {
    try {
        await connect();
        console.log(`Listening to port number ${port}..`);
    } catch (err) {
        console.log('Err', err);
    }
});
module.exports = app;