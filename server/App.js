import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
import GroupRoutes from './Group/routes';
import GroupItemRoutes from './GroupItem/routes';
import RecipeRoutes from './Recipes/routes';
import UserRoutes from './Users/routes';


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

