import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, TextField, Button, Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

const BASE_API = process.env.REACT_APP_API_BASE;

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
// Helper function to parse query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const RecipeSearch = () => {
  const [recipes, setRecipes] =  useState<Recipe[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const query = useQuery();
  const searchTerm = query.get('query') || '';

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    } else {
      fetchRecipes();
    }
  }, [searchTerm]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${BASE_API}/api/recipes`);
      setRecipes(response.data.sort((a:any, b:any) => b.Likes - a.Likes));
    } catch (error) {
      setError('Failed to fetch recipes');
    }
  };

  const handleSearch = async (term:any) => {
    try {
      const response = await axios.get(`${BASE_API}/api/recipes/search?keyword=${term}`);
      setRecipes(response.data.sort((a:any, b:any) => b.Likes - a.Likes));
    } catch (error) {
      setError('Error searching recipes');
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
        onChange={(e) => navigate(`/search?query=${e.target.value}`)}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={() => handleSearch(searchTerm)}>Search</Button>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Card sx={{ maxWidth: 345, cursor: 'pointer' }} onClick={() => navigate(`/recipes/${recipe._id}`)}>
              <CardMedia
                component="img"
                height="140"
                image={recipe.imageUrl || '/images/default.jpg'}
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