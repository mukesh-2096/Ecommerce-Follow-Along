const app = require("./app");
const connectDatabase = require("./db/Database")


// Handling uncaught Exception

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shuttind down the server for handling uncaught expectation`)
})



// Config
if (process.env.NODE_ENV !== 'PRODUCTION') {
    require("dotenv").config({
        path: 'backend/config/.env'
    })
}


//connect db
connectDatabase();

// create serve

const PORT = process.env.PORT || 5000;

const server = app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})


// unhandle promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`shutting down the server for ${err.message}`)
    console.log(`stutting dowm the server for unhandling promise rejection`)


    server.close(() => {
        process.exit(1);
    })
})