import React from 'react';
import './App.css';
import LandingPage from "./components/LandingPage/header";
import RecipeNavigation from "./components/Navigation";
import AboutUs from "./components/LandingPage/AboutUs";
import {SlArrowDown} from "react-icons/sl";
import RecipeSearch from './components/Search';
import RecipeDetail from './components/Recipe';

function App() {
  return (
    <div className="App color-sand container-fluid px-0">
        <div>
            <RecipeNavigation />
        </div>

        <div className="downshift">
            <LandingPage/>
            <AboutUs/>
            <div className="flex-fill">
                <h4>Scroll Down to Learn More</h4>
                <span style={{fontSize: "3rem"}} className="animate__animated
                animate__shakeY animate__slow infinite"><SlArrowDown /></span>
            </div>
        </div>

        <hr/>
        <div>
          <RecipeDetail/>
        </div>
    </div>
  );
}

export default App;
