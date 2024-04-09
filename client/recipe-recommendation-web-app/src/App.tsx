import React from 'react';
import './App.css';
import RecipeNavigation from "./components/header";

function App() {
    return (
        <div className="container-fluid">
            <div>
                <RecipeNavigation />
            </div>
            <div className="downshift">
                Hello World
            </div>
        </div>
    );
}

export default App;
