const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;
// Create user schema
const UserDetailsSchema = new mongoose.Schema({});

// Add Passport authentication functionality
UserDetailsSchema.plugin(passportLocalMongoose);

// Create and export user model
module.exports = mongoose.model("UserDetails", UserDetailsSchema);