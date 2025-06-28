import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {
  UserGroupIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  HeartIcon,
  ShieldCheckIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Set active tab on component mount
    setActiveTab('dashboard');
  }, []);

  // Mock data for dashboard
  const stats = [
    {
      name: 'Total Patients',
      value: '1,234',
      change: '+12%',
      changeType: 'increase',
      icon: UserGroupIcon
    },
    {
      name: 'Active Devices',
      value: '89',
      change: '+5%',
      changeType: 'increase',
      icon: DevicePhoneMobileIcon
    },
    {
      name: 'Reports Generated',
      value: '456',
      change: '+23%',
      changeType: 'increase',
      icon: ChartBarIcon
    },
    {
      name: 'Critical Cases',
      value: '12',
      change: '-3%',
      changeType: 'decrease',
      icon: HeartIcon
    }
  ];

  const recentActivities = [
    { id: 1, patient: 'John Doe', action: 'Device connected', time: '2 minutes ago', status: 'success' },
    { id: 2, patient: 'Jane Smith', action: 'Report generated', time: '5 minutes ago', status: 'success' },
    { id: 3, patient: 'Mike Johnson', action: 'Alert triggered', time: '10 minutes ago', status: 'warning' },
    { id: 4, patient: 'Sarah Wilson', action: 'Device disconnected', time: '15 minutes ago', status: 'error' }
  ];

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
                  Dashboard
                </h1>
                <p className="text-gray-600">
                  Welcome back! Here's what's happening with your patients today.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid gap-4 mb-8">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 transform hover:scale-[1.01]">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-gray-100">
                          <Icon className="w-6 h-6 text-indigo-600" />
                        </div>
                      </div>
                      <div className="mt-4 flex items-center">
                        <span className={`text-sm font-medium ${
                          stat.changeType === 'increase' ? 'text-green-600' : 'text-yellow-600'
                        } transition-colors duration-300`}>
                          {stat.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">from last month</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="grid gap-4 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Link
                      to="/patients"
                      className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300 group"
                    >
                      <UserGroupIcon className="w-8 h-8 text-indigo-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm font-medium text-gray-900">View Patients</span>
                    </Link>
                    <Link
                      to="/devices"
                      className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300 group"
                    >
                      <DevicePhoneMobileIcon className="w-8 h-8 text-indigo-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm font-medium text-gray-900">Manage Devices</span>
                    </Link>
                    <Link
                      to="/reports"
                      className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300 group"
                    >
                      <ChartBarIcon className="w-8 h-8 text-indigo-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm font-medium text-gray-900">Generate Reports</span>
                    </Link>
                    <Link
                      to="/critical-care"
                      className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300 group"
                    >
                      <HeartIcon className="w-8 h-8 text-indigo-600 mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm font-medium text-gray-900">Critical Care</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid gap-4">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                        <div className={`p-2 rounded-full ${
                          activity.status === 'success' ? 'bg-green-100' :
                          activity.status === 'warning' ? 'bg-yellow-100' :
                          'bg-red-100'
                        }`}>
                          {activity.status === 'success' ? (
                            <CheckCircleIcon className="w-5 h-5 text-green-600" />
                          ) : activity.status === 'warning' ? (
                            <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
                          ) : (
                            <ClockIcon className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.patient}</p>
                          <p className="text-sm text-gray-600">{activity.action}</p>
                        </div>
                        <span className="text-sm text-gray-500">{activity.time}</span>
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




