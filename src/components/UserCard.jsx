import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  return (
    <Link to={`/user/${user.id}`} className="block group">
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-indigo-300 transform hover:-translate-y-1">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition duration-300 truncate">{user.name}</h2>
            <p className="text-sm text-indigo-600 font-medium">@{user.username}</p>
          </div>
        </div>

        <div className="space-y-2 text-gray-600">
          <div className="flex items-center text-sm">
            <span className="text-indigo-500 mr-2">📧</span>
            <span className="truncate">{user.email}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-green-500 mr-2">📱</span>
            <span className="truncate">{user.phone}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-purple-500 mr-2">🏢</span>
            <span className="truncate">{user.company?.name || 'N/A'}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500 group-hover:text-indigo-600 transition duration-300">Click to view details →</span>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;