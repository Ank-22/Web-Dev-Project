import React, {useState} from 'react';
import './App.css';
import RecipeNavigation from "./components/Navigation";
import Home from "./components/Home";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import RecipeDetail from './components/Recipe';
import RecipeSearch from './components/Search';
import RecipeForm from './components/Recipe/create';
import GroupsPage from './components/Groups';
import HorizontalSideNav from "./components/Navigation/SideNav";
import Profile from "./components/Profile";
import ManageUsers from "./components/ManageUsers";



function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [role, setRole] = useState("");

    return (
    <div className="App container-fluid px-0" >
        <HashRouter>
        <HorizontalSideNav loggedIn={loggedIn} role={role}/>
        <div className="right-shift">
            <RecipeNavigation loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>

        </div>


        <div className="down-shift right-shift">
            <Routes>
                <Route path="/"         element={<Navigate to="/Home"/>}/>
                <Route path="/Home"   element={<Home/>}/>
                <Route path="/Search" element={<RecipeSearch/>}/>
                <Route path="/Recipes/Create" element={<RecipeForm/>}/>
                <Route path='/Recipes/:recipeId/*' element={<RecipeDetail/>}/>
                <Route path="/Groups" element={<GroupsPage/>}/>
                <Route path="/Profile" element={<Profile role={role} setRole={setRole} setLoggedIn={setLoggedIn}/>}/>
                <Route path="/ManageUsers"   element={<ManageUsers/>}/>
            </Routes>

        </div>
        </HashRouter>

    </div>
  );
}

export default App;
