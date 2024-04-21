import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {AiOutlineMenuFold} from "react-icons/ai";
import {useState} from "react";
import SignUpModal from "./forms/SignUpModal";
import LoginModal from "./forms/LoginModal";

function RecipeNavigation() {
    const [showSignUp, setShowSignUp] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);


    const handleSignUp = () => {
        setShowSignUp(true);
    }
    const handleLogin = () => {
        setShowLogin(true);
    }
    return (
        <div className="header_block">
            <button className="float-start btn"
                    style={{marginTop: "0px", marginLeft: "10px", fontSize: "1.75rem",
                        background: "transparent", color: "#FFC95F", outline:"none", border:"none"}}><AiOutlineMenuFold /></button>

            <span className="align-content-center fw-bold" style={{marginTop:"10px"}}>RECIPES AND RECOMMENDATIONS</span>
            {!loggedIn &&
                <button className="btn float-end " style={{
                    marginTop: "10px", marginRight: "10px",
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