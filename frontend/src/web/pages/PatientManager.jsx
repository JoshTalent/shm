import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { UserGroupIcon, PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const PatientManager = () => {
  const [activeTab, setActiveTab] = useState('patients');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate patient data
    const mockPatients = [
      {
        id: 1,
        name: 'John Doe',
        age: 45,
        gender: 'Male',
        condition: 'Hypertension',
        status: 'Active',
        lastVisit: '2024-01-15'
      },
      {
        id: 2,
        name: 'Jane Smith',
        age: 32,
        gender: 'Female',
        condition: 'Diabetes',
        status: 'Active',
        lastVisit: '2024-01-20'
      }
    ];

    setPatients(mockPatients);
  }, []);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  Patient Manager
                </h1>
                <p className="text-gray-600">
                  Comprehensive patient management system
                </p>
              </div>

              {/* Search and Add Section */}
              <div className="mb-8 flex flex-wrap gap-4 items-end bg-white p-4 rounded-lg shadow">
                <div className="flex-1 min-w-64">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                    Search Patients
                  </label>
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by name or condition..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                  <PlusIcon className="w-5 h-5" />
                  Add Patient
                </button>
              </div>

              {/* Patients Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPatients.map((patient) => (
                  <div key={patient.id} className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 transform hover:scale-[1.01]">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-indigo-100">
                          <UserGroupIcon className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                          <p className="text-sm text-gray-500">{patient.age} years, {patient.gender}</p>
                        </div>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        patient.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {patient.status}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Condition</p>
                        <p className="font-medium text-gray-900">{patient.condition}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Visit</p>
                        <p className="font-medium text-gray-900">{patient.lastVisit}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Patient ID: {patient.id}</span>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPatients.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No patients found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientManager; 