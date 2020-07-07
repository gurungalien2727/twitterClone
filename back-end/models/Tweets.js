const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const tweetSchema = new Schema({
  username: { type: String, required: true },
  tweet: { type: String, required: true },
  createdAt:{type:Date, default:Date.now}
});

const Tweets=mongoose.model("Tweets",tweetSchema);
module.exports=Tweets;