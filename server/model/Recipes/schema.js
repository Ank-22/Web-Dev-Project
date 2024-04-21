import mongoose from "mongoose";

const recipeSchema =  new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    cuisines: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    cooking_time: { type: String, required: true },
    type: { type: String, required: true },
    meat_type: { type: String, default: 'NA' },
    steps: { type: String, required: true },
    GroupID: { type: String, default: 'NA' },
    Likes: { type: Number, default: 0 },
    comments: [{
      type: String
    }]
  });
  

export default recipeSchema;
