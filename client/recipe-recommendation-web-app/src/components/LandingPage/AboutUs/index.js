import React, { useState, useEffect } from 'react';
import Food from '../../../img/food.png';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Grid
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_API } from '../../Recipe';



const Trending = () => {
  const [mostLikedRecipe, setMostLikedRecipe] = useState({});
  const [randomRecipe, setRandomRecipe] = useState({});
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Fetch all recipes
        const response = await axios.get(`${BASE_API}/api/recipes`);
        const recipes = response.data;

        // Find the most liked recipe
        const mostLiked = recipes.reduce((prev, current) => (prev.Likes > current.Likes ? prev : current));
        setMostLikedRecipe(mostLiked);

        // Find a random recipe
        const randomIndex = Math.floor(Math.random() * recipes.length);
        setRandomRecipe(recipes[randomIndex]);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleUser = async () => {
    await axios.get(`${BASE_API}/api/users`);
  };

  return (
    <Container style={{ display: 'flex' }}>

      <div className="col-md-6">
        <Typography variant="h5" className="fw-bold">Trending</Typography>
        <div>
          <Typography variant="body1">We are an open source community, where we share the wonderful joys of the world.</Typography>
        </div>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Card variant="outlined" style={{ backgroundColor: '#F7F7F7' }} onClick={() => navigate(`/recipes/${mostLikedRecipe._id}`)}>
              <CardContent>
              <CardMedia
          component="img"
          height="300"
          image={mostLikedRecipe.imageUrl || '/images/default.jpg' }
          alt={mostLikedRecipe.name}
        />
                <Typography variant="h6" component="div">Name: {mostLikedRecipe.name}</Typography>
                <Typography variant="body2">Author: {mostLikedRecipe.author}</Typography>
                <Typography variant="body2">Likes: {mostLikedRecipe.Likes}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card variant="outlined" style={{ backgroundColor: '#F7F7F7' }}onClick={() => navigate(`/recipes/${randomRecipe._id}`)}>
            <CardMedia
          component="img"
          height="300"
          image={randomRecipe.imageUrl || '/images/default.jpg' }
          alt={randomRecipe.name}
        />
              <CardContent>
                <Typography variant="h6" component="div">Name: {randomRecipe.name}</Typography>
                <Typography variant="body2">Author: {randomRecipe.author}</Typography>
                <Typography variant="body2">Likes: {randomRecipe.Likes}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div className="col-md-6">
        <img src={Food} alt="Food" style={{ width: '500px', height: '500px' }} />
      </div>
    </Container>
  );
}

export default Trending;