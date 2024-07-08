import React, { useState } from "react";
import {useDispatch} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import "./Auth.css"


import logo from "../../ass/stack-overflow.png"

import AboutAuth from "./AboutAuth";

import { signup, login } from "../../actions/auth.js";


const Auth= ()=>{

    const [isSignUp, setIsSignUp]=useState(false)
    const [name, setName]= useState('')
    const [email, setEmail] =useState('')
    const [password, setPassword]=useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSwitch=()=>{
      setIsSignUp(!isSignUp);
      
    }

    const handleSubmit= (e)=>{
      e.preventDefault();
      if(!email && !password){
        alert("Enter email and password")
      }
      if(isSignUp){
        if(!name){
          alert("Enter a name to continue")
        }
       
        dispatch(signup({name,email,password}, navigate))
        
      }else{
        dispatch(login({email,password},navigate))  
      }
      
    }
    
    return (
        <section className="Auth-section">

       {/* Container no -1 */}

        { isSignUp &&  <AboutAuth  />}

       {/* Container no -2 */}

           <div className="auth-container-2">
              { !isSignUp &&  <Link to="/"><img src={logo} alt="StackOverflow" className="login-logo" width="65px" /></Link>} 
              <form onSubmit={handleSubmit}>

                {/* Display Name */}

                 { isSignUp &&
                  <label htmlFor="name">
                    <h4>Display Name</h4>
                    <input type="text" id="name" name="name" onChange={(e)=> {setName(e.target.value)}}></input>
                 </label> 
                 }
                 
                {/* Email */}

                 <label htmlFor="email">
                    <h4>Email</h4>
                    <input type="email" id="email" name="email" onChange={(e)=> {setEmail(e.target.value)}}></input>
                 </label>

                 {/* Password */}

                 <label htmlFor="password">
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                      <h4>Password</h4>
                      { !isSignUp && <p style={{color:"#007ac6" , fontSize:"13px"}}>forgot password</p>}
                    </div>
                     <input type="password" name="password" id="password" onChange={(e)=> {setPassword(e.target.value)}}></input>
                 </label>

                 {isSignUp && <p style={{color:"#666767", fontSize:"13px"}}>Passwords must contain at least eight characters,<br /> 
                 including at least 1 letter and 1 number.</p>}

                 {/* Checkbox inp */}

                 {isSignUp && 
                  (<label htmlFor="check">                   
                    <input type="checkbox" id="check"></input>
                    <p style={{ fontSize:"13px" }}>Opt-in to receive occasional product<br/> 
                    updates, user research invitations, company<br/>
                    announcements,and digests.</p>
                 </label>)
                 }

                 {/* Login Button */}

                 <button type="submit" className="auth-btn" >{ isSignUp ? "SignUp" : "login"}</button>
                

                 {isSignUp &&
                 <p style={{color:"#666767", fontSize:"13px"}}>
                  By clicking “Sign up”, you agree to our terms of <br />
                  service, privacy policy and cookie policy
                 
                 </p>
                 }
                 
              </form>

              {/* Switch b/w login Signup */}

              <p>
                  { isSignUp ? "Already have an account " : "Don't have an account "}
                  <button type="button" className="handle-switch-btn" onClick={handleSwitch}>{ isSignUp ? "Log In" : "Sign Up"}</button>
                 </p>
           </div>
        </section>
       
        
    )

}

export default Auth;