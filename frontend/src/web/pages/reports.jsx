import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {
  ArrowDownTrayIcon,
  CheckBadgeIcon,
  ClockIcon,
  ChartBarIcon,
  BanknotesIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline';

// Socket connection with error handling
let socket;
try {
  socket = io('http://localhost:5000', {
    timeout: 5000,
    reconnection: true,
    reconnectionAttempts: 3
  });
} catch (error) {
  console.error('Socket connection failed:', error);
  socket = null;
}

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
  const [activeTab, setActiveTab] = useState('reports');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (socket) {
      setIsLoading(true);
      setError(null);
      
      socket.on('patients', (data) => {
        setPatients(data);
        setIsLoading(false);
      });
      
      socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        setError('Failed to connect to server. Using demo data.');
        setIsLoading(false);
        // Use demo data if socket fails
        setPatients([
          { id: 1, name: 'John Doe', gender: 'Male', age: 45 },
          { id: 2, name: 'Jane Smith', gender: 'Female', age: 32 },
          { id: 3, name: 'Mike Johnson', gender: 'Male', age: 28 }
        ]);
      });

      return () => {
        socket.off('patients');
        socket.off('connect_error');
      };
    } else {
      // Fallback demo data if socket is not available
      setPatients([
        { id: 1, name: 'John Doe', gender: 'Male', age: 45 },
        { id: 2, name: 'Jane Smith', gender: 'Female', age: 32 },
        { id: 3, name: 'Mike Johnson', gender: 'Male', age: 28 }
      ]);
    }
  }, []);

  useEffect(() => {
    if (selectedPatient) {
      // Ensure consistent data type comparison
      const patientId = parseInt(selectedPatient.id);
      setReports(allReports.filter(r => parseInt(r.patientId) === patientId));
    } else {
      setReports([]);
    }
  }, [selectedPatient]);

  const filteredPatients = patients.filter(p =>
    Object.values(p).join(' ').toLowerCase().includes(search.toLowerCase())
  );

  // Simulate download for demo
  const handleDownload = (report, format) => {
    try {
      alert(`Download ${report.title} as ${format.toUpperCase()}`);
      // In real app, use: window.open(`/api/reports/download/${report.id}?format=${format}`)
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

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
              {/* Error Message */}
              {error && (
                <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* Patient Search and Select */}
              <div className="mb-6">
                <label htmlFor="patient-search" className="block text-sm font-medium mb-2">
                  Search Patients
                </label>
                <input
                  id="patient-search"
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search patients..."
                  className="px-4 py-2 rounded border focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64 transition-all duration-300"
                  aria-label="Search patients"
                />
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="mt-2 text-sm text-gray-500">
                    Loading patients...
                  </div>
                )}

                {/* Patient list */}
                {!isLoading && (
                  <ul className="mt-2 max-h-40 overflow-y-auto border rounded-lg">
                    {filteredPatients.map(p => (
                      <li
                        key={p.id}
                        className={`p-2 cursor-pointer rounded transition-colors duration-200 ${
                          selectedPatient?.id === p.id 
                            ? 'bg-indigo-100' 
                            : 'hover:bg-gray-100'
                        }`}
                        onClick={() => setSelectedPatient(p)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setSelectedPatient(p);
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label={`Select patient ${p.name}`}
                      >
                        {p.name} ({p.gender}, {p.age})
                      </li>
                    ))}
                    {filteredPatients.length === 0 && (
                      <li className="p-2 text-gray-500 text-center">
                        No patients found
                      </li>
                    )}
                  </ul>
                )}
              </div>

              {/* Reports Table */}
              <div className="rounded-lg shadow-sm transition-all duration-300 transform hover:scale-[1.01] bg-white backdrop-blur-sm">
                <div className="overflow-x-auto">
                  <table className="w-full" role="table" aria-label="Reports table">
                    <thead>
                      <tr className="text-left transition-colors duration-300 border-gray-200">
                        <th className="px-6 py-4 font-semibold" scope="col">Report ID</th>
                        <th className="px-6 py-4 font-semibold" scope="col">Title</th>
                        <th className="px-6 py-4 font-semibold" scope="col">Date</th>
                        <th className="px-6 py-4 font-semibold" scope="col">Type</th>
                        <th className="px-6 py-4 font-semibold" scope="col">Status</th>
                        <th className="px-6 py-4 font-semibold" scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {reports.map((report) => {
                        const Icon = report.icon;
                        return (
                          <tr key={report.id} className="transition-all duration-300 transform hover:scale-[1.01] hover:bg-gray-50">
                            <td className="px-6 py-4">{report.id}</td>
                            <td className="px-6 py-4 flex items-center gap-2">
                              <div className="p-2 rounded-lg bg-gray-100">
                                <Icon className="w-5 h-5 text-indigo-600" aria-hidden="true" />
                              </div>
                              {report.title}
                            </td>
                            <td className="px-6 py-4">{report.date}</td>
                            <td className="px-6 py-4">{report.type}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                                report.status === 'Generated'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {report.status === 'Generated' ? (
                                  <CheckBadgeIcon className="w-4 h-4" aria-hidden="true" />
                                ) : (
                                  <ClockIcon className="w-4 h-4" aria-hidden="true" />
                                )}
                                {report.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <button
                                  className="inline-flex items-center gap-1 transition-colors duration-300 group hover:text-indigo-600"
                                  onClick={() => handleDownload(report, 'pdf')}
                                  aria-label={`Download ${report.title} as PDF`}
                                >
                                  <ArrowDownTrayIcon className="w-4 h-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                                  PDF
                                </button>
                                <button
                                  className="inline-flex items-center gap-1 transition-colors duration-300 group hover:text-indigo-600"
                                  onClick={() => handleDownload(report, 'excel')}
                                  aria-label={`Download ${report.title} as Excel`}
                                >
                                  <ArrowDownTrayIcon className="w-4 h-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                                  Excel
                                </button>
                                <button
                                  className="inline-flex items-center gap-1 transition-colors duration-300 group hover:text-indigo-600"
                                  onClick={() => handleDownload(report, 'docx')}
                                  aria-label={`Download ${report.title} as DOCX`}
                                >
                                  <ArrowDownTrayIcon className="w-4 h-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                                  DOCX
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {reports.length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-center py-8 text-gray-500">
                            {selectedPatient ? 'No reports available for this patient.' : 'Please select a patient to view their reports.'}
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
