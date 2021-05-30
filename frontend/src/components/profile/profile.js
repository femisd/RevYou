import React, { useState, useEffect } from "react";
import './profile.css'
import { useAuth0 } from "@auth0/auth0-react";
import EdiText from 'react-editext'
import Axios from "axios";

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
    const SERVER_URL = "https://g9-profile-service.herokuapp.com"

    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated) {
                if (user) {
                    console.log(user)
                    setUserId(user.sub);
                    setUserName(user.nickname);
                    setProfilePic(user.picture)
                    setUserEmail(user.name);
                    fetchBio();
                }
            }
        }
    }, [isAuthenticated])

    const handleSave = (value) => {
        updateBio(value);
        setValue(value);
    };


    const fetchBio = () => {
        Axios({
            method: "GET",
            url: `${SERVER_URL}/profile/${user.sub}`,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.status === 200) {
                setValue(res.data.userBio)
            }
        }).catch(error => {
            console.log("No bio was found, default bio will be used")
        });

    }

    const updateBio = (value) => {
        if (isAuthenticated && ! isLoading){
            Axios.put(`${SERVER_URL}/profile/${user.sub}`, { userId: user.sub , userBio: value }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    if (res.status === 200) {
                       console.log(" bio saved as: ", res.data)
                    }
                })
                .catch(error => {
                    console.log(error.response)
                });
        }
    }

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
