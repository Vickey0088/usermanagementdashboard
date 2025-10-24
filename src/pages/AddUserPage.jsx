import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  company: '', 
};
const InputField = ({ label, name, type = 'text', value, error, onChange, icon }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        {icon && <span className="mr-2 text-indigo-500">{icon}</span>}
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange} 
          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 ${
            error
              ? 'border-red-400 bg-red-50 focus:border-red-500'
              : 'border-gray-200 bg-gray-50 focus:border-indigo-500 focus:bg-white'
          } shadow-sm hover:shadow-md`}
          placeholder={`Enter ${label.toLowerCase()}`}
        />
        {value && !error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
            ✓
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-2 flex items-center"><span className="mr-1">⚠️</span>{error}</p>}
    </div>
);


// --- Main AddUserPage Component ---

const AddUserPage = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  
  const { addUser } = useContext(UserContext);
  
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    setFormData({ 
        ...formData, 
        [e.target.name]: e.target.value 
    });
    
    if (errors[e.target.name]) {
        setErrors(prev => ({
            ...prev,
            [e.target.name]: null
        }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addUser(formData); 
      
     
      alert(`User "${formData.name}" added successfully!`);
      
      setFormData(initialFormData); // Reset form
      navigate('/'); // Redirect to the home page
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <span className="text-3xl text-white">👤</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Add New User
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Create a new user profile with essential information. Fill in all required fields to get started.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
            <h2 className="text-xl font-semibold flex items-center">
              <span className="mr-3">📝</span>
              User Information
            </h2>
            <p className="text-indigo-100 mt-1">Please provide accurate details for the new user</p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Personal Information Section */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-indigo-600 text-sm">👨‍💼</span>
                  </span>
                  Personal Information
                </h3>
              </div>

              {/* Full Name Input */}
              <InputField
                label="Full Name"
                name="name"
                value={formData.name}
                error={errors.name}
                onChange={handleChange}
                icon="👤"
              />

              {/* Email Address Input */}
              <InputField
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                error={errors.email}
                onChange={handleChange}
                icon="📧"
              />

              {/* Contact Information Section */}
              <div className="md:col-span-2 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 text-sm">📞</span>
                  </span>
                  Contact Information
                </h3>
              </div>

              {/* Phone Number Input */}
              <InputField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                error={errors.phone}
                onChange={handleChange}
                icon="📱"
              />

              {/* Company Name Input */}
              <InputField
                label="Company Name"
                name="company"
                value={formData.company}
                error={errors.company}
                onChange={handleChange}
                icon="🏢"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg transform hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  <span className="mr-2">✨</span>
                  Create User Profile
                  <span className="ml-2">🚀</span>
                </span>
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                All fields are required to create a complete user profile
              </p>
            </div>
          </form>
        </div>

        {/* Back to Dashboard Link */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
          >
            <span className="mr-2">←</span>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;