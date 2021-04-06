import React, { useState, useEffect } from "react";
import Axios from "axios";
import './Content.css'

function Content() {
    // content state
    const [content, setContent] = useState([]);
    const SERVER_URL = "http://localhost:4000"


    const getAllContent = () => {
        Axios({
            method: "GET",
            url: `${SERVER_URL}/content`, 
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log(res)
            if (res.status === 200) {
                // Cheap way to get the latest posts on top.
                // Potentially think of something more fancy like sorting by date explicitly.
                setContent(res.data.reverse());
            }
        });
    }

    useEffect(() => {
        // call server and return content objects
        getAllContent();
        console.log(content)
    }, [])


    return (
        <div>
            {content.map((post, index) => (
                <div className="content-container">
                    <h2>{post.contentTitle}</h2>
                    {/* TODO: add link to user profile once user db is setup */}
                    <span>by: </span> <a href="">{post.username}</a> 
                    <p>
                        {post.contentBody}
                    </p>
                    {/* TODO: Make a date formatter */}
                    <span className="date-span">{post.postDate}</span> 
                </div>)
            )}
        </div>
    );

}



export default Content;
