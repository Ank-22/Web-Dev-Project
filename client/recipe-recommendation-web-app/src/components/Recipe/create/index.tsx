import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

interface FormValues {
  name: string;
  author: string;
  cuisines: string;
  ingredients: string[];
  cooking_time: string;
  type: 'veg' | 'non-veg' | 'vegan';
  meat_type: string;
  steps: string[];
  imageUrl: string;
}

const RecipeForm: React.FC = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      author: '',
      cuisines: '',
      ingredients: [],
      cooking_time: '',
      type: 'veg',
      meat_type: '',
      steps: [],
      imageUrl: ''
    },
    onSubmit: async (values) => {
      console.log(JSON.stringify(values, null, 2)); // Log the values to check
      const response = await fetch('http://localhost:4000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      if (response.ok) {
        alert('Recipe created successfully!');
      } else {
        alert('Failed to create recipe');
      }
    },
  });

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5" align="center">
        Add New Recipe
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 3 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Recipe Name"
          name="name"
          autoFocus
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="author"
          label="Author"
          name="author"
          value={formik.values.author}
          onChange={formik.handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="cuisines"
          label="Cuisines"
          name="cuisines"
          value={formik.values.cuisines}
          onChange={formik.handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="ingredients"
          label="Ingredients (comma separated)"
          name="ingredients"
          helperText="Separate each ingredient with a comma"
          value={formik.values.ingredients.join(', ')}
          onChange={(e) => formik.setFieldValue('ingredients', e.target.value.split(','))}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="cooking_time"
          label="Cooking Time"
          name="cooking_time"
          value={formik.values.cooking_time}
          onChange={formik.handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="type"
          label="Type (Veg/Non-Veg/Vegan)"
          name="type"
          select
          SelectProps={{ native: true }}
          value={formik.values.type}
          onChange={formik.handleChange}
        >
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
          <option value="vegan">Vegan</option>
        </TextField>
        <TextField
          margin="normal"
          fullWidth
          id="meat_type"
          label="Meat Type (if applicable)"
          name="meat_type"
          value={formik.values.meat_type}
          onChange={formik.handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="steps"
          label="Preparation Steps (comma separated)"
          name="steps"
          helperText="Separate each step with a comma"
          multiline
          rows={4}
          value={formik.values.steps.join(',')}
          onChange={(e) => formik.setFieldValue('steps', e.target.value.split(','))}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="imageUrl"
          label="Image URL"
          name="imageUrl"
          value={formik.values.imageUrl}
          onChange={formik.handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit Recipe
        </Button>
      </Box>
    </Container>
  );
};

export default RecipeForm;