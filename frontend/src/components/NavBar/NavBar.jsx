import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import useWindowSize from "../../hooks/useWindowSize";
import "./NavBar.css";
import Dropdown from 'react-bootstrap/Dropdown'

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const innerWidth = useWindowSize();

 

  return (
    <div className="navBar">
      <ul>
        <li>
          <a onClick={()=> navigate("/")}>Ecommerse</a>
        </li>
        
          {user ? (
            <div>
            <Dropdown>
              <Dropdown.Toggle>
                PROFILE
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item  onClick={() => navigate("/profile")}> ACCOUNT</Dropdown.Item>
                {user.is_employee == true &&
                <Dropdown.Item>ADMIN</Dropdown.Item>
                }
                <Dropdown.Item  onClick={logoutUser}> Logout</Dropdown.Item>
                
              </Dropdown.Menu>
            </Dropdown>
            

            </div>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        
        <li>
          
        </li>
      </ul>
      
    </div>
  );
}

export default Navbar;
