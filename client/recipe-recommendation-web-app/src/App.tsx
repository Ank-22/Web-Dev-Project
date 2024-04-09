import React from 'react';
import './App.css';
import LandingPage from "./components/header";
import RecipeNavigation from "./components/Navigation";

function App() {
  return (
    <div className="App color-sand container-fluid px-0">
        <div>
            <RecipeNavigation />
        </div>

        <div className="downshift">
            <LandingPage/>
        </div>

    </div>
  );
}

export default App;
