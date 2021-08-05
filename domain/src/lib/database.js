const mongoose = require("mongoose");
const connection = "mongodb://root:rootpassword@domain-database:27017/control-panel?authSource=admin";   // veritabani adi dusunulecek

const db = {}
db.connectDb = () => {
    return mongoose.connect(connection, {useNewUrlParser: true});
};
db.domains = require("../models/domain");

module.exports = db;