const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');

const connectionToDB = require('./connection');

const urlRoutes = require('./routes/url');
const staticRoutes = require('./routes/staticRoutes');
const userRoutes = require('./routes/user');

const { restrictToLoggedInUserOnly, checkAuth } = require('./middlewares/auth');

dotenv.config();
const PORT = process.env.PORT || 4500;

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

connectionToDB(`${process.env.DB_URI}/${process.env.DB_NAME}`)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log('MongoDB Error: ', err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', checkAuth, staticRoutes);
app.use('/url', restrictToLoggedInUserOnly, urlRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));