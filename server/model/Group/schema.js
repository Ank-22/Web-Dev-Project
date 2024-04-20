import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  id: String,
  name: { type: String, required: true, unique: true },
  description: String,
});

export default mongoose.model("Group", groupSchema);
