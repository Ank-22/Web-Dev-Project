import model from "./model.js";

export const createRecipe = (recipe) => model.create(recipe);

export const findAllRecipes = () => model.find();

export const findRecipeById = (recipeId) => model.findById(recipeId);

export const updateRecipe = (recipeId, recipe) => model.updateOne({ _id: recipeId }, { $set: recipe });

export const deleteRecipe = (recipeId) => model.deleteOne({ _id: recipeId });

export const modifyLikes = (recipeId, newLikes) => model.updateOne({ _id: recipeId }, { $set: { Likes: newLikes } });

export const addComment = (recipeId, comment) => model.updateOne({ _id: recipeId }, { $push: { comments: comment } });

export const editComment = (recipeId, commentIndex, editedComment) => 
  model.updateOne({ _id: recipeId, "comments.": commentIndex }, { $set: { "comments.$": editedComment } });

export const deleteComment = (recipeId, commentIndex) =>
  model.updateOne({ _id: recipeId }, { $pull: { comments: { $eq: commentIndex } } });
