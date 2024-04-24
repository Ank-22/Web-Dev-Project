import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import { MongoClient } from 'mongodb';


// MongoDB URI and database name
const uri = "mongodb://localhost:27017/";
const dbName = "recipe";
const client = new MongoClient(uri);

// Edamam Recipe Search API endpoint
const baseUrl = "https://api.edamam.com/api/recipes/v2";
const appId = process.env.APP_ID; // Ensure these are set in your .env file
const appKey = process.env.APP_KEY;
const query = "chicken"; // Example query

// Function to search for recipes
async function searchRecipes(query) {
  const url = `${baseUrl}?type=public&q=${encodeURIComponent(query)}&app_id=${encodeURIComponent(appId)}&app_key=${encodeURIComponent(appKey)}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error searching for recipes:", error.response ? error.response.data : error.message);
    return null;
  }
}

// Function to store data in MongoDB
async function storeData(data) {
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection("recipemodels");

    // Check if the collection already has documents
    const existingCount = await collection.countDocuments();
    if (existingCount > 0) {
      console.log("Collection already contains data. Skipping data storage.");
      return;
    }

    // Transform and store each recipe
    for (const hit of data.hits) {
      const recipe = hit.recipe;

      // Map the fields from the API response to your schema
      const recipeToStore = {
        name: recipe.label,
        imageUrl: recipe.image,
        steps: recipe.ingredientLines,
        cuisines: recipe.cuisineType,
        author: "Edamam API",
        Likes: 0 // Storing the API's 'source' as the 'author'
        // ... add any other fields you need to map
      };

      // Store the transformed recipe
      const result = await collection.insertOne(recipeToStore);
      console.log(`New recipe inserted with the _id: ${result.insertedId}`);
    }
  } catch (error) {
    console.error("Error storing data in MongoDB:", error.message);
  } finally {
    await client.close();
  }
}

// Main function to execute the search and handle the response
async function main() {
  const recipesData = await searchRecipes(query);
  if (recipesData) {
    console.log('Recipes fetched successfully!');
    // Store the fetched data in the database
    await storeData(recipesData);
  }
}

main();
