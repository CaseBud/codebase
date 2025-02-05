require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const { errorHandler } = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const transcriptRoutes = require('./routes/transcriptRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');

const app = express();
app.set('trust proxy', 1);

mongoose
    .connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 60000, // 1 minute
        socketTimeoutMS: 45000 // 45 seconds
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));

app.use(
    cors({
        origin:
            process.env.NODE_ENV === 'production'
                ? process.env.FRONTEND_URL
                : '*', // allow requests from all domains in development
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);

app.use(helmet());
// app.use(cors());

// Handle preflight OPTIONS requests manually
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS, HEAD'
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(204); // No Content
});

const limiter = rateLimit({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour'
});
app.use('/api', limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());
app.use(xss());

app.use(compression());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/chat', conversationRoutes);
app.use('/api/transcribe', transcriptRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/ping', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'pong'
    });
});

// 404 handler
app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `${req.originalUrl} not found.`
    });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
