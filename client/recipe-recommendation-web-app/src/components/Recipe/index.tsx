import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Card, CardContent, CardMedia, Typography, TextField, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
export const BASE_API = process.env.REACT_APP_BASE_API_URL;

interface Comment {
  author: string;
  text: string;
}

interface Recipe {
  id: string;
  name: string;
  author: string;
  cuisines: string;
  ingredients: string[];
  cooking_time: string;
  type: 'veg' | 'non-veg' | 'vegan';
  meat_type: string;
  steps: string[];
  GroupID: string;
  Likes: number;
  comments: Comment[];
  owner: string;
  imageUrl: string;
}

interface User {
  username: string;
}

const RecipeDetail: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [liked, setLiked] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchRecipe();
    fetchUser();
  }, []);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get<Recipe>(`${BASE_API}/api/recipes/${recipeId}`);
      setRecipe(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch recipe');
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get<User>(`${BASE_API}/api/users`);
      setUser(response.data);
    } catch (err) {
      console.error('Failed to fetch user data');
    }
  };

  const toggleLike = async () => {
    try {
      const newLikes = liked ? recipe!.Likes - 1 : recipe!.Likes + 1;
      await axios.put(`${BASE_API}/api/recipes/like/${recipeId}`, { Likes: newLikes });
      setRecipe({ ...recipe!, Likes: newLikes });
      setLiked(!liked);
    } catch (err) {
      setError('Failed to update likes');
    }
  };

  const addComment = async () => {
    if (comment.trim()) {
      try {
        const newComment = { author: user?.username || "Anonymous", text: comment };
        const updatedRecipe = await axios.post(`${BASE_API}/api/recipes/${recipeId}/comments`, { comment: newComment });
        setRecipe(updatedRecipe.data);
        setComment('');
      } catch (err) {
        setError('Failed to add comment');
      }
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!recipe) return <Typography>No recipe found.</Typography>;

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={'/images/default.jpg' || recipe.imageUrl}
          alt={recipe.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {recipe.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author: {recipe.author}<br />
            Cuisine: {recipe.cuisines}<br />
            Cooking Time: {recipe.cooking_time}<br />
            Type: {recipe.type}<br />
            Meat Type: {recipe.meat_type}<br />
            Ingredients: {recipe.ingredients.join(', ')}<br />
            Steps:
            <ul>
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
            <IconButton onClick={toggleLike} color={liked ? 'primary' : 'default'}>
              <FavoriteIcon /> {recipe.Likes}
            </IconButton>
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <strong>Comments:</strong>
            {recipe.comments.map((c, index) => (
              <Typography key={index} sx={{ mt: 1 }}>
                <strong>{c.author}</strong>: {c.text}
              </Typography>
            ))}
            <Box component="form" sx={{ mt: 2 }} onSubmit={(e) => { e.preventDefault(); addComment(); }}>
              <TextField
                fullWidth
                variant="outlined"
                label="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button type="submit" variant="contained" sx={{ mt: 1 }}>Submit</Button>
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RecipeDetail;