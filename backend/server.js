const app = require("./app");



//Handling uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server for handling uncaught exception`);
})

//config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path:"backend/config/.env"
    })
}

// connect db 
connectDatabase();

//create server
const server = app.listen(process.env.PORT,() => {
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})

// unhandled promise rejection
process.on("unhand ledRejection", (err) => {
    console.log(`shutting down the server for ${err.message}`);
    console.log(`shutting down the server for unhandle promise rejection`);

    server.close(() => {
        process.exit(1);
    })
});