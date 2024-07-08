import React, { useState } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";

import Avatar from "../../components/Avatar/Avatar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import cakeIcon from "../../ass/cake-candles-solid.svg"
import pen from "../../ass/pen-solid.svg"
import EditProfileForm from "./EditProfileForm"
import ProfileBio from "./ProfileBio"
import "./UserProfile.css"

const UserProfile = () =>{

    const {id} = useParams()
    const users = useSelector((state) => state.userReducer)
    const currentProfile = (users.filter((user) => user._id === id))
    const currentUser = useSelector((state) => state.currentUser)
    console.log(currentUser);

const  [Switch, setSwitch] = useState(false)

const handleSwitch = () =>{

}

    return (
        <div className="home-container-1">
            <LeftSidebar />
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                           <div className="user-details">
                             <Avatar backgroundColor="purple" color="white" 
                             fontSize='50px ' px='40px' py='30px' >
                                   {currentProfile[0]?.name.charAt(0).toUpperCase()}
                             </Avatar>
                             <div className="user-name">
                                    <h1>{currentProfile.name}</h1>
                                    <p> <img src={cakeIcon} width={15 } ></img> Joined  {moment(currentProfile[0]?.joinedOn).fromNow()}</p>
                             </div>
                           </div>
                           {
                            currentUser?.result._id === id && (
                                <button type="button" onClick={()=>setSwitch(true)} className="edit-profile-btn">
                                    <img src={pen} width={12} style={{paddingTop:2+"px"}}></img> Edit profile
                                </button>
                                
                            )
                           }
                    </div>
                    <>
                    {Switch ?(
                            <EditProfileForm currentUser={currentUser} setSwitch={setSwitch}/>
                        ):( 
                            <ProfileBio currentProfile={currentProfile[0]} />
                        )}
                    </>
                </section>
            </div>
        </div>
    )
}

export default UserProfile