import model from "./model.js";

export const createRecipe = (recipe) => model.create(recipe);
export const findAllRecipes = () => model.find();
export const findRecipeById = (recipeId) => model.findById(recipeId);
export const updateRecipe = (recipeId, recipe) => model.updateOne({ _id: recipeId }, { $set: recipe });
export const deleteRecipe = (recipeId) => model.deleteOne({ _id: recipeId });

export const modifyLikes = async (recipeId, userId) => {
  const recipe = await model.findById(recipeId);
  const index =[ recipe.likeByUsers.indexOf(userId)];
  if (index > -1) {
    recipe.likeByUsers.splice(index, 1);
    recipe.Likes -= 1;
  } else {
    recipe.likeByUsers.push(userId);
    recipe.Likes += 1;
  }
  console.log(recipe.save())
  return recipe.save();
};

export const addComment = (recipeId, comment) =>
  model.findByIdAndUpdate(recipeId, { $push: { comments: comment } }, { new: true });

export const editComment = (recipeId, commentId, editedComment) =>
  model.updateOne({ _id: recipeId, "comments._id": commentId }, { $set: { "comments.$": editedComment } });

export const deleteComment = (recipeId, commentId) =>
  model.findByIdAndUpdate(recipeId, { $pull: { comments: { _id: commentId } } }, { new: true });

export const searchRecipesByKeyword = (keyword) =>
  model.find({ name: { $regex: keyword, $options: 'i' } }); // Case-insensitive search on the name field