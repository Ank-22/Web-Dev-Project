import "dotenv/config";
import express from 'express';
import cors from "cors";
import mongoose from "mongoose";
import GroupRoutes from './controller/Group/routes.js';
import GroupItemRoutes from './model/GroupItem/routes.js';
import RecipeRoutes from './model/Recipes/routes.js';
import UserRoutes from './model/Users/routes.js';
import Hello from "./Hello.js";
import session from "express-session";
// corrected the import statements

mongoose.connect("mongodb://127.0.0.1:27017/recipe");
const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));
app.use(express.json());
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN,
    };
}
app.use(
    session(sessionOptions)
);

Hello(app)
GroupItemRoutes(app)
GroupRoutes(app)
GroupItemRoutes(app)
RecipeRoutes(app)
UserRoutes(app)
app.listen(process.env.PORT || 4000);

