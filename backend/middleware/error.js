const ErrorHandler = require("../utils/ErrorHandler")

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server Error"

    // wrong mondodb id error

    // Usage example
    app.use((req, res, next) => {
      const error = new ErrorHandler('Not Found', 404); // Make sure to use 'new'
      next(error);
    });
    

    // Duplicate key error
    if(err.code === 11000){
        const message = `Duplicate key ${Object.keys(err.keyvalue)} Entered`;
        err = new ErrorHandler(message, 400)
    }


    //Wrong jwt error
    if(err.name === "JsonWeb TokenError"){
        const message = `Your url is Invalid please try again later`;
        err = new ErrorHandler(message, 400);
    }

    //jwt expired
    if(err.name === "TokenExpiredError") {
        const message = `Your Url is expired please try again later`;
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}