import React, { useState, useEffect } from 'react';
import { UserIcon, CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const LongTermCare = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('long term care');
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

  const longTermPatients = [
    { 
      id: 1, 
      name: 'Robert Johnson', 
      admissionDate: '2024-01-15', 
      treatment: 'Physical Therapy',
      progress: 75
    },
    { 
      id: 2, 
      name: 'Mary Williams', 
      admissionDate: '2024-02-01', 
      treatment: 'Rehabilitation',
      progress: 45
    }
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
                  Long Term Care
                </h1>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Monitoring long-term patients and their recovery progress
                </p>
              </div>

              {/* Patient List */}
              <div className={`grid gap-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {longTermPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`p-4 rounded-lg border ${
                      isDarkMode
                        ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                    } transition-all duration-300 transform hover:scale-[1.01]`}
                  >
                    <div className="flex flex-col gap-4">
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
                            <div className="flex items-center text-sm gap-2">
                              <CalendarIcon className="w-4 h-4" />
                              <span>Admitted: {patient.admissionDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {patient.treatment}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <ChartBarIcon className="w-4 h-4" />
                            <span>Progress: {patient.progress}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div 
                          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
                          style={{ width: `${patient.progress}%` }}
                        ></div>
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

export default LongTermCare; 