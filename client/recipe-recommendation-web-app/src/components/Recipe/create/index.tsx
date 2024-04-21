import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

// Define the type for the form values
interface FormValues {
  name: string;
  cuisines: string;
  ingredients: string;
  cooking_time: string;
  type: string;
  meat_type: string;
  steps: string;
  GroupID: string;
  Likes: number;
  comments: string;
  owner: string;
}

const RecipeForm: React.FC = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      cuisines: '',
      ingredients: '',
      cooking_time: '',
      type: '',
      meat_type: '',
      steps: '',
      GroupID: 'NA.',
      Likes: 0,
      comments: '',
      owner: ''
    },
    onSubmit: (values) => {
      // Handle form submission, e.g., POST request to your API
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h4" align="center">
        Create New Recipe
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>

<TextField
margin="normal"
required
fullWidth
id="name"
label="Recipe Name"
name="name"
autoComplete="name"
autoFocus
value={formik.values.name}
onChange={formik.handleChange}
/>
<TextField
margin="normal"
required
fullWidth
id="cuisines"
label="Cuisines"
name="cuisines"
autoComplete="cuisines"
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
autoComplete="ingredients"
value={formik.values.ingredients}
onChange={formik.handleChange}
/>
<TextField
margin="normal"
required
fullWidth
id="cooking_time"
label="Cooking Time"
name="cooking_time"
autoComplete="cooking_time"
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
autoComplete="type"
value={formik.values.type}
onChange={formik.handleChange}
/>
<TextField
margin="normal"
fullWidth
id="meat_type"
label="Meat Type"
name="meat_type"
autoComplete="meat_type"
value={formik.values.meat_type}
onChange={formik.handleChange}
/>
<TextField
margin="normal"
required
fullWidth
id="steps"
label="Preparation Steps"
name="steps"
multiline
rows={4}
autoComplete="steps"
value={formik.values.steps}
onChange={formik.handleChange}
/>

<TextField
margin="normal"
required
fullWidth
id="owner"
label="Recipe Owner"
name="owner"
autoComplete="owner"
value={formik.values.owner}
onChange={formik.handleChange}
/>
<TextField
margin="normal"
fullWidth
id="comments"
label="Comments"
name="comments"
multiline
rows={2}
autoComplete="comments"
value={formik.values.comments}
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

export default RecipeForm;