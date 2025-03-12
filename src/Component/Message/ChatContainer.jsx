import React, { useState, useEffect } from 'react';
import './styles.scss';
import axios from 'axios';
import { io } from "socket.io-client";
import SearchUsers from './SearchUsers';
import Chat from './Chat';
import { jwtDecode } from "jwt-decode";
import {useNavigate } from 'react-router-dom';



const socket = io("http://localhost:5000"); // Connect to your backend

export default function ChatContainer() {

  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  };

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

  const [selectedUser, setSelectedUser] = useState(null);
  const [chattedUsers, setChattedUsers] = useState([]); // List of users with whom the current user has chatted
  const currentUserId = userId ; // Replace with actual logged-in user ID

  // Fetch users with whom the current user has chatted
  useEffect(() => {
    const fetchChattedUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/usersChated/${currentUserId}`
        );
        const user = response.data;
        const chattedUsers = user.chattedWith.map(userId => ({
          _id: userId,
          userName: user.chattedWithUserNames[userId] // Assuming you have a way to get user names
        }));
        setChattedUsers(chattedUsers);
      } catch (error) {
        console.error("Error fetching chatted users:", error);
      }
    };

    fetchChattedUsers();
  }, [currentUserId]);

  // Add a new user to the chattedUsers list if they aren't already there
  const addToChattedUsers = (user) => {
    if (!chattedUsers.some((u) => u._id === user._id)) {
      setChattedUsers((prev) => [...prev, user]);
    }
  };

  return (
    <div className="flex h-[90vh] mt-[70px]">
      {/* Left Side: List of chatted users */}
      <div className="w-1/4 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Chatted Users</h2>
        <div className="flex flex-col gap-2">
          {chattedUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`p-2 bg-white rounded shadow hover:bg-blue-100 ${
                selectedUser?._id === user._id ? 'bg-blue-200' : ''
              }`}
            >
              {user.userName} {/* Display the username */}
            </button>
          ))}
        </div>
      </div>

      {/* Right Side: Chat interface */}
      <div className="w-3/4 p-4">
        <SearchUsers
          onSelectUser={(user) => {
            setSelectedUser(user);
            addToChattedUsers(user); // Add the user to the chattedUsers list
          }}
        />
        <Chat selectedUser={selectedUser} />
      </div>
    </div>
  );
}