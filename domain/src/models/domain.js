const mongoose = require("mongoose");
const domainSchema = new mongoose.Schema({
    domainname: {
        type: String
    }
});
const Domain = mongoose.model("Domain", domainSchema);
module.exports = Domain;