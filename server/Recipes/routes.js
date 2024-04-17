import * as dao from "./dao.js";

export default function RecipeRoutes(app) {
  const createRecipe = async (req, res) => {
    const recipe = await dao.createRecipe(req.body);
    res.json(recipe);
  };

  const findAllRecipes = async (req, res) => {
    const recipes = await dao.findAllRecipes();
    res.json(recipes);
  };

  const findRecipeById = async (req, res) => {
    const recipe = await dao.findRecipeById(req.params.recipeId);
    res.json(recipe);
  };

  const updateRecipe = async (req, res) => {
    const { recipeId } = req.params;
    const status = await dao.updateRecipe(recipeId, req.body);
    res.json(status);
  };

  const deleteRecipe = async (req, res) => {
    const status = await dao.deleteRecipe(req.params.recipeId);
    res.json(status);
  };

  const modifyLikes = async (req, res) => {
    const { recipeId } = req.params;
    const { newLikes } = req.body;
    const status = await dao.modifyLikes(recipeId, newLikes);
    res.json(status);
  };

  const addComment = async (req, res) => {
    const { recipeId } = req.params;
    const { comment } = req.body;
    const status = await dao.addComment(recipeId, comment);
    res.json(status);
  };

  const editComment = async (req, res) => {
    const { recipeId, commentIndex } = req.params;
    const { editedComment } = req.body;
    const status = await dao.editComment(recipeId, commentIndex, editedComment);
    res.json(status);
  };

  const deleteComment = async (req, res) => {
    const { recipeId, commentIndex } = req.params;
    const status = await dao.deleteComment(recipeId, commentIndex);
    res.json(status);
  };

  app.post("/api/recipes", createRecipe);
  app.get("/api/recipes", findAllRecipes);
  app.get("/api/recipes/:recipeId", findRecipeById);
  app.put("/api/recipes/:recipeId", updateRecipe);
  app.delete("/api/recipes/:recipeId", deleteRecipe);
  app.put("/api/recipes/:recipeId/likes", modifyLikes);
  app.post("/api/recipes/:recipeId/comments", addComment);
  app.put("/api/recipes/:recipeId/comments/:commentIndex", editComment);
  app.delete("/api/recipes/:recipeId/comments/:commentIndex", deleteComment);
}
