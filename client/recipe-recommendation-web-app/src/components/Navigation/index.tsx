import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";
import SignUpModal from "./forms/SignUpModal";
import LoginModal from "./forms/LoginModal";
interface RecipeNavigationProps {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function RecipeNavigation({loggedIn, setLoggedIn}: RecipeNavigationProps) {
    const [showSignUp, setShowSignUp] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    //const [loggedIn, setLoggedIn] = useState(false);


    const handleSignUp = () => {
        setShowSignUp(true);
    }
    const handleLogin = () => {
        setShowLogin(true);
    }
    return (
        <div className="header_block">

            <span className="align-content-center fw-bold" style={{marginTop:"10px"}}>RECIPES AND RECOMMENDATIONS</span>
            {!loggedIn &&
                <button className="btn float-end " style={{
                    marginTop: "10px", marginRight: "80px",
                    background: "#FFC95F", color: "black"
                }} onClick={() => handleLogin()}>
                    Login
                </button>
            }
            {!loggedIn &&
                <button className="btn float-end " style={{
                    marginTop: "10px", marginRight: "10px",
                    background: "#FFC95F", color: "black"
                }} onClick={() => handleSignUp()}>
                    Join Us
                </button>
            }
            <SignUpModal show={showSignUp} onHide={() => setShowSignUp(false)}/>
            <LoginModal setLoggedIn={setLoggedIn}  show={showLogin} onHide={() => setShowLogin(false)}/>

        </div>
    );
}
export default RecipeNavigation