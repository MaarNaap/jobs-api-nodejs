const express = require('express');
require('dotenv').config();
const connectDB = require('./db/connect');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const auth = require('./routes/auth');
const jobs = require('./routes/jobs');


const app = express();


// middleware uses
app.use(express.json());
// routers
app.use('/api/v1', auth);
app.use('/api/v1/jobs', jobs);

// 404 and error handler middleware
app.use(notFound);
app.use(errorHandler);

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