import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, TextField, Button, Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
export const BASE_API = process.env.REACT_APP_BASE_API_URL;

interface Recipe {
  _id: string;
  name: string;
  imageUrl: string;
  Likes: number;
  keyword: string;
}

const request = axios.create({
  withCredentials: true,
});

const RecipeSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch filters or initialize other data on mount
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await request.get(`${BASE_API}/api/recipes`);
      setRecipes(response.data.sort((a: Recipe, b: Recipe) => b.Likes - a.Likes));
    } catch (error: any) {
      setError('Failed to fetch recipes');
    }
  };

  const handleSearch = async () => {
    try {
      console.log(searchTerm)
      const response = await axios.get(`${BASE_API}/api/recipes/search?keyword=${searchTerm}`);
      setRecipes(response.data.sort((a: Recipe, b: Recipe) => b.Likes - a.Likes))
      console.log("After API")
      return response.data;
    } catch (error) {
      console.error('Error searching recipes:', error);
      return []; // Return an empty array on error
    }
  };
  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Typography variant="h4" gutterBottom component="div">
        Search Recipes
      </Typography>
      <TextField
        fullWidth
        label="Search for recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSearch}>Search</Button>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Card sx={{ maxWidth: 345, cursor: 'pointer' }} onClick={() => navigate(`/recipes/${recipe._id}`)}>
              <CardMedia
                component="img"
                height="140"
                image={'/images/deafult.jpg' || recipe.imageUrl }
                alt={recipe.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {recipe.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Likes: {recipe.Likes}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecipeSearch;