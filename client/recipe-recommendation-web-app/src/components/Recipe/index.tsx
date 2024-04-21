import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Card, CardContent, CardMedia, Typography, TextField, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

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
}

interface Comment{
  author: string;
  text: string;
}

const handleUser = async () => {
  await axios.get("http://localhost:4000/api/users");
}

const RecipeDetail: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [liked, setLiked] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get<Recipe>(`http://localhost:4000/api/Recipes/${recipeId}`);
      setRecipe(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch recipe');
      setLoading(false);
    }
  };

  const toggleLike = async () => {
    try {
      const newLikes = liked ? recipe!.Likes - 1 : recipe!.Likes + 1;
      await axios.put(`http://localhost:4000/api/Recipes/like/${recipeId}`, { Likes: newLikes });
      console.log(newLikes)
      setRecipe({ ...recipe!, Likes: newLikes });
      setLiked(!liked);
    } catch (err) {
      setError('Failed to update likes');
    }
  };

  const addComment = async () => {
    // if (comment.trim()) {
    //   try {
    //     const updatedComments = [...recipe!.comments, comment];
    //     await axios.post(`http://localhost:4000/api/Recipes/comment/${recipeId}`, { comments: updatedComments });
    //     setRecipe({ ...recipe!, comments: updatedComments });
    //     setComment('');
    //   } catch (err) {
    //     setError('Failed to add comment');
    //   }
    // }
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
          image={'/images/deafult.jpg'}
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
            {recipe.comments.map((comment, index) => (
              <Typography key={index} sx={{ mt: 1 }}>
                <strong>{comment.author}</strong>: {comment.text}
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
