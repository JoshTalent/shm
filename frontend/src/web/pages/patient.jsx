import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { io } from 'socket.io-client';
import {
  UserPlusIcon,
  ChevronLeftIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  PencilSquareIcon,
  EyeIcon,
  CheckBadgeIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowPathRoundedSquareIcon,
  HeartIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const socket = io('http://localhost:5000', {
  transports: ['websocket', 'polling'],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
});

const Patient = () => {
  const [activeTab, setActiveTab] = useState('patients');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', age: '', gender: '', heartRate: '', oxygenSaturation: '', temperature: '' });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const patientsPerPage = 10;

  // Initialize socket connection and load initial data
  useEffect(() => {
    // Set up socket event listeners
    const handleConnect = () => {
      console.log('Connected to server');
      setIsConnected(true);
      setError('');
      // Request initial patients data
      socket.emit('getPatients');
    };

    const handleDisconnect = () => {
      console.log('Disconnected from server');
      setIsConnected(false);
      setError('Connection lost. Trying to reconnect...');
    };

    const handlePatientsData = (data) => {
      console.log('Received patients data:', data);
      setPatients(Array.isArray(data) ? data : []);
      setIsLoading(false);
      setError('');
    };

    const handlePatientUpdate = (updatedPatient) => {
      setPatients(prevPatients => {
        const index = prevPatients.findIndex(p => p.id === updatedPatient.id);
        if (index !== -1) {
          const newPatients = [...prevPatients];
          newPatients[index] = updatedPatient;
          return newPatients;
        }
        return prevPatients;
      });
    };

    const handlePatientAdd = (newPatient) => {
      setPatients(prevPatients => [...prevPatients, newPatient]);
    };

    const handlePatientDelete = (deletedId) => {
      setPatients(prevPatients => prevPatients.filter(p => p.id !== deletedId));
    };

    const handleError = (error) => {
      console.error('Socket error:', error);
      setError('Connection error. Please check your connection.');
      setIsLoading(false);
    };

    // Connect socket event listeners
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('patients', handlePatientsData);
    socket.on('patientUpdated', handlePatientUpdate);
    socket.on('patientAdded', handlePatientAdd);
    socket.on('patientDeleted', handlePatientDelete);
    socket.on('error', handleError);

    // If already connected, request data immediately
    if (socket.connected) {
      setIsConnected(true);
      socket.emit('getPatients');
    }

    // Cleanup function
    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('patients', handlePatientsData);
      socket.off('patientUpdated', handlePatientUpdate);
      socket.off('patientAdded', handlePatientAdd);
      socket.off('patientDeleted', handlePatientDelete);
      socket.off('error', handleError);
    };
  }, []);

  // Load initial data if not connected via socket
  useEffect(() => {
    if (!isConnected && !isLoading) {
      // Fallback: load mock data or make HTTP request
      const loadInitialData = async () => {
        try {
          // You can replace this with an actual API call
          const mockPatients = [
            {
              id: 1,
              name: 'John Doe',
              age: 45,
              gender: 'Male',
              heartRate: 72,
              oxygenSaturation: 98,
              temperature: 36.8
            },
            {
              id: 2,
              name: 'Jane Smith',
              age: 32,
              gender: 'Female',
              heartRate: 68,
              oxygenSaturation: 99,
              temperature: 36.5
            },
            {
              id: 3,
              name: 'Mike Johnson',
              age: 58,
              gender: 'Male',
              heartRate: 75,
              oxygenSaturation: 97,
              temperature: 37.1
            }
          ];
          setPatients(mockPatients);
          setIsLoading(false);
        } catch (error) {
          console.error('Error loading initial data:', error);
          setError('Failed to load patients data');
          setIsLoading(false);
        }
      };

      loadInitialData();
    }
  }, [isConnected, isLoading]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = e => {
    e.preventDefault();
    if (isConnected) {
      socket.emit('addPatient', form);
    } else {
      // Fallback: add to local state
      const newPatient = {
        id: Date.now(),
        ...form
      };
      setPatients(prev => [...prev, newPatient]);
    }
    setForm({ name: '', age: '', gender: '', heartRate: '', oxygenSaturation: '', temperature: '' });
    setShowForm(false);
  };

  const handleDelete = id => {
    if (isConnected) {
      socket.emit('deletePatient', id);
    } else {
      // Fallback: remove from local state
      setPatients(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleEdit = patient => {
    setEditId(patient.id);
    setForm(patient);
    setShowForm(true);
  };

  const handleUpdate = e => {
    e.preventDefault();
    if (isConnected) {
      socket.emit('updatePatient', { ...form, id: editId });
    } else {
      // Fallback: update local state
      setPatients(prev => prev.map(p => p.id === editId ? { ...p, ...form } : p));
    }
    setEditId(null);
    setForm({ name: '', age: '', gender: '', heartRate: '', oxygenSaturation: '', temperature: '' });
    setShowForm(false);
  };

  const handleSelect = id => {
    if (isConnected) {
      socket.emit('selectPatient', id);
    }
    setSelected(id);
  };

  // Filtered and paginated patients
  const filteredPatients = patients.filter(p => {
    const searchStr = search.toLowerCase();
    return (
      (p.id && String(p.id).toLowerCase().includes(searchStr)) ||
      (p.name && p.name.toLowerCase().includes(searchStr)) ||
      (p.age && String(p.age).toLowerCase().includes(searchStr)) ||
      (p.gender && p.gender.toLowerCase().includes(searchStr)) ||
      (p.heartRate && String(p.heartRate).toLowerCase().includes(searchStr)) ||
      (p.oxygenSaturation && String(p.oxygenSaturation).toLowerCase().includes(searchStr)) ||
      (p.temperature && String(p.temperature).toLowerCase().includes(searchStr))
    );
  });
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * patientsPerPage,
    currentPage * patientsPerPage
  );

  // Reset to first page on search
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

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

          {/* Main Content with fade-in animation */}
          <div className="p-4 lg:ml-64 pt-20 transition-all duration-500 animate-fadeIn">
            <div className="p-4 rounded-lg">
              {/* Connection Status */}
              <div className="mb-4 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
                {error && (
                  <span className="text-sm text-red-600 ml-2">{error}</span>
                )}
              </div>

              {/* Header Section with hover effect */}
              <div className="mb-8 p-6 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-[1.01] bg-white hover:shadow-lg backdrop-blur-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Link
                        to="/"
                        className="text-sm transition-colors duration-300 inline-flex items-center gap-1 group text-gray-600 hover:text-gray-900"
                      >
                        <ChevronLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Dashboard
                      </Link>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 transition-colors duration-300 flex items-center gap-2 text-gray-900">
                      <UserCircleIcon className="w-8 h-8" />
                      Patients
                    </h2>
                    <p className="transition-colors duration-300 text-gray-600">
                      Manage and view patient information
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg inline-flex items-center gap-2"
                    onClick={() => {
                      setShowForm(true);
                      setEditId(null);
                      setForm({ name: '', age: '', gender: '', heartRate: '', oxygenSaturation: '', temperature: '' });
                    }}
                  >
                    <UserPlusIcon className="w-5 h-5" />
                    Add New Patient
                  </button>
                </div>
              </div>

              {/* Add/Edit Patient Form */}
              {showForm && (
                <form
                  onSubmit={editId ? handleUpdate : handleAdd}
                  className="mb-8 flex flex-wrap gap-4 items-end bg-white p-4 rounded-lg shadow"
                >
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Patient Name"
                    className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                    required
                  />
                  <input
                    name="age"
                    type="number"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Age"
                    className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                    required
                  />
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    name="heartRate"
                    type="number"
                    value={form.heartRate}
                    onChange={handleChange}
                    placeholder="Heart Rate (bpm)"
                    className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                  />
                  <input
                    name="oxygenSaturation"
                    type="number"
                    value={form.oxygenSaturation}
                    onChange={handleChange}
                    placeholder="Oxygen Saturation (%)"
                    className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                  />
                  <input
                    name="temperature"
                    type="number"
                    step="0.1"
                    value={form.temperature}
                    onChange={handleChange}
                    placeholder="Temperature (°C)"
                    className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-300"
                  >
                    {editId ? 'Update' : 'Add'} Patient
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditId(null);
                      setForm({ name: '', age: '', gender: '', heartRate: '', oxygenSaturation: '', temperature: '' });
                    }}
                    className="px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </form>
              )}

              {/* Search Bar */}
              <div className="mb-6">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search patients..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Patients Table */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heart Rate</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Oxygen</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {isLoading ? (
                        <tr>
                          <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                            <div className="flex items-center justify-center gap-2">
                              <ArrowPathRoundedSquareIcon className="w-5 h-5 animate-spin" />
                              Loading patients...
                            </div>
                          </td>
                        </tr>
                      ) : paginatedPatients.length > 0 ? (
                        paginatedPatients.map((patient) => (
                          <tr 
                            key={patient.id} 
                            className={`hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${
                              selected === patient.id ? ' bg-indigo-100' : ''
                            }`}
                            onClick={() => handleSelect(patient.id)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.age}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.gender}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.heartRate} bpm</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.oxygenSaturation}%</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.temperature}°C</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(patient);
                                  }}
                                  className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                                >
                                  <PencilSquareIcon className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (window.confirm('Are you sure you want to delete this patient?')) {
                                      handleDelete(patient.id);
                                    }
                                  }}
                                  className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                >
                                  <TrashIcon className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                            No patients found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <nav className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          currentPage === page
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;
