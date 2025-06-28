import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { UserCircleIcon, PencilIcon } from '@heroicons/react/24/outline';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Dr. Richard Smith',
    specialization: 'Cardiology',
    experience: '15 years',
    licenseNumber: 'MD123456',
    email: 'richard@healthcare.com',
    phone: '+1 (555) 123-4567',
    address: '123 Medical Center Dr, Healthcare City, HC 12345'
  });

  useEffect(() => {
    setActiveTab('profile');
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Profile updated:', profileData);
  };

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="relative min-h-screen">
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50 opacity-30">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        {/* Content wrapper */}
        <div className="relative z-10">
          <Header 
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            activeTab={activeTab}
          />
          <Sidebar 
            isMobileMenuOpen={isMobileMenuOpen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Main Content */}
          <div className="p-4 lg:ml-64 pt-20 transition-all duration-500 animate-fadeIn">
            <div className="p-4 rounded-lg">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2 text-gray-900">
                  Profile
                </h1>
                <p className="text-gray-600">
                  Manage your professional information
                </p>
              </div>

              {/* Profile Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                      RS
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{profileData.fullName}</h2>
                      <p className="text-gray-600">{profileData.specialization}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                  >
                    <PencilIcon className="w-4 h-4" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                {/* Profile Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      <p className="font-medium text-gray-900">{profileData.fullName}</p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Specialization</p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="specialization"
                        value={profileData.specialization}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      <p className="font-medium text-gray-900">{profileData.specialization}</p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="experience"
                        value={profileData.experience}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      <p className="font-medium text-gray-900">{profileData.experience}</p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">License Number</p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="licenseNumber"
                        value={profileData.licenseNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      <p className="font-medium text-gray-900">{profileData.licenseNumber}</p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      <p className="font-medium text-gray-900">{profileData.email}</p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      <p className="font-medium text-gray-900">{profileData.phone}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Address</p>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={profileData.address}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      <p className="font-medium text-gray-900">{profileData.address}</p>
                    )}
                  </div>
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
