import React, { useState, useEffect } from 'react';
import { HeartIcon, UserIcon, ClockIcon } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const CriticalCare = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('critical care');
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

  const criticalPatients = [
    { id: 1, name: 'John Doe', condition: 'Intensive Care', status: 'Critical', lastUpdate: '2 hours ago' },
    { id: 2, name: 'Jane Smith', condition: 'Emergency Care', status: 'Stable', lastUpdate: '30 minutes ago' },
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ease-in-out ${
      isDarkMode 
        ? 'dark bg-gray-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="relative min-h-screen">
        {/* Enhanced gradient overlay */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${
          isDarkMode
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-50'
            : 'bg-gradient-to-br from-blue-50 via-white to-gray-50 opacity-30'
        }`}>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

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
          <div className="p-4 lg:ml-64 pt-20 transition-all duration-500 animate-fadeIn">
            <div className="p-4 rounded-lg">
              {/* Welcome Section */}
              <div className={`mb-8 p-6 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-[1.01] ${
                isDarkMode
                  ? 'bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm'
                  : 'bg-white hover:shadow-lg backdrop-blur-sm'
              }`}>
                <h1 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Critical Care Unit
                </h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Monitor and manage patients requiring immediate attention
                </p>
              </div>

              {/* Patient List */}
              <div className={`grid gap-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {criticalPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`p-4 rounded-lg border ${
                      isDarkMode
                        ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    } transition-all duration-300 transform hover:scale-[1.01]`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${
                          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          <UserIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {patient.name}
                          </h3>
                          <p className="text-sm">{patient.condition}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className={`px-3 py-1 rounded-full text-sm ${
                          patient.status === 'Critical'
                            ? 'bg-red-100 text-red-600'
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {patient.status}
                        </div>
                        <div className="flex items-center text-sm">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {patient.lastUpdate}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CriticalCare; 