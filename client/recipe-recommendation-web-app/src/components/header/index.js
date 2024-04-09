import React from 'react';
import { Parallax } from 'react-parallax';
import RecipeBook from '../../img/recipe-book-unsplash.jpg'

const LandingPage = () => {
    return(
        <Parallax className="image" bgImage={RecipeBook} strength={425}>
            <div className="content">

                        <div className="img-text animate__animated animate__rotateIn">
                            <div>Welcome to</div>
                            <div>Recipe and Recommendations</div>

                </div>
            </div>
        </Parallax>
    );
}

export default LandingPage;