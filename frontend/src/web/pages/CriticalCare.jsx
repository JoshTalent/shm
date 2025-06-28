import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { HeartIcon, ExclamationTriangleIcon, ClockIcon } from '@heroicons/react/24/outline';

const CriticalCare = () => {
  const [activeTab, setActiveTab] = useState('critical care');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setActiveTab('critical care');
  }, []);

  const criticalPatients = [
    {
      id: 1,
      name: 'John Doe',
      age: 65,
      condition: 'Cardiac Arrest',
      severity: 'Critical',
      lastUpdate: '2 minutes ago',
      vitals: {
        heartRate: 120,
        bloodPressure: '180/110',
        oxygen: 85,
        temperature: 38.5
      }
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      age: 42,
      condition: 'Respiratory Failure',
      severity: 'Critical',
      lastUpdate: '5 minutes ago',
      vitals: {
        heartRate: 95,
        bloodPressure: '140/90',
        oxygen: 78,
        temperature: 37.8
      }
    }
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
                  Critical Care Unit
                </h1>
                <p className="text-gray-600">
                  Monitoring patients in critical condition
                </p>
              </div>

              {/* Critical Patients Grid */}
              <div className="grid gap-4 text-gray-600">
                {criticalPatients.map((patient) => (
                  <div key={patient.id} className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 transform hover:scale-[1.01]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-red-100">
                          <HeartIcon className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                          <p className="text-sm text-gray-500">{patient.age} years old</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
                        <span className="text-sm font-medium text-red-600">{patient.severity}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Heart Rate</p>
                        <p className="text-lg font-semibold text-gray-900">{patient.vitals.heartRate} bpm</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Blood Pressure</p>
                        <p className="text-lg font-semibold text-gray-900">{patient.vitals.bloodPressure}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Oxygen</p>
                        <p className="text-lg font-semibold text-gray-900">{patient.vitals.oxygen}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Temperature</p>
                        <p className="text-lg font-semibold text-gray-900">{patient.vitals.temperature}°C</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Last updated: {patient.lastUpdate}</span>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300">
                        View Details
                      </button>
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