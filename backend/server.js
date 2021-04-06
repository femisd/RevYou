require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 4000;

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database.'));

// Middleweare for converting responses to json.

app.use(express.json());
app.use(cors());

const contentRouter = require('./routes/content');
app.use('/content', contentRouter)


app.listen(
    PORT,
    () => console.log(`Server is ready on port: ${PORT}`)
)