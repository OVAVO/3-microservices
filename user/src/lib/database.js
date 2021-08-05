const mongoose = require("mongoose");
const connection = "mongodb://root:rootpassword@user-database:27017/control-panel?authSource=admin";   // veritabani adi dusunulecek

const db = {}
db.connectDb = () => {
    return mongoose.connect(connection, {useNewUrlParser: true});
};
db.users = require("../models/user");

module.exports = db;