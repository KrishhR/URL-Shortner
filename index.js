import express from 'express';
import { config } from 'dotenv';
import { resolve } from 'path';
import cookieParser from 'cookie-parser';

import connectionToDB from './connection.js';

import urlRoutes from './routes/url.js';
import staticRoutes from './routes/staticRoutes.js';
import userRoutes from './routes/user.js';
import urlController from './controllers/url.js';

import authMiddleware from './middlewares/auth.js';

config();
const PORT = process.env.PORT || 4500;

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', resolve('./views'));

connectionToDB(`${process.env.DB_URI}/${process.env.DB_NAME}`)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log('MongoDB Error: ', err));

function startServer() {
    try {
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(authMiddleware.checkForAuthentication);

        app.use('/', staticRoutes);
        app.use('/user', userRoutes);

        // Public access for redirect route
        app.get('/:shortId', urlController.handleRedirectToOriginalUrl);

        app.use('/url', authMiddleware.restrictTo(['NORMAL', 'ADMIN']), urlRoutes);

        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    }
    catch (err) {
        console.log(err);
    }
}

startServer();