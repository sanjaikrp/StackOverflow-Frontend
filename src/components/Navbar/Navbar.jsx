import React, { useEffect } from "react";

import { Link, useNavigate  } from "react-router-dom";

import logo from "../../ass/logo2.png";

import searchIcon from "../../ass/searchicon.svg";

import Avatar from "../Avatar/Avatar";

import "./Navbar.css";
import decode from 'jwt-decode'
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../actions/currentUser";

const Navbar = () => {


  var User = useSelector((state)=> state.currentUser);
  const dispatch= useDispatch();
  const navigate = useNavigate();

  

  useEffect(()=>{
    const token= User?.token
    if(token){
      const decodeToken= decode(token)
      if(decodeToken.exp * 1000 < new Date().getTime()){
        handleLogOut();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile'))));
  },[dispatch])

  const handleLogOut =()=>{
    dispatch({type:"LOGOUT"});
    navigate('/')
    dispatch(setCurrentUser(null))
  }

  return (
    <nav className="main-nav">
      <div className="navbar">
        <Link to='/' className="nav-item nav-logo">
          <img src={logo} alt="logo" />
        </Link>
        <Link to="/" className="nav-item nav-btn">About</Link>
        <Link to="/" className="nav-item nav-btn">Products</Link>
        <Link to="/" className="nav-item nav-btn">For Teams</Link>
        <form>
          <input type="text" placeholder="Search.." />
          <img src={searchIcon} alt="searchLens" width={18} className="search-icon" />
        </form>
        
        {User === null ? <Link to="/Auth" className="nav-item nav-links">Log In</Link> :
          <>
            <Avatar
              backgroundColor={"#009dff"}
              px={"10px"} py={"7px"}
              borderRadius={"50%"}
              color={"white"}>
              <Link to={`/Users/${User?.result._id}`} style={{ color: "white", textDecoration: "none" }}>{User.result.name.charAt(0).toUpperCase()}</Link>
            </Avatar>
            <button className='nav-item nav-links' onClick={handleLogOut}>LogOut</button>
          </>
        }

      </div>
    </nav>);

}

export default Navbar;