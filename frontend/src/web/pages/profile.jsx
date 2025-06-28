import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Profile = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check system preference for dark mode
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    document.body.classList.toggle('dark-mode');
  };

  const doctorProfile = {
    name: 'Dr. John Smith',
    specialization: 'General Practitioner',
    experience: '15 years',
    email: 'john.smith@rhealthcare.com',
    phone: '+1 (555) 123-4567',
    address: '123 Medical Center, Healthcare Street, NY 10001',
    license: 'NY12345',
    education: [
      'MD - Medical University, 2008',
      'Residency - Central Hospital, 2011',
      'Board Certification - American Board of Medicine, 2012'
    ]
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ease-in-out ${
      isDarkMode 
        ? 'dark bg-gray-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="relative min-h-screen">
        {/* Background gradient overlay */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${
          isDarkMode
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-50'
            : 'bg-gradient-to-br from-blue-50 via-white to-gray-50 opacity-30'
        }`} />

        {/* Content wrapper */}
        <div className="relative z-10">
          <Header 
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            activeTab={activeTab}
          />

          <Sidebar 
            isDarkMode={isDarkMode}
            isMobileMenuOpen={isMobileMenuOpen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Main Content */}
          <div className="p-4 lg:ml-64 pt-20 transition-all duration-300">
            <div className="p-4 rounded-lg">
              {/* Header Section */}
              <div className={`mb-8 p-6 rounded-lg shadow-sm transition-all duration-300 ${
                isDarkMode
                  ? 'bg-gray-800/50 hover:bg-gray-800/70'
                  : 'bg-white hover:shadow-md'
              }`}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Link
                        to="/"
                        className={`text-sm transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        ← Back to Dashboard
                      </Link>
                    </div>
                    <h2 className={`text-2xl md:text-3xl font-bold mb-2 transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Doctor Profile
                    </h2>
                    <p className={`transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Manage your personal and professional information
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Profile Information */}
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {/* Personal Information */}
                <div className={`p-6 rounded-lg transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gray-800/50'
                    : 'bg-white'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                      <p className="font-medium">{doctorProfile.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Specialization</p>
                      <p className="font-medium">{doctorProfile.specialization}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                      <p className="font-medium">{doctorProfile.experience}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">License Number</p>
                      <p className="font-medium">{doctorProfile.license}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className={`p-6 rounded-lg transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gray-800/50'
                    : 'bg-white'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="font-medium">{doctorProfile.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="font-medium">{doctorProfile.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                      <p className="font-medium">{doctorProfile.address}</p>
                    </div>
                  </div>
                </div>

                {/* Education & Certifications */}
                <div className={`p-6 rounded-lg transition-all duration-300 md:col-span-2 ${
                  isDarkMode
                    ? 'bg-gray-800/50'
                    : 'bg-white'
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Education & Certifications
                  </h3>
                  <ul className="space-y-2">
                    {doctorProfile.education.map((edu, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">•</span>
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
