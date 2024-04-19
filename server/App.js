import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
import GroupRoutes from './Group/routes.js';
import GroupItemRoutes from './GroupItem/routes.js';
import RecipeRoutes from './Recipes/routes.js';
import UserRoutes from './Users/routes.js';
import Hello from "./Hello.js";
// corrected the import statements

mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const app = express();
app.use(cors());
app.use(express.json());
Hello(app)
GroupItemRoutes(app)
GroupRoutes(app)
RecipeRoutes(app)
UserRoutes(app)
app.listen(process.env.PORT || 4000);

