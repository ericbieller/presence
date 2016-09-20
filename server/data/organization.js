var mongoose = require("mongoose");
var organizationSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model("organization", organizationSchema);