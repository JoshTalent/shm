import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {
  UserGroupIcon,
  CalendarIcon,
  StarIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
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

  const stats = [
    { name: "Today's Patients", value: '12', change: '+3 from yesterday', icon: UserGroupIcon },
    { name: 'Total Appointments', value: '45', change: 'This week', icon: CalendarIcon },
    { name: 'Patient Rating', value: '4.9/5', change: '+0.2 this month', icon: StarIcon },
    { name: 'Success Rate', value: '98%', change: 'Last 30 days', icon: ChartBarIcon },
  ];

  const upcomingAppointments = [
    { time: '10:00 AM', patient: 'Sarah Johnson', type: 'Regular Checkup', status: 'Confirmed' },
    { time: '11:30 AM', patient: 'Mike Peters', type: 'Follow-up', status: 'Waiting' },
    { time: '2:00 PM', patient: 'Emma Davis', type: 'Consultation', status: 'Confirmed' },
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

          {/* Main Content with fade-in animation */}
          <div className="p-4 lg:ml-64 pt-20 transition-all duration-500 animate-fadeIn">
            <div className="p-4 rounded-lg">
              {/* Welcome Section with hover effect */}
              <div className={`mb-8 p-6 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-[1.01] ${
                isDarkMode
                  ? 'bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm'
                  : 'bg-white hover:shadow-lg backdrop-blur-sm'
              }`}>
                <h2 className={`text-2xl md:text-3xl font-bold mb-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Welcome back, Dr. Smith
                </h2>
                <p className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  You have {upcomingAppointments.length} appointments scheduled for today
                </p>
              </div>

              {/* Stats Grid with hover animations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.name}
                      className={`p-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] group ${
                        isDarkMode
                          ? 'bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm'
                          : 'bg-white hover:shadow-lg backdrop-blur-sm'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg transition-colors duration-300 ${
                          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-6 h-6 transition-all duration-300 group-hover:scale-110 ${
                            isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                          }`} />
                        </div>
                        <div>
                          <dt className={`text-sm font-medium truncate transition-colors duration-300 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {stat.name}
                          </dt>
                          <dd className={`mt-1 text-2xl md:text-3xl font-semibold transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {stat.value}
                          </dd>
                          <dd className="mt-2 text-sm text-green-500 dark:text-green-400 transition-colors duration-300">
                            <span className="font-medium">{stat.change}</span>
                          </dd>
                        </div>
                      </div>
                      {stat.name === "Today's Patients" && (
                        <Link
                          to="/patients"
                          className="mt-4 text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 transition-colors duration-300 inline-flex items-center gap-2 group"
                        >
                          View all patients
                          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Upcoming Appointments with enhanced styling */}
              <div className={`rounded-lg shadow-sm transition-all duration-300 transform hover:scale-[1.01] ${
                isDarkMode
                  ? 'bg-gray-800/50 backdrop-blur-sm'
                  : 'bg-white backdrop-blur-sm'
              }`}>
                <div className="p-6">
                  <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 flex items-center gap-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <ClockIcon className="w-5 h-5" />
                    Upcoming Appointments
                  </h3>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg transition-all duration-300 transform hover:scale-[1.01] ${
                          isDarkMode
                            ? 'bg-gray-700/50 hover:bg-gray-700'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${
                              appointment.status === 'Confirmed'
                                ? isDarkMode
                                  ? 'bg-green-900/30'
                                  : 'bg-green-100'
                                : isDarkMode
                                  ? 'bg-yellow-900/30'
                                  : 'bg-yellow-100'
                            }`}>
                              {appointment.status === 'Confirmed' ? (
                                <CheckCircleIcon className={`w-5 h-5 ${
                                  isDarkMode ? 'text-green-400' : 'text-green-600'
                                }`} />
                              ) : (
                                <ExclamationCircleIcon className={`w-5 h-5 ${
                                  isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                                }`} />
                              )}
                            </div>
                            <div>
                              <p className={`font-medium transition-colors duration-300 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>
                                {appointment.patient}
                              </p>
                              <p className={`text-sm transition-colors duration-300 ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {appointment.type}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-medium transition-colors duration-300 ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {appointment.time}
                            </p>
                            <span className={`inline-block px-2 py-1 text-xs rounded-full transition-colors duration-300 ${
                              appointment.status === 'Confirmed'
                                ? isDarkMode
                                  ? 'bg-green-900/50 text-green-300'
                                  : 'bg-green-100 text-green-800'
                                : isDarkMode
                                  ? 'bg-yellow-900/50 text-yellow-300'
                                  : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {appointment.status}
                            </span>
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
      </div>
    </div>
  );
};

export default Dashboard;




