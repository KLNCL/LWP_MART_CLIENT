import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";

const socket = io("http://localhost:5000"); // Connect to your backend

export default function Chat({ selectedUser }) {

  // Get user ID from the token
      const getUserDetailsFromToken = () => {
        const token = localStorage.getItem("authToken");
        if (!token) return null;
    
        try {
          return jwtDecode(token);
        } catch (error) {
          console.error("Invalid token", error);
          return null;
        }
      };
    
      const userDetails = getUserDetailsFromToken();
      const userId = userDetails?._id;
    
      

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const currentUserId = userId; // Replace with actual logged-in user ID
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the messages container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch messages between the current user and the selected user
  useEffect(() => {
    if (selectedUser) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/messages/${currentUserId}/${selectedUser._id}`
          );
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      fetchMessages();
    }
  }, [selectedUser, currentUserId]);

  // Listen for incoming messages
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      // Check if the message is already in the state to avoid duplicates
      if (!messages.some((msg) => msg._id === data._id)) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [messages]);

  // Send a message
  const sendMessage = async () => {
    if (message.trim() && selectedUser) {
      const msgData = {
        sender_id: currentUserId, // Current user's ID
        receiver_id: selectedUser._id, // Selected user's ID
        message,
      };

      try {
        // Save the message to the database
        const response = await axios.post("http://localhost:5000/api/sendmessage", msgData);
        const savedMessage = response.data; // Get the saved message with _id from the database

        // Emit the message via WebSocket
        socket.emit("sendMessage", savedMessage);

        // Update the local state with the saved message
        setMessages((prev) => [...prev, savedMessage]);
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // Scroll to the bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-container">
      {/* Chat Messages */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender_id === currentUserId ? 'sent-message' : 'received-message'}`}
          >
            <strong>{msg.sender_id === currentUserId ? "You" : selectedUser.userName}:</strong> {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input and Send Button */}
      <div className="message-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="message-input-field"
          placeholder="Type a message..."
          disabled={!selectedUser}
        />
        <button
          onClick={sendMessage}
          className="message-send-button"
          disabled={!selectedUser}
        >
          Send
        </button>
      </div>
    </div>
  );
}