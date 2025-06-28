import React from 'react';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  ChartBarIcon,
  UserCircleIcon,
  CalendarIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  StarIcon,
  HeartIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  { name: 'dashboard', path: '/', icon: HomeIcon },
  { name: 'patients', path: '/patients', icon: UserGroupIcon },
  { name: 'reports', path: '/reports', icon: ChartBarIcon },
  { name: 'devices', path: '/devices', icon: DevicePhoneMobileIcon },
  { name: 'profile', path: '/profile', icon: UserCircleIcon }
];

const specialPatientsItems = [
  { name: 'critical care', path: '/critical-care', icon: HeartIcon, badge: '2' },
  { name: 'long term care', path: '/long-term-care', icon: ShieldCheckIcon }
];

const secondaryMenuItems = [
  { name: 'settings', path: '/settings', icon: Cog6ToothIcon },
  { name: 'help', path: '/help', icon: QuestionMarkCircleIcon }
];

const Sidebar = ({ isDarkMode, isMobileMenuOpen, activeTab, setActiveTab }) => {
  return (
    <>
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform duration-500 ease-in-out transform ${
        isDarkMode
          ? 'bg-gray-900 border-gray-700 shadow-lg shadow-gray-900/20'
          : 'bg-white border-gray-200 shadow-lg shadow-gray-200/20'
      } border-r ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className={`h-full px-3 pb-4 overflow-y-auto transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
          {/* Primary Navigation */}
          <ul className="space-y-1.5 font-medium">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`group flex items-center gap-3 w-full p-2.5 rounded-lg transition-all duration-300 ${
                      activeTab === item.name
                        ? isDarkMode
                          ? 'bg-indigo-600/20 text-indigo-400'
                          : 'bg-indigo-50 text-indigo-600'
                        : isDarkMode
                          ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setActiveTab(item.name)}
                  >
                    <Icon className={`w-5 h-5 transition-transform duration-300 ${
                      activeTab === item.name
                        ? 'scale-110'
                        : 'group-hover:scale-110'
                    }`} />
                    <span className="capitalize">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Special Patients Section */}
          <div className={`mt-6 mb-4 px-3 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <div className="flex items-center gap-2">
              <div className={`h-px flex-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              <span className="text-xs font-medium uppercase">Special Patients</span>
              <div className={`h-px flex-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            </div>
          </div>

          <ul className="space-y-1.5 font-medium mb-6">
            {specialPatientsItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`group flex items-center gap-3 w-full p-2.5 rounded-lg transition-all duration-300 ${
                      activeTab === item.name
                        ? isDarkMode
                          ? 'bg-indigo-600/20 text-indigo-400'
                          : 'bg-indigo-50 text-indigo-600'
                        : isDarkMode
                          ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setActiveTab(item.name)}
                  >
                    <Icon className={`w-5 h-5 transition-transform duration-300 ${
                      activeTab === item.name
                        ? 'scale-110'
                        : 'group-hover:scale-110'
                    }`} />
                    <span className="capitalize flex-1">{item.name}</span>
                    {item.badge && (
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        isDarkMode
                          ? 'bg-indigo-600/30 text-indigo-400'
                          : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          <div className={`my-4 border-t ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`} />

          {/* Secondary Navigation */}
          <ul className="space-y-1.5 font-medium">
            {secondaryMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`group flex items-center gap-3 w-full p-2.5 rounded-lg transition-all duration-300 ${
                      activeTab === item.name
                        ? isDarkMode
                          ? 'bg-gray-800 text-gray-200'
                          : 'bg-gray-100 text-gray-900'
                        : isDarkMode
                          ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setActiveTab(item.name)}
                  >
                    <Icon className={`w-5 h-5 transition-all duration-300 ${
                      item.name === 'settings'
                        ? 'group-hover:rotate-90'
                        : 'group-hover:scale-110'
                    }`} />
                    <span className="capitalize">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Pro Badge */}
          <div className={`mt-6 p-4 rounded-lg transition-all duration-300 ${
            isDarkMode
              ? 'bg-gradient-to-br from-gray-800 to-gray-700'
              : 'bg-gradient-to-br from-gray-50 to-gray-100'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${
                isDarkMode
                  ? 'bg-indigo-600/20'
                  : 'bg-indigo-100'
              }`}>
                <svg className={`w-6 h-6 ${
                  isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className={`text-sm font-semibold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Pro Member</p>
                <p className={`text-xs ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>Unlimited Access</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 lg:hidden transition-all duration-500 bg-gray-900/30 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar; 