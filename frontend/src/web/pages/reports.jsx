import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {
  ArrowDownTrayIcon,
  EyeIcon,
  CheckBadgeIcon,
  ClockIcon,
  ChartBarIcon,
  BanknotesIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline';

const socket = io('http://localhost:5000'); // Adjust if needed

// Simulated reports for demo; in real app, fetch from backend by patientId
const allReports = [
  {
    id: 'R001',
    title: 'Monthly Patient Statistics',
    date: '2024-02-01',
    type: 'Analytics',
    status: 'Generated',
    icon: ChartBarIcon,
    patientId: 1
  },
  {
    id: 'R002',
    title: 'Treatment Success Rate',
    date: '2024-02-15',
    type: 'Performance',
    status: 'Pending',
    icon: PresentationChartLineIcon,
    patientId: 2
  },
  {
    id: 'R003',
    title: 'Revenue Analysis',
    date: '2024-02-20',
    type: 'Financial',
    status: 'Generated',
    icon: BanknotesIcon,
    patientId: 1
  }
];

const Reports = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('reports');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    socket.on('patients', setPatients);
    return () => socket.off('patients');
  }, []);

  useEffect(() => {
    if (selectedPatient) {
      setReports(allReports.filter(r => String(r.patientId) === String(selectedPatient.id)));
    } else {
      setReports([]);
    }
  }, [selectedPatient]);

  const filteredPatients = patients.filter(p =>
    Object.values(p).join(' ').toLowerCase().includes(search.toLowerCase())
  );

  // Simulate download for demo
  const handleDownload = (report, format) => {
    alert(`Download ${report.title} as ${format.toUpperCase()}`);
    // In real app, use: window.open(`/api/reports/download/${report.id}?format=${format}`)
  };

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
            toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
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
              {/* Patient Search and Select */}
              <div className="mb-6">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search patients..."
                  className="px-4 py-2 rounded border focus:ring-2 outline-none w-full md:w-64"
                />
                <ul className="mt-2 max-h-40 overflow-y-auto">
                  {filteredPatients.map(p => (
                    <li
                      key={p.id}
                      className={`p-2 cursor-pointer rounded ${selectedPatient?.id === p.id ? 'bg-indigo-100 dark:bg-indigo-900/30' : ''}`}
                      onClick={() => setSelectedPatient(p)}
                    >
                      {p.name} ({p.gender}, {p.age})
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reports Table */}
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
                        <th className="px-6 py-4 font-semibold">Report ID</th>
                        <th className="px-6 py-4 font-semibold">Title</th>
                        <th className="px-6 py-4 font-semibold">Date</th>
                        <th className="px-6 py-4 font-semibold">Type</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {reports.map((report) => {
                        const Icon = report.icon;
                        return (
                          <tr key={report.id} className={`transition-all duration-300 transform hover:scale-[1.01] ${
                            isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                          }`}>
                            <td className="px-6 py-4">{report.id}</td>
                            <td className="px-6 py-4 flex items-center gap-2">
                              <div className={`p-2 rounded-lg ${
                                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                              }`}>
                                <Icon className={`w-5 h-5 ${
                                  isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                                }`} />
                              </div>
                              {report.title}
                            </td>
                            <td className="px-6 py-4">{report.date}</td>
                            <td className="px-6 py-4">{report.type}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                                report.status === 'Generated'
                                  ? isDarkMode
                                    ? 'bg-green-900/50 text-green-300'
                                    : 'bg-green-100 text-green-800'
                                  : isDarkMode
                                    ? 'bg-yellow-900/50 text-yellow-300'
                                    : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {report.status === 'Generated' ? (
                                  <CheckBadgeIcon className="w-4 h-4" />
                                ) : (
                                  <ClockIcon className="w-4 h-4" />
                                )}
                                {report.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <button
                                  className="inline-flex items-center gap-1 transition-colors duration-300 group"
                                  onClick={() => handleDownload(report, 'pdf')}
                                >
                                  <ArrowDownTrayIcon className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                                  PDF
                                </button>
                                <button
                                  className="inline-flex items-center gap-1 transition-colors duration-300 group"
                                  onClick={() => handleDownload(report, 'excel')}
                                >
                                  <ArrowDownTrayIcon className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                                  Excel
                                </button>
                                <button
                                  className="inline-flex items-center gap-1 transition-colors duration-300 group"
                                  onClick={() => handleDownload(report, 'docx')}
                                >
                                  <ArrowDownTrayIcon className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                                  DOCX
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {reports.length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-center py-4 text-gray-500 dark:text-gray-400">
                            {selectedPatient ? 'No reports for this patient.' : 'Select a patient to view reports.'}
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

export default Reports;
