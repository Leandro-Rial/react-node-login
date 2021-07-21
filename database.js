const mongoose = require('mongoose');

const uri = "mongodb://localhost/react-node-website"

mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Database connected");
})