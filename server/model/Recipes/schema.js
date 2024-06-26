import mongoose from "mongoose";

// Comment Subdocument Schema
const commentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true }
}, { _id: false });

// Recipe Schema
const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  cuisines: { type: String,  },
  ingredients: [{ type: String, }],
  cooking_time: { type: String,  },
  type: { type: String,  },
  meat_type: { type: String, default: "NA" },
  steps: [{ type: String, required: true }],
  GroupID: { type: String, default: "NA" },
  Likes: { type: Number, default: 0 },
  likeByUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Assuming User model exists
  comments: [commentSchema],
  owner: { type: String },
  imageUrl: { type: String }
});


export default recipeSchema;
