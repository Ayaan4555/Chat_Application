
const mongoose = require("mongoose");

const uri = "mongodb+srv://AyaanSayyed:AyaanSayyed55@cluster0.hgqq7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(uri, {


        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (err) {
        console.log(`Error : ${err.message}`);
        process.exit();
    }
};

module.exports = connectDB;