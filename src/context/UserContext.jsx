import React, { createContext, useState, useEffect } from 'react';
import { fetchUsers as apiFetchUsers } from '../api/userApi';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await apiFetchUsers();
        const localUsers = JSON.parse(localStorage.getItem('addedUsers')) || [];
        const mergedUsers = [...localUsers.map((u, i) => ({ ...u, id: -(i + 1) })), ...fetchedUsers];
        setUsers(mergedUsers);
      } catch (err) {
        setError("Could not load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);
  const addUser = (newUser) => {
    const newUserData = { ...newUser, id: -(users.length + 1), company: { name: newUser.company } };
    
    setUsers((prevUsers) => [newUserData, ...prevUsers]);

    const localUsers = JSON.parse(localStorage.getItem('addedUsers')) || [];
    localStorage.setItem('addedUsers', JSON.stringify([newUserData, ...localUsers]));
  };

  return (
    <UserContext.Provider value={{ users, loading, error, addUser }}>
      {children}
    </UserContext.Provider>
  );
};