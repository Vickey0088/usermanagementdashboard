import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserDetails } from '../api/userApi';
import LoadingSpinner from '../components/LoadingSpinner';
import { UserContext } from '../context/UserContext';

const UserDetailsPage = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const { users } = React.useContext(UserContext); // Access users from context
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      if (parseInt(id) < 0) {
        const localUser = users.find(u => u.id === parseInt(id));
        if (localUser) {
          setUser(localUser);
          setLoading(false);
          return;
        }
      }

      // 2. Fetch from API for standard users
      try {
        const data = await fetchUserDetails(id);
        setUser(data);
      } catch (err) {
        setError('Failed to load user details.');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, users]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!user) return <div className="text-center text-gray-500 mt-10">User not found.</div>;

  const DetailItem = ({ label, value }) => (
    <div className="flex justify-between py-2 border-b">
      <span className="font-medium text-gray-600">{label}:</span>
      <span className="text-gray-800">{value || 'N/A'}</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white p-4 sm:p-8 rounded-xl shadow-2xl mt-4 sm:mt-10 border border-gray-100">
      <button
        onClick={() => navigate('/')}
        className="bg-indigo-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-indigo-700 transition duration-300 mb-4 sm:mb-6 flex items-center font-semibold text-sm sm:text-base"
      >
        ← Back to Dashboard
      </button>

      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-2">{user.name}</h1>
        <p className="text-lg sm:text-xl text-indigo-600 font-medium">@{user.username}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-lg border border-blue-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center">
              📧 Contact Information
            </h2>
            <div className="space-y-3">
              <DetailItem label="Email" value={user.email} />
              <DetailItem label="Phone" value={user.phone} />
              <DetailItem label="Website" value={user.website} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 rounded-lg border border-green-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center">
              🏢 Company Details
            </h2>
            <div className="space-y-3">
              <DetailItem label="Company Name" value={user.company?.name} />
              <DetailItem label="Catch Phrase" value={user.company?.catchPhrase} />
              <DetailItem label="Business Statement" value={user.company?.bs} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-lg border border-purple-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 flex items-center">
            📍 Address Information
          </h2>
          <div className="space-y-3">
            <DetailItem label="Street" value={user.address?.street} />
            <DetailItem label="Suite" value={user.address?.suite} />
            <DetailItem label="City" value={user.address?.city} />
            <DetailItem label="Zipcode" value={user.address?.zipcode} />
            <DetailItem label="Geo Location" value={`${user.address?.geo?.lat}, ${user.address?.geo?.lng}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;