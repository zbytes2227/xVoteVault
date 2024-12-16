const mongoose = require("mongoose");
// mongoose.set('strictQuery', true);

const VoteSchema = new mongoose.Schema(
  {
    VoteTitle: { type: String, required: true },
    options: { type: Array, required: true }, 
  
  },
  { collection: "All-Votes" },
  { timestamps: true }
);

mongoose.models = {};
const Votes = mongoose.model("Votes", VoteSchema);
module.exports = Votes;