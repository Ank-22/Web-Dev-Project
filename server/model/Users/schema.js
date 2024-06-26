import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: String,
  username: { type: String, required: true, unique: true },
  email: String,
  role: {
    type: String,
    enum: ["admin", "member", "chef"],
    default: "member",
  },
  password: { type: String, required: true },
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

export default userSchema;
