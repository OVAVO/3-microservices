// dbPassword = 'mongodb+srv://root:'+ encodeURIComponent('rootpassword') + '@CLUSTER_NAME_HERE.mongodb.net/test?retryWrites=true';

// module.exports = {
//     mongoURI: dbPassword
// };


const mongoose = require("mongoose");
const connection = "mongodb://root:rootpassword@node_passport_login_database:27017/control-panel?authSource=admin";   // veritabani adi dusunulecek

const db = {}
db.connectDb = () => {
    return mongoose.connect(connection, {useNewUrlParser: true});
};
db.users = require("../models/User");

module.exports = db;