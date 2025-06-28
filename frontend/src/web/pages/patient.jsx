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
  HeartIcon
} from '@heroicons/react/24/outline';

const socket = io('http://localhost:5000'); // Adjust if needed

const Patient = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('patients');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', age: '', gender: '', heartRate: '', oxygenSaturation: '', temperature: '' });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 10;

  useEffect(() => {
    socket.on('patients', setPatients);
    socket.on('selectedPatient', setSelected);
    return () => {
      socket.off('patients');
      socket.off('selectedPatient');
    };
  }, []);

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

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = e => {
    e.preventDefault();
    socket.emit('addPatient', form);
    setForm({ name: '', age: '', gender: '', heartRate: '', oxygenSaturation: '', temperature: '' });
    setShowForm(false);
  };

  const handleDelete = id => socket.emit('deletePatient', id);

  const handleEdit = patient => {
    setEditId(patient.id);
    setForm(patient);
    setShowForm(true);
  };

  const handleUpdate = e => {
    e.preventDefault();
    socket.emit('updatePatient', { ...form, id: editId });
    setEditId(null);
    setForm({ name: '', age: '', gender: '', heartRate: '', oxygenSaturation: '', temperature: '' });
    setShowForm(false);
  };

  const handleSelect = id => socket.emit('selectPatient', id);

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
              {/* Header Section with hover effect */}
              <div className={`mb-8 p-6 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-[1.01] ${
                isDarkMode
                  ? 'bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm'
                  : 'bg-white hover:shadow-lg backdrop-blur-sm'
              }`}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Link
                        to="/"
                        className={`text-sm transition-colors duration-300 inline-flex items-center gap-1 group ${
                          isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <ChevronLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Dashboard
                      </Link>
                    </div>
                    <h2 className={`text-2xl md:text-3xl font-bold mb-2 transition-colors duration-300 flex items-center gap-2 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      <UserCircleIcon className="w-8 h-8" />
                      Patients
                    </h2>
                    <p className={`transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
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
                  className="mb-8 flex flex-wrap gap-4 items-end bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
                >
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="px-4 py-2 rounded border focus:ring-2 outline-none"
                    required
                  />
                  <input
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Age"
                    type="number"
                    className="px-4 py-2 rounded border focus:ring-2 outline-none"
                    required
                  />
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="px-4 py-2 rounded border focus:ring-2 outline-none"
                    required
                  >
                    <option value="">Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    name="heartRate"
                    value={form.heartRate}
                    onChange={handleChange}
                    placeholder="Heart Rate"
                    className="px-4 py-2 rounded border focus:ring-2 outline-none"
                  />
                  <input
                    name="oxygenSaturation"
                    value={form.oxygenSaturation}
                    onChange={handleChange}
                    placeholder="Oxygen Saturation"
                    className="px-4 py-2 rounded border focus:ring-2 outline-none"
                  />
                  <input
                    name="temperature"
                    value={form.temperature}
                    onChange={handleChange}
                    placeholder="Temperature"
                    className="px-4 py-2 rounded border focus:ring-2 outline-none"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                  >
                    {editId ? 'Update' : 'Add'} Patient
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 rounded bg-gray-400 text-white font-semibold hover:bg-gray-500 transition"
                    onClick={() => { setShowForm(false); setEditId(null); setForm({ name: '', age: '', gender: '', heartRate: '', oxygenSaturation: '', temperature: '' }); }}
                  >
                    Cancel
                  </button>
                </form>
              )}

              {/* Search and Pagination Controls */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name..."
                  className="px-4 py-2 rounded border focus:ring-2 outline-none w-full md:w-64"
                />
                {totalPages > 1 && (
                  <div className="flex gap-2 items-center justify-end">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
                    >
                      Prev
                    </button>
                    <span className="px-2">Page {currentPage} of {totalPages}</span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>

              {/* Patient List with enhanced styling */}
              <div className={`rounded-lg shadow-sm transition-all duration-300 transform hover:scale-[1.01] ${
                isDarkMode
                  ? 'bg-gray-800/50 backdrop-blur-sm'
                  : 'bg-white backdrop-blur-sm'
              }`}>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`text-left transition-colors duration-300 ${
                        isDarkMode ? 'border-gray-700' : 'border-gray-200'
                      }`}>
                        <th className="px-6 py-4 font-semibold">Patient ID</th>
                        <th className="px-6 py-4 font-semibold">Name</th>
                        <th className="px-6 py-4 font-semibold">Age</th>
                        <th className="px-6 py-4 font-semibold">Gender</th>
                        <th className="px-6 py-4 font-semibold">Heart Rate</th>
                        <th className="px-6 py-4 font-semibold">Oxygen Saturation</th>
                        <th className="px-6 py-4 font-semibold">Temperature</th>
                        <th className="px-6 py-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {paginatedPatients.map((patient) => (
                        <tr key={patient.id} className={`transition-all duration-300 transform hover:scale-[1.01] ${
                          isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                        }${selected === patient.id ? ' bg-indigo-100 dark:bg-indigo-900/30' : ''}` }>
                          <td className="px-6 py-4">{patient.id}</td>
                          <td className="px-6 py-4 flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                            }`}>
                              <UserCircleIcon className="w-6 h-6" />
                            </div>
                            {patient.name}
                          </td>
                          <td className="px-6 py-4">{patient.age}</td>
                          <td className="px-6 py-4">{patient.gender}</td>
                          <td className="px-6 py-4">{patient.heartRate}</td>
                          <td className="px-6 py-4">{patient.oxygenSaturation}</td>
                          <td className="px-6 py-4">{patient.temperature}</td>
                          <td className="px-6 py-4 flex flex-wrap gap-2">
                            <button
                              className={`inline-flex items-center gap-1 transition-colors duration-300 ${
                                isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
                              }`}
                              title="View patient details"
                              onClick={() => handleSelect(patient.id)}
                            >
                              <EyeIcon className="w-4 h-4" />
                              Select
                            </button>
                            <button
                              className={`inline-flex items-center gap-1 transition-colors duration-300 ${
                                isDarkMode ? 'text-yellow-400 hover:text-yellow-300' : 'text-yellow-600 hover:text-yellow-700'
                              }`}
                              title="Edit patient information"
                              onClick={() => handleEdit(patient)}
                            >
                              <PencilSquareIcon className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              className={`inline-flex items-center gap-1 transition-colors duration-300 ${
                                isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
                              }`}
                              title="Delete patient"
                              onClick={() => handleDelete(patient.id)}
                            >
                              <CheckCircleIcon className="w-4 h-4" />
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      {paginatedPatients.length === 0 && (
                        <tr>
                          <td colSpan="8" className="text-center py-4 text-gray-500 dark:text-gray-400">
                            No patients found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;
