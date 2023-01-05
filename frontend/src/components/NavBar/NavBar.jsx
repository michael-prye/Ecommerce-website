import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useWindowSize from "../../hooks/useWindowSize";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const [menuBarOpen, setMenuBarOpen] = useState(false);
  const navigate = useNavigate();
  const innerWidth = useWindowSize();

  const handleToggle = () => {
    setMenuBarOpen(!menuBarOpen);
  }

  if (innerWidth < 500){
    return(
      <div className="navBar">
        <ul>
          <li>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}><b>Ec</b></Link>
          </li>
          <li>
          <button onClick={handleToggle}>{menuBarOpen ? "Close" : "Open"}</button>
          <ul className={`menuNav ${menuBarOpen ? "showMenu" : ""}`} ></ul>

          </li>
        </ul>
        
      </div>
    );
  } else{
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Ecommerece</b>
          </Link>
        </li>
        <li>
          {user ? (
            <div>
            <button onClick={logoutUser}>Logout</button>
            <button onClick={() => navigate("/profile")}>Profile</button>
            </div>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
        <li>
          
        </li>
      </ul>
    </div>
  );
          }
};

export default Navbar;
