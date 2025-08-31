const express = require('express');
const dotenv = require('dotenv');
const connectionToDB = require('./connection');

dotenv.config();
const PORT = process.env.PORT || 4500;

const app = express();

connectionToDB(`${process.env.DB_URI}/${process.env.DB_NAME}`)
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log('MongoDB Error: ', err));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));