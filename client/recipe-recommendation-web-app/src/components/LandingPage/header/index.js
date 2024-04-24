import React, { useState, useEffect } from 'react';
import { Parallax } from 'react-parallax';
import RecipeBook from '../../../img/recipe-book-unsplash.jpg'
import * as client from "../../UserServices/client"




const LandingPage = () => {
    const [profile, setProfile] = useState({ _id: "", username: "", password: "",
    first_name: "", last_name: "", email: "", country: "", age: ""});
   
   const fetchProfile = async () => {
   
           const account = await client.profile();
           if (account) {
               setProfile(account);
           }
   
     };
     useEffect(() => {
       fetchProfile();
     }, []); 
     

    return(
        <Parallax className="image" bgImage={RecipeBook} strength={425}>
            <div className="content">
                 {profile.username === "" && 
                 <div className="img-text animate__animated animate__rotateIn">
                      <div>Welcome to</div>
                      <div>Recipe and Recommendations</div>
                </div>

                 }
                   {!profile.username === "" && 
                 <div className="img-text animate__animated animate__rotateIn">
                      <div>Welcome Back!</div>
                      <div>{profile.username}</div>
                </div>

                 }
            </div>
        </Parallax>
    );
}

export default LandingPage;