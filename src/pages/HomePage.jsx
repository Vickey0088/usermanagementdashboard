// src/pages/HomePage.jsx
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import UserCard from "../components/UserCard";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";

const HomePage = () => {
  const { users = [], loading, error } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    (user.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    (user.email || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-black p-6">
        <LoadingSpinner />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black p-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-lg border border-red-700 bg-red-900/30 p-6 text-center text-white">
            <h2 className="text-xl font-semibold text-red-300 mb-2">Error</h2>
            <p className="text-sm text-red-200">{error}</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="py-4 sm:py-8">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">User Dashboard</h1>
        <p className="text-base sm:text-lg text-gray-600 px-4">Manage and view all your users in one place</p>
      </div>

      <div className="mb-6 sm:mb-8">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <div className="col-span-full text-center py-8 sm:py-12">
            <div className="text-4xl sm:text-6xl mb-4">🔍</div>
            <p className="text-lg sm:text-xl text-gray-500 mb-2">
              No users found matching "{searchTerm}".
            </p>
            <p className="text-sm sm:text-base text-gray-400 px-4">Try adjusting your search terms or add a new user.</p>
          </div>
        )}
      </div>

      {filteredUsers.length > 0 && (
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-sm sm:text-base text-gray-600">
            Showing {filteredUsers.length} of {users.length} users
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
