// RecipeSearch.tsx
import React, { useState, useEffect } from 'react';
import { fetchRecipes, searchRecipesByName } from './client';

const RecipeSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recipes, setRecipes] = useState<any[]>([]); // Define a better type instead of any if possible

  useEffect(() => {
    const loadRecipes = async () => {
      const allRecipes = await fetchRecipes();
      setRecipes(allRecipes);
    };
    loadRecipes();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return; // Avoid empty query search
    const foundRecipes = await searchRecipesByName(searchTerm);
    setRecipes(foundRecipes);
    console.log(`Searching for recipes related to: ${searchTerm}`);
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="categories">
        {/* Categories here */}
      </div>
      <div>
        <h1>Search Results</h1>
        <div className="recipes-list">
  {recipes.map((recipe, index) => (
    <div key={index} className="recipe-card">
      {/* Assuming imageUrl is part of the data model */}
      <img src={recipe.imageUrl || "placeholder-image-url.jpg"} alt={recipe.name} className="recipe-image"/>
      <div className="card-content">
        <h3>{recipe.name}</h3>
        <p><strong>Cuisine:</strong> {recipe.cuisines}</p>
        <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
        <p><strong>Cooking Time:</strong> {recipe.cooking_time}</p>
        <p><strong>Type:</strong> {recipe.type} {recipe.meat_type !== 'NA' && (`${recipe.meat_type}`)}</p>
        <p><strong>Steps:</strong> {recipe.steps}</p>
        <p><strong>Likes:</strong> {recipe.Likes}</p>
        <div>
          <strong>Comments:</strong>
          {recipe.comments.length > 0 ? (
            <ul>
              {recipe.comments.map((comment:any, commentIndex:any) => (
                <li key={commentIndex}>{comment}</li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default RecipeSearch;