import mongoose from "mongoose";
import groupSchema from "./schema.js";
const model = mongoose.model("Group", groupSchema);
export default model;