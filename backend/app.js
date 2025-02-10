const express = require('express');
const fileUpload = require('express-fileupload');
const ErrorHandler = require('./utils/ErrorHandler');
const app = express();
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload({useTempFiles: true}));

// Config
if(process.env.NODE_ENV !== 'PRODUCTION'){
    require("dotenv").config({
        path:'backend/config/.env'
    })
}



// It's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;