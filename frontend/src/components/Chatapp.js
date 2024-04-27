import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chatapp.css";

function Chatapp({ labsData, username1 }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeItem, setActiveItem] = useState("Network Lab");

  // Function to format the date and time
  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(undefined, options);
  };

  // Function to fetch messages from the backend API
  const fetchMessages = async (subject) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/fac/get_queryset/?subject=${subject}`
      );
      const formattedMessages = response.data.map((message) => ({
        ...message,
        time: formatDateTime(message.time),
        incoming: message.sender_id !== username1, // Set incoming based on sender_id
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    // Fetch initial messages for the default subject
    fetchMessages(activeItem);
  }, []);

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  //Sending messages

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const currentTime = formatDateTime(new Date());

      try {
        // Send the message to the backend
        await axios.post("http://127.0.0.1:8000/fac/create_chat/", {
          subject: activeItem,
          sender_id: username1,
          message: newMessage,
        });

        // Add the new message to the existing messages
        setMessages([
          ...messages,
          {
            message: newMessage,
            time: currentTime,
            incoming: true, // Set incoming to true for messages sent by the user
            sender_id: username1, // Add the sender_id property
          },
        ]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    // Fetch messages for the selected subject
    fetchMessages(item);
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
                <div className="ChatApp-message-text">{message.message}</div>
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
