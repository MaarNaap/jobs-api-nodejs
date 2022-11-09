const express = require('express');
require('dotenv').config();
const connectDB = require('./db/connect');
const authorizeUser = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const auth = require('./routes/auth');
const jobs = require('./routes/jobs');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const expressRateLimiter = require('express-rate-limit');

const app = express();


// middleware uses

// security
app.set('trust proxy', 1) // for express rate limit
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(expressRateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    }
));

app.use(express.json());
// routers
app.use('/api/v1', auth);
app.use('/api/v1/jobs', authorizeUser, jobs);

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