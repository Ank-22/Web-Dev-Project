import React from 'react';
import './App.css';
import RecipeNavigation from "./components/Navigation";
import Home from "./components/Home";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import RecipeDetail from './components/Recipe';


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
            </Routes>

        </div>
        </HashRouter>

        <hr/>
        <div>
          <RecipeDetail/>
        </div>
    </div>
  );
}

export default App;
