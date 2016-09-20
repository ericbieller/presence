var mongoose = require("mongoose")
var Schema = mongoose.Schema
var userSchema = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    organization_id: Schema.Types.ObjectId
});

module.exports = mongoose.model("user", userSchema);