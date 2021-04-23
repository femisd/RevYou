import React, { useState, useEffect } from "react";
import './profile.css'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
function Profile() {

    // Form states
    // Use defaults until user database is implemented
    const [userId, setUserId] = useState("123123123123123");
    const [userName, setUserName] = useState("Guest");
    const [profilePic, setProfilePic] = useState("https://180dc.org/wp-content/uploads/2017/11/profile-placeholder.png");

    return (
        <div style={{paddingTop: "60px" }}>

                <div className="profile-container">
                    <h1> {userName} </h1>
                    <h2> {userId} </h2>
                    <img src={profilePic}  alt="profilePic"/>

                </div>

        </div>
    );


}



export default Profile;
