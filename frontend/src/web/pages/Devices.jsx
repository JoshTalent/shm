import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {
  DevicePhoneMobileIcon,
  WifiIcon,
  SignalIcon,
  Battery100Icon,
  Battery50Icon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:5000/api';

const Devices = () => {
  const [activeTab, setActiveTab] = useState('devices');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    status: 'active'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = Cookies.get('token');

  // Fetch devices from API
  const fetchDevices = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/devices`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch devices');
      }

      const data = await response.json();
      if (data.success) {
        setDevices(data.devices);
      } else {
        setError(data.message || 'Failed to fetch devices');
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
      setError('Failed to fetch devices. Using demo data.');
      // Fallback to demo data
      setDevices([
        {
          id: 1,
          name: 'Patient Monitor 001',
          type: 'Vital Signs Monitor',
          status: 'online',
          battery: 85,
          signal: 'strong',
          lastSeen: '2 minutes ago',
          patient: 'John Doe'
        },
        {
          id: 2,
          name: 'ECG Device 002',
          type: 'Electrocardiogram',
          status: 'offline',
          battery: 45,
          signal: 'weak',
          lastSeen: '15 minutes ago',
          patient: 'Jane Smith'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  // Add new device
  const handleAddDevice = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');

      const response = await fetch(`${API_BASE_URL}/devices`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Device added successfully!');
        setFormData({ name: '', type: '', status: 'active' });
        setShowAddForm(false);
        fetchDevices(); // Refresh the list
      } else {
        setError(data.message || 'Failed to add device');
      }
    } catch (error) {
      console.error('Error adding device:', error);
      setError('Failed to add device. Please try again.');
    }
  };

  // Update device
  const handleUpdateDevice = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');

      const response = await fetch(`${API_BASE_URL}/devices/${editingDevice.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Device updated successfully!');
        setFormData({ name: '', type: '', status: 'active' });
        setEditingDevice(null);
        fetchDevices(); // Refresh the list
      } else {
        setError(data.message || 'Failed to update device');
      }
    } catch (error) {
      console.error('Error updating device:', error);
      setError('Failed to update device. Please try again.');
    }
  };

  // Delete device
  const handleDeleteDevice = async (deviceId) => {
    if (!window.confirm('Are you sure you want to delete this device?')) {
      return;
    }

    try {
      setError('');
      setSuccess('');

      const response = await fetch(`${API_BASE_URL}/devices/${deviceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Device deleted successfully!');
        fetchDevices(); // Refresh the list
      } else {
        setError(data.message || 'Failed to delete device');
      }
    } catch (error) {
      console.error('Error deleting device:', error);
      setError('Failed to delete device. Please try again.');
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Start editing a device
  const startEdit = (device) => {
    setEditingDevice(device);
    setFormData({
      name: device.name,
      type: device.type,
      status: device.status
    });
    setShowAddForm(true);
  };

  // Cancel form
  const cancelForm = () => {
    setShowAddForm(false);
    setEditingDevice(null);
    setFormData({ name: '', type: '', status: 'active' });
    setError('');
    setSuccess('');
  };

  const getBatteryIcon = (level) => {
    if (level > 75) return <Battery100Icon className="w-5 h-5 text-green-600" />;
    if (level > 50) return <Battery50Icon className="w-5 h-5 text-yellow-600" />;
    return <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
      case 'active':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'offline':
      case 'inactive':
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />;
      case 'maintenance':
        return <ClockIcon className="w-5 h-5 text-yellow-600" />;
      default:
        return <ExclamationTriangleIcon className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'offline':
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

          {/* Main Content */}
          <div className="p-4 lg:ml-64 pt-20 transition-all duration-500 animate-fadeIn">
            <div className="p-4 rounded-lg">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold mb-2 text-gray-900">
                  Device Management
                </h1>
                <p className="text-gray-600">
                  Monitor and manage all connected medical devices
                </p>
              </div>

              {/* Error and Success Messages */}
              {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  {success}
                </div>
              )}

              {/* Add Device Button */}
              <div className="mb-6">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                  <PlusIcon className="w-5 h-5" />
                  Add New Device
                </button>
              </div>

              {/* Add/Edit Device Form */}
              {showAddForm && (
                <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {editingDevice ? 'Edit Device' : 'Add New Device'}
                    </h2>
                    <button
                      onClick={cancelForm}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <form onSubmit={editingDevice ? handleUpdateDevice : handleAddDevice} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Device Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter device name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                          Device Type *
                        </label>
                        <input
                          type="text"
                          id="type"
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Enter device type"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                      >
                        {editingDevice ? 'Update Device' : 'Add Device'}
                      </button>
                      <button
                        type="button"
                        onClick={cancelForm}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Devices</p>
                      <p className="text-2xl font-bold text-gray-900">{devices.length}</p>
                    </div>
                    <DevicePhoneMobileIcon className="w-8 h-8 text-indigo-600" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active</p>
                      <p className="text-2xl font-bold text-green-600">
                        {devices.filter(d => d.status === 'active' || d.status === 'online').length}
                      </p>
                    </div>
                    <CheckCircleIcon className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Inactive</p>
                      <p className="text-2xl font-bold text-red-600">
                        {devices.filter(d => d.status === 'inactive' || d.status === 'offline').length}
                      </p>
                    </div>
                    <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Maintenance</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {devices.filter(d => d.status === 'maintenance').length}
                      </p>
                    </div>
                    <ClockIcon className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
              </div>

              {/* Devices Table */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Connected Devices</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded shadow">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Device
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Battery
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Signal
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Patient
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Seen
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {devices.map((device) => (
                        <tr key={device.id} className="border-t border-gray-200">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                                  <DevicePhoneMobileIcon className="w-6 h-6 text-indigo-600" />
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{device.name}</div>
                                <div className="text-sm text-gray-500">{device.type}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getStatusIcon(device.status)}
                              <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(device.status)}`}>
                                {device.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {device.battery ? getBatteryIcon(device.battery) : <span className="text-gray-400">N/A</span>}
                              {device.battery && <span className="ml-2 text-sm text-gray-900">{device.battery}%</span>}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <SignalIcon className="w-5 h-5 text-gray-600" />
                              <span className="ml-2 text-sm text-gray-900 capitalize">{device.signal || 'N/A'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {device.patient || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {device.lastSeen || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => startEdit(device)}
                                className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                                title="Edit device"
                              >
                                <PencilIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteDevice(device.id)}
                                className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                title="Delete device"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {devices.length === 0 && !isLoading && (
                  <div className="text-center py-8 text-gray-500">
                    No devices found
                  </div>
                )}
                {isLoading && (
                  <div className="text-center py-8 text-gray-500">
                    Loading devices...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devices; 