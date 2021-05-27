import React, { useState, useEffect } from "react";
import Axios from "axios";
import './Content.css'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { useAuth0 } from "@auth0/auth0-react";
import { CategoryStore } from '../../CategoryStore'
import ChatRoom from "../chat/Chat";


export var setSpecificCategory = (e, data) => {

    e.preventDefault();
    e.persist()
    var tempcat = e.currentTarget.value
    //  console.log("name is  ", tempcat)
    //  console.log(e.target.value)
    console.log(data)
    this.setNewContent(data)

};

function Content(prop) {
    // content state from fetch
    const [content, setContent] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const SERVER_URL = "http://localhost:4000"

    // Form states
    // Use defaults until user database is implemented
    const [userId, setUserId] = useState();
    const [userName, setUserName] = useState();

    const [contentTitle, setContentTitle] = useState("");
    const [contentBody, setContentBody] = useState("");
    const [imageLink, setImageLink] = useState(null);
    const [postCategory, setPostCategory] = useState("Cat");

    // const [NewCategoryContent,setNewContent] = useState("Category");

    const { user, isAuthenticated, isLoading } = useAuth0();

    const category = CategoryStore.useState(state => state.category)




    const getAllContent = () => {
        Axios({
            method: "GET",
            url: `${SERVER_URL}/content/`,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.status === 200) {
                // Cheap way to get the latest posts on top.
                // Potentially think of something more fancy like sorting by date explicitly.
                setContent(res.data.reverse());
            }
        }).catch(error => {
            console.log("getting an error ", error)
        });
        // console.log("dsahdjasda ", `${SERVER_URL}/content/${NewCategoryContent}`)
    }


    const getAllContentInCategory = () => {
        Axios({
            method: "GET",
            url: `${SERVER_URL}/content/Category/${category}`,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.status === 200) {

                setContent(res.data.reverse());
            }
        }).catch(error => {
            console.log("getting an error ", error)
        });
        // console.log("dsahdjasda ", `${SERVER_URL}/content/${NewCategoryContent}`)
    }

    useEffect(() => {
        // call server and return content objects
        getAllContent();
    }, [])

    useEffect(() => {
        if (category === "") {
            getAllContent();
        } else {
            getAllContentInCategory();
        }
    }, [category])

    useEffect(() => {
        if (!isLoading) {
            if (isAuthenticated) {
                setUserId(user.sub)
                setUserName(user.nickname)
            }
        }
    }, [isAuthenticated])


    const show = () => setModalVisible(true);
    const hide = () => setModalVisible(false);

    const postContent = (event) => {
        // event.preventDefault();
        hide();
        let newContent = {
            userId: userId,
            username: userName,
            contentTitle: contentTitle,
            contentBody: contentBody,
            contentCategory: postCategory
        }
        if (imageLink !== null && imageLink !== "") {
            newContent.imageLink = imageLink;

        }


        Axios.post(`${SERVER_URL}/content`, newContent, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (res.status === 200) {
                    const newContentList = content.unshift(res.data);
                    setContent(newContentList);
                }
            })
            .catch(error => {
                console.log(error.response)
            });;
    }


    const likePost = (id, likes, index, likedByUsers) => {
        if (isAuthenticated && !isLoading) {

            let updatedLikedByUsers = likedByUsers;
            let likeModifier = 0


            if (!likedByUsers.includes(userId)) {
                updatedLikedByUsers = [...likedByUsers, userId];
                likeModifier = 1;
            } else {
                updatedLikedByUsers = likedByUsers.filter(id => id !== userId)
                likeModifier = -1;
            }


            Axios.patch(`${SERVER_URL}/content/${id}`, { likes: likes + likeModifier, likedByUsers: updatedLikedByUsers }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        console.log("old", likedByUsers)
                        console.log("new", updatedLikedByUsers)
                        setContent(content => ([...content, content[index].likes += likeModifier]))
                        setContent(content => ([...content, content[index].likedByUsers = updatedLikedByUsers]))

                    }
                })
                .catch(error => {
                    console.log(error.response)
                });
        }
    }

    const likeButtonRenderer = (userList) => {
        let button = null;
        if (!isLoading && isAuthenticated) {
            if (userList) {
                if (userList.includes(userId)) {
                    button = <span className="like-btn">❤️</span>
                } else {
                    button = <span className="like-btn">🤍</span>
                }
            }
        }

        return button;

    }

    function selectDropDown(e) {
        setPostCategory(e.target.value)
    }

    return (
        <div style={{ display: "flex", justifyItems: 'center', flexFlow: "column", paddingTop: "80px" }}>
            <Rodal visible={modalVisible} onClose={() => hide()} animation="rotate" width={900} height={700}>
                <div>

                    <form onSubmit={postContent}>
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

                        <select
                            className="post-input-field"
                            onChange={selectDropDown}
                            value={postCategory}
                        >
                            <option value="Cat">Cat</option>
                            <option value="Dog">Dog</option>
                            <option value="Food">Food</option>
                        </select>

                        <br />


                        <input className="post-submit" type="submit" value="PUBLISH" />

                    </form>
                </div>
            </Rodal>
            <div className="content-houser">
                <div className="content-main">
                    {content.map((post, index) => (
                        <div className="container-border">
                            <div className="content-container">
                                {/* main content */}
                                <div>
                                    <h2>{post.contentTitle}</h2>
                                    {/* TODO: add link to user profile once user db is setup */}
                                    <span>by: </span> <a href="">{post.username}</a>

                                    <h2> <span onClick={() => likePost(post._id, post.likes, index, post.likedByUsers)}>{likeButtonRenderer(post.likedByUsers)}</span> {post.likes}</h2>
                                    <h3>Content Category: {post.contentCategory}</h3>
                                    <p>
                                        {post.contentBody}
                                    </p>
                                    {post.imageLink ? <img className="content-img" src={post.imageLink} alt="image" /> : null}
                                    {/* TODO: convert to readable date formatter */}
                                    <span className="date-span">{post.postDate}</span>

                                </div>
                            </div>
                        </div>)
                    )}
                </div>

                {isAuthenticated ? <div className="new-post-btn" onClick={() => show()}>📝 CREATE NEW POST</div> : null}
                <div className="content-chat">
                    {isAuthenticated ? <ChatRoom room={category} username={userName} /> : null}
                </div>
            </div>
        </div>
    );


}



export default Content;
