import React, { useEffect } from "react";

import "./chatRoom.css";
import useChat from "../../helpers/useChat"


const ChatRoom = (props) => {
  const roomId = props.room; // Gets roomId
  const username = props.username; // Get Username
  const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(""); // Message to be sent

  console.log(roomId)

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if(!newMessage.length == 0){
      sendMessage(newMessage);
      setNewMessage("");
    }
  };


  useEffect(() => {

    var element = document.getElementById("scroll-To-Top");

    element.scrollTop = element.scrollHeight - element.clientHeight;

  });


  return (
    <div className="chat-room-container">
      <h4 className="room-name">{roomId !==''? `Category: ${roomId}`: null} </h4>

      <h4 className="combinedDiv">Your username: {username}</h4>
      
      <div id="scroll-To-Top" className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li id=""
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <div className="combinedDiv">
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
         <button onClick={handleSendMessage} className="send-message-button">
            Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;