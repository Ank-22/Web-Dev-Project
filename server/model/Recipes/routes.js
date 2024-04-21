import * as dao from "./dao.js";

export default function RecipeRoutes(app) {
  app.post("/api/recipes", async (req, res) => {
    try {
      const recipe = await dao.createRecipe(req.body);
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ message: "Failed to create recipe", error });
    }
  });

  app.get("/api/recipes", async (req, res) => {
    try {
      const recipes = await dao.findAllRecipes();
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve recipes", error });
    }
  });

  
  app.get("/api/recipes/search", async (req, res) => {
    try {
      const recipes = await dao.searchRecipesByKeyword(req.query.keyword);
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ message: "Failed to search recipes", error });
    }
  });

  app.get("/api/recipes/:recipeId", async (req, res) => {
    try {
      const recipe = await dao.findRecipeById(req.params.recipeId);
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ message: "Failed to find recipe", error });
    }
  });

  app.put("/api/recipes/:recipeId", async (req, res) => {
    try {
      const status = await dao.updateRecipe(req.params.recipeId, req.body);
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: "Failed to update recipe", error });
    }
  });

  app.delete("/api/recipes/:recipeId", async (req, res) => {
    try {
      const status = await dao.deleteRecipe(req.params.recipeId);
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete recipe", error });
    }
  });

  app.put("/api/recipes/:recipeId/likes", async (req, res) => {
    try {
      const result = await dao.modifyLikes(req.params.recipeId, req.body.userId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to modify likes", error });
    }
  });

  app.post("/api/recipes/:recipeId/comments", async (req, res) => {
    try {
      const status = await dao.addComment(req.params.recipeId, req.body.comment);
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: "Failed to add comment", error });
    }
  });

  app.put("/api/recipes/:recipeId/comments/:commentId", async (req, res) => {
    try {
      const status = await dao.editComment(req.params.recipeId, req.params.commentId, req.body.editedComment);
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: "Failed to edit comment", error });
    }
  });

  app.delete("/api/recipes/:recipeId/comments/:commentId", async (req, res) => {
    try {
      const status = await dao.deleteComment(req.params.recipeId, req.params.commentId);
      res.json(status);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete comment", error });
    }
  });

}