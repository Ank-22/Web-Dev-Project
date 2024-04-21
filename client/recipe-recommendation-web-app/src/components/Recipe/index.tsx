import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './index.css'

interface Recipe {
  id: string;
  name: string;
  cuisines: string;
  ingredients: string[];
  cooking_time: string;
  type: string;
  meat_type: string;
  steps: string;
  imageUrl: string;  // Assuming this field is available and correct
  Likes: number;
  comments: string[];
}

const RecipeDetail: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/recipes/661fcb55fda3c080a4f5f0ae`);
        setRecipe(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch recipe');
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipe) return <div>No recipe found.</div>;

  return (
    <div className="recipe-detail">
      <h1>{recipe.name}</h1>
      <img src={recipe.imageUrl || 'default-placeholder.png'} alt={recipe.name} style={{ width: '100%' }}/>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Steps</h2>
      <p>{recipe.steps}</p>
      <h2>Comments</h2>
      {recipe.comments.length > 0 ? (
        <ul>
          {recipe.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default RecipeDetail;