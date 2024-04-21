import {SlArrowDown} from "react-icons/sl";
import React from "react";
import LandingPage from "../LandingPage/header";
import AboutUs from "../LandingPage/AboutUs";

function Home () {
    return (
    <div>
        <LandingPage/>
        <AboutUs/>
        <div className="flex-fill">
            <h4>Scroll Down to Learn More</h4>
            <span style={{fontSize: "3rem"}} className="animate__animated
                    animate__shakeY animate__slow infinite"><SlArrowDown /></span>
        </div>
    </div>
    );
}

export default Home;