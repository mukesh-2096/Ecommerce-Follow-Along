const mongoose = reruire("mongoose");

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlparser: true,
        useUnifiedTopology: true,
    }).then((data) => {
        console.log(`mongod connected with server: ${data.connection.host}`);
    });
}

module.exports = connectDatabase;