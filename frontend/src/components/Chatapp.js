import React, { useState } from "react";
import "./Chatapp.css";

function Chatapp({ labsData }) {
  const [messages, setMessages] = useState([
    { text: "Hai miss !", time: "10:30 AM", incoming: true },
    { text: "Hello, how r u ?", time: "10:31 AM", incoming: false },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [activeItem, setActiveItem] = useState("Network Lab");

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages([
        ...messages,
        { text: newMessage, time: currentTime, incoming: false },
      ]);
      setNewMessage("");
    }
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="ChatApp">
      <div className="ChatApp-container">
        <div className="ChatApp-sidebar">
          {labsData.map((lab, index) => (
            <div
              key={index}
              className={`ChatApp-sidebar-item ${
                activeItem === lab ? "active" : ""
              }`}
              style={{ backgroundColor: "#363949", color: "#f4f4f8" }}
              onClick={() => handleItemClick(lab)}
            >
              {lab}
            </div>
          ))}
        </div>
        <div className="ChatApp-chat-area">
          <div className="ChatApp-chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`ChatApp-message ${
                  message.incoming ? "incoming" : "outgoing"
                }`}
                style={{
                  backgroundColor: message.incoming ? "#1565c0" : "#ababad",
                  color: "#363949",
                }}
              >
                <div className="ChatApp-message-text">{message.text}</div>
                <div className="ChatApp-message-time">{message.time}</div>
              </div>
            ))}
          </div>
          <div className="ChatApp-chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={handleMessageChange}
              style={{ backgroundColor: "#ababad", color: "#363949" }}
            />
            <button
              style={{ backgroundColor: "#1565c0", color: "#f4f4f8" }}
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatapp;
