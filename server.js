require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
require('./database');

// Settings
const app = express();

// Middelware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true
}))

// Router
app.use('/user', require('./routes/userRouter'));

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})