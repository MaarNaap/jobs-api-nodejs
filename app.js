// create server
const express = require('express');
require('dotenv').config();
const connectDB = require('./db/connect');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const auth = require('./routes/auth');


const app = express();

// connet to db and start server
async  function start() {
    try {
        await connectDB(process.env.MONGO_URI);
        const PORT = process.env.port || 3000;
        app.listen(PORT, () => console.log(`Server is on port ${PORT}..`));
    } catch (error) {
        console.log(error);
    };
};
start();

// middleware uses

// routers
app.use('/api/v1', auth);


// 404 and error handler middleware
app.use(notFound);
app.use(errorHandler);
