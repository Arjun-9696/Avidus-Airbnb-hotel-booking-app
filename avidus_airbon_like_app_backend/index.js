const connect = require('./src/configs/db');
const app = require('./servers');

const port = process.env.PORT || 8080;
app.listen(port, async () => {
    try {
        await connect();
        console.log(`Listening to port number ${port}..`);
    } catch (err) {
        console.log('Err', err);
    }
});