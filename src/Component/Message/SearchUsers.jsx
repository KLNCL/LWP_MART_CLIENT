import React, { useState } from 'react';
import axios from 'axios';

export default function SearchUsers({ onSelectUser }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Fetch users from the backend based on search query
  const fetchUsers = async () => {
    if (!searchQuery.trim()) {
      setFilteredUsers([]); // Clear results if search query is empty
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/search-users?query=${searchQuery}`
      );
      setFilteredUsers(response.data); // Set filtered users
    } catch (error) {
      console.error("Error fetching users:", error);
      setFilteredUsers([]); // Clear results on error
    }
  };

  // Handle search button click
  const handleSearchClick = () => {
    fetchUsers();
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Search Tab */}
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter username..."
          className="flex-grow p-2 border rounded"
        />
        <button
          onClick={handleSearchClick}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Display Filtered Users */}
      <div className="flex gap-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => onSelectUser(user)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Chat with {user.userName}
            </button>
          ))
        ) : (
          <p className="text-gray-500">
            {searchQuery.trim() ? "No users found" : "Enter a username to search"}
          </p>
        )}
      </div>
    </div>
  );
}