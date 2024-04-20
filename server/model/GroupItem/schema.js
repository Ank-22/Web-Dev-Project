import mongoose from "mongoose";

const groupItemSchema = new mongoose.Schema({
  id: String,
  group_id: String,
  name: { type: String, required: true },
  description: String,
  steps: String,
});

export default mongoose.model("GroupItem", groupItemSchema);
