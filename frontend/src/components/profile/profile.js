import React, { useState, useEffect } from "react";
import './profile.css'
import { useAuth0 } from "@auth0/auth0-react";
import EdiText from 'react-editext'
function Profile() {


    const { user, isAuthenticated, isLoading } = useAuth0();
    // Form states
    // Use defaults until user database is implemented
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState("Tell us a bit about yourself...");

    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated) {
                if (user) {
                    console.log(user)
                    setUserId(user.sub);
                    setUserName(user.nickname);
                    setProfilePic(user.picture)
                    setUserEmail(user.name);
                }
            }
        }
    }, [isAuthenticated])

    const handleSave = (value) => {
        console.log(value);
        setValue(value);
      };

    return (

        <div style={{ paddingTop: "60px" }} className="profile-wrapper">
            <div className="profile-container">
                {isAuthenticated ?
                    <div className="profile-core-container">
                        <div className="profile-card">
                            <div className="card-li">
                                <div className="profile-pic-border">
                                    <img src={profilePic} className="profile-pic" alt="profile picture" />
                                </div>
                            </div>
                            <div className="card-li">
                                <div className="profile-info-container">
                                    <div>
                                        <h1> {userName} </h1>
                                        <h2> {userEmail} </h2>
                                        <div className="prof-edit-text">
                                        <EdiText
                                            value={value}
                                            type="text"
                                            onSave={handleSave}
                                            editing={editing}
                                        />
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div> :
                    <>
                        <div className="profile-logout-container">
                            <div>
                                <h4>Oops looks like you are not signed in...</h4>
                                <h4>Please sing in to view your profile information</h4>
                            </div>
                        </div>
                    </>
                }

            </div>

        </div>
    );


}



export default Profile;
