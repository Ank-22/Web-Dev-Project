import React, {useState} from 'react';
import './App.css';
import RecipeNavigation from "./components/Navigation";
import Home from "./components/Home";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import RecipeDetail from './components/Recipe';
import HorizontalSideNav from "./components/Navigation/SideNav";
import Profile from "./components/Profile";


function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
    <div className="App color-sand container-fluid px-0">
        <HashRouter>
        <HorizontalSideNav loggedIn={loggedIn}/>
        <div className="right-shift">
            <RecipeNavigation loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>

        </div>


        <div className="down-shift right-shift">
            <Routes>
                <Route path="/"         element={<Navigate to="/Home"/>}/>
                <Route path="/Home"   element={<Home/>}/>
                <Route path="/Profile" element={<Profile/>}/>
            </Routes>

        </div>
        </HashRouter>
    </div>
  );
}

export default App;
