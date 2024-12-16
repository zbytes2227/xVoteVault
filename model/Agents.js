const mongoose = require("mongoose");
// mongoose.set('strictQuery', true);

const AgentSchema = new mongoose.Schema(
  {
    Agent_ID: { type: String, required: true, unique: true },
    Agent_Name: { type: String, required: true },
    Agent_Email: { type: String, required: true },
    VotedFor: { type: String },

  },
  { collection: "All-Agents" },
  { timestamps: true }
);

mongoose.models = {};
const Agents = mongoose.model("Agents", AgentSchema);
module.exports = Agents;