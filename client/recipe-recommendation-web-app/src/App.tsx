import React from 'react';
import './App.css';
import RecipeNavigation from "./components/Navigation";
import Home from "./components/Home";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import RecipeDetail from './components/Recipe';
import RecipeSearch from './components/Search';
import RecipeForm from './components/Recipe/create';
import GroupsPage from './components/Groups';


function App() {
  return (
    <div className="App color-sand container-fluid px-0">
        <div>
            <RecipeNavigation />
        </div>

        <HashRouter>
        <div className="downshift">
            <Routes>
                <Route path="/"         element={<Navigate to="/Home"/>}/>
                <Route path="/Home"   element={<Home/>}/>
                <Route path="/Search" element={<RecipeSearch/>}/>
                <Route path="/Recipes/Create" element={<RecipeForm/>}/>
                <Route path='/Recipes/:recipeId/*' element={<RecipeDetail/>}/>
                <Route path="/Groups" element={<GroupsPage/>}/>
            </Routes>

        </div>
        </HashRouter>

        <hr/>
    </div>
  );
}

export default App;
