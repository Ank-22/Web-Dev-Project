import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
import GroupRoutes from './controller/Group/routes.js';
import GroupItemRoutes from './model/GroupItem/routes.js';
import RecipeRoutes from './model/Recipes/routes.js';
import UserRoutes from './model/Users/routes.js';
import Hello from "./Hello.js";
// corrected the import statements

mongoose.connect("mongodb://127.0.0.1:27017/recipe");
const app = express();
app.use(cors());
app.use(express.json());
Hello(app)
GroupItemRoutes(app)
GroupRoutes(app)
RecipeRoutes(app)
UserRoutes(app)
app.listen(process.env.PORT || 4000);

