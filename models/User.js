const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  lastName: String,
  firstName: String,
  country: String,
  collections: [ {type: Schema.Types.ObjectId, ref: 'Collection'}]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
