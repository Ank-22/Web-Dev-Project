import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("GroupItemModel", schema);
export default model;