// client.tsx
import axios from 'axios';

const baseURL = "http://localhost:4000/api";

export const fetchRecipes = async () => {
  try {
    const response = await axios.get(`${baseURL}/recipes`);
    return response.data; // Assuming the server sends back an array of recipes
  } catch (error) {
    console.error("Failed to fetch recipes:", error);
    return [];
  }
};

export const searchRecipesByName = async (name: string) => {
  try {
    const response = await axios.get(`${baseURL}/getRecipesByName/${name}`);
    return response.data; // Assuming the server sends back an array of recipes
  } catch (error) {
    console.error(`Failed to search recipes by name ${name}:, error`);
    return [];
  }
};