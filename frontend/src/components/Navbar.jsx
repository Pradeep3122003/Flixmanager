import React from 'react'
import "./Navbar.css"
import logo from '../assets/logo.png'
import add from "../assets/add.svg"
import search from "../assets/search.svg"
import bright from "../assets/bright.svg"
import dark from "../assets/dark.svg"
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Navbar = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  document.body.style.backgroundColor = isDark ? "rgb(236, 236, 236)" : "rgb(20, 20, 30)";
  return (
    <div id='nav'>
      <div className="navleft">
        <img src={logo} alt="FLIXMANAGER" />
       <Link to="/"><p>Home</p></Link> 
       <Link to="/Create"><p>Create</p></Link> 
      
      </div>
      <div className="navright">
        <img src={search} alt="se" />
        <img src={add}
         alt="ad" 
         onClick={() => {
         navigate("/Create")
        }}
         />
        <img
          id="dark1"
          src={isDark ? dark : bright}
          alt="Theme Toggle"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsDark(!isDark);
            console.log("isDark:", !isDark); // Debugging
          }}
        />
      </div>
    </div>
  )
}

export default Navbar

