import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: Number,
  username: { type: String, required: true, unique: true },
  email: String,
  role: {
    type: String,
    enum: ["admin", "member"],
    default: "member",
  },
  Password: { type: String, required: true },
  first_name: String,
  last_name: String,
  country: String,
  age: Number,
  groups: [
    {
      group_id: String,
      role: String,
    },
  ],
});

export default mongoose.model("User", userSchema);
