const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 4500;
const employeeRoute = require('./routes/employeeRoutes');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.CONN_STRING, { useNewUrlParser: true }).then(() => {
    console.log("Database Connected Successfully!!");    
}).catch(err => { 
    console.log('Could not connect to the database', err);
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to my Flutter Node Express Crud API"});
});

app.use('/employee', employeeRoute);
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});