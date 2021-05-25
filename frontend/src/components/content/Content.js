import React, { useState, useEffect } from "react";
import Axios from "axios";
import './Content.css'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

function Content() {
    // content state from fetch
    const [content, setContent] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const SERVER_URL = "http://localhost:4000"

    // Form states
    // Use defaults until user database is implemented
    const [userId, setUserId] = useState(-2);
    const [userName, setUserName] = useState("Guest");

    const [contentTitle, setContentTitle] = useState("");
    const [contentBody, setContentBody] = useState("");
    const [imageLink, setImageLink] = useState(null);




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


    const show = () => setModalVisible(true);
    const hide = () => setModalVisible(false);

    const postContent = () => {
        let newContent = {
            userId: userId,
            username: userName,
            contentTitle: contentTitle,
            contentBody: contentBody
        }
        if (imageLink !== null && imageLink !== "") {
            newContent.imageLink = imageLink;
            console.log("image link is: ", imageLink)
        }

        console.log('message', newContent)

        Axios.post(`${SERVER_URL}/content`, newContent, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    const newContentList = content.unshift(res.data);
                    setContent(newContentList);
                }
            })
            .catch(error => {
                console.log(error.response)
            });;
    }


    const likePost = (id, likes, index) => {
        Axios.patch(`${SERVER_URL}/content/${id}`, { likes: likes + 1 }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    console.log("index", index)
                    setContent(content => ([...content, content[index].likes++]))

                }
            })
            .catch(error => {
                console.log(error.response)
            });;
    }



    return (
    <div style={{ display: "flex", justifyItems: 'center', flexFlow: "column", paddingTop: "80px" }}>
            <Rodal visible={modalVisible} onClose={() => hide()} animation="rotate" width={900} height={700}>
                <div>

                    <form onSubmit={() => postContent()}>
                        <input
                            className="post-input-field"
                            value={contentTitle}
                            onChange={e => setContentTitle(e.target.value)}
                            placeholder="Title"
                            type="text"
                            name="contentTitle"
                            required
                        />
                        <br />

                        <textarea
                            value={contentBody}
                            className="post-text-area"
                            rows="16"
                            cols="100"
                            maxlength="2000"
                            onChange={e => setContentBody(e.target.value)}
                            placeholder="Your new post goes here..."
                            type="text"
                            name="contentBody"
                            required
                        />
                        <br />


                        <input
                            value={imageLink}
                            className="post-input-field"
                            onChange={e => setImageLink(e.target.value)}
                            placeholder="Paste your image link here"
                            type="text"
                            name="imageLink"
                        />
                        <br />

                        <input className="post-submit" type="submit" value="PUBLISH" />

                    </form>
                </div>
            </Rodal>

            {content.map((post, index) => (
                <div className="container-border">
                    <div className="content-container">
                        {/* main content */}
                        <div>
                            <h2>{post.contentTitle}</h2>
                            {/* TODO: add link to user profile once user db is setup */}
                            <span>by: </span> <a href="">{post.username}</a>
                            <p>
                                {post.contentBody}
                            </p>
                            {post.imageLink ? <img className="content-img" src={post.imageLink} alt="image" /> : null}
                            {/* TODO: convert to readable date formatter */}
                            <span className="date-span">{post.postDate}</span>
                            <h2 onClick={() => likePost(post._id, post.likes, index)}>❤️</h2>
                            <h2>{post.likes}</h2>
                        </div>
                    </div>
                </div>)
            )}

            <div className="new-post-btn" onClick={() => show()}>📝 CREATE NEW POST</div>
        </div>
    );


}



export default Content;
