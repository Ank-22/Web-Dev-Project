import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {AiOutlineMenuFold} from "react-icons/ai";

function RecipeNavigation() {
    return (
        <div className="header_block">
            <button className="float-start btn"
                    style={{marginTop: "0px", marginLeft: "10px", fontSize: "1.75rem",
                        background: "transparent", color: "#FFC95F", outline:"none", border:"none"}}><AiOutlineMenuFold /></button>

            <span className="align-content-center fw-bold" style={{marginTop:"10px"}}>RECIPES AND RECOMMENDATIONS</span>
            <button className="btn float-end " style={{marginTop: "10px", marginRight: "10px",
                background: "#FFC95F", color: "black"}}>
                Login
            </button>
            <button className="btn float-end " style={{marginTop: "10px", marginRight: "10px",
                background: "#FFC95F", color: "black"}}>
                Join Us
            </button>
        </div>
    );
}
export default RecipeNavigation