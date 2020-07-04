const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const followSchema = new Schema({
  userId: { type: String, required: true },
  follows: { type: String, required: true },
});

const Follows = mongoose.model("Follows", followSchema);
module.exports = Follows;
