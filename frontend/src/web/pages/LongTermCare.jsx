import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { ShieldCheckIcon, UserIcon, ClockIcon } from '@heroicons/react/24/outline';

const LongTermCare = () => {
  const [activeTab, setActiveTab] = useState('long term care');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setActiveTab('long term care');
  }, []);

  const longTermPatients = [
    {
      id: 1,
      name: 'Margaret Johnson',
      age: 78,
      condition: 'Alzheimer\'s Disease',
      stayDuration: '2 years',
      careLevel: 'High',
      lastAssessment: '1 week ago',
      progress: 65
    },
    {
      id: 2,
      name: 'Robert Davis',
      age: 82,
      condition: 'Stroke Recovery',
      stayDuration: '8 months',
      careLevel: 'Medium',
      lastAssessment: '3 days ago',
      progress: 45
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
                  Long Term Care
                </h1>
                <p className="text-gray-600">
                  Managing patients requiring extended care
                </p>
              </div>

              {/* Long Term Patients Grid */}
              <div className="grid gap-4">
                {longTermPatients.map((patient) => (
                  <div key={patient.id} className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 transform hover:scale-[1.01]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-100">
                          <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                          <p className="text-sm text-gray-500">{patient.age} years old</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {patient.careLevel} Care
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Condition</p>
                        <p className="font-medium text-gray-900">{patient.condition}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Stay Duration</p>
                        <p className="font-medium text-gray-900">{patient.stayDuration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Assessment</p>
                        <p className="font-medium text-gray-900">{patient.lastAssessment}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Progress</p>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${patient.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{patient.progress}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Patient ID: {patient.id}</span>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
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

export default LongTermCare; 