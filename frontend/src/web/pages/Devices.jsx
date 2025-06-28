import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const API_URL = 'http://localhost:5000/api/devices';

const Devices = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('devices');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', type: '', status: 'active' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', type: '', status: 'active' });

  const token = Cookies.get('token');

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

  const fetchDevices = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setDevices(data.devices);
      else setError(data.message || 'Failed to fetch devices');
    } catch (err) {
      setError('Failed to fetch devices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setForm({ name: '', type: '', status: 'active' });
        fetchDevices();
      } else {
        setError(data.message || 'Failed to add device');
      }
    } catch (err) {
      setError('Failed to add device');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this device?')) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) fetchDevices();
      else setError(data.message || 'Failed to delete device');
    } catch (err) {
      setError('Failed to delete device');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (device) => {
    setEditId(device.id);
    setEditForm({ name: device.name, type: device.type, status: device.status });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditForm({ name: '', type: '', status: 'active' });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (data.success) {
        cancelEdit();
        fetchDevices();
      } else {
        setError(data.message || 'Failed to update device');
      }
    } catch (err) {
      setError('Failed to update device');
    } finally {
      setLoading(false);
    }
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
              <h1 className="text-2xl font-bold mb-6">Devices</h1>
              {error && <div className="mb-4 p-3 rounded bg-red-100 border border-red-400 text-red-700">{error}</div>}
              <form onSubmit={handleAdd} className="mb-8 flex flex-wrap gap-4 items-end">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Device Name"
                  className="px-4 py-2 rounded border focus:ring-2 outline-none"
                  required
                />
                <input
                  type="text"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  placeholder="Device Type"
                  className="px-4 py-2 rounded border focus:ring-2 outline-none"
                  required
                />
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="px-4 py-2 rounded border focus:ring-2 outline-none"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                >
                  Add Device
                </button>
              </form>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Type</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {devices.map((device) => (
                      <tr key={device.id} className="border-t dark:border-gray-700">
                        <td className="px-4 py-2">
                          {editId === device.id ? (
                            <input
                              type="text"
                              name="name"
                              value={editForm.name}
                              onChange={handleEditChange}
                              className="px-2 py-1 rounded border focus:ring-2 outline-none"
                            />
                          ) : (
                            device.name
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {editId === device.id ? (
                            <input
                              type="text"
                              name="type"
                              value={editForm.type}
                              onChange={handleEditChange}
                              className="px-2 py-1 rounded border focus:ring-2 outline-none"
                            />
                          ) : (
                            device.type
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {editId === device.id ? (
                            <select
                              name="status"
                              value={editForm.status}
                              onChange={handleEditChange}
                              className="px-2 py-1 rounded border focus:ring-2 outline-none"
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          ) : (
                            device.status
                          )}
                        </td>
                        <td className="px-4 py-2 flex gap-2">
                          {editId === device.id ? (
                            <>
                              <button
                                onClick={handleUpdate}
                                className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                                disabled={loading}
                              >
                                Save
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="px-3 py-1 rounded bg-gray-400 text-white hover:bg-gray-500"
                                disabled={loading}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(device)}
                                className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                                disabled={loading}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(device.id)}
                                className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                                disabled={loading}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                    {devices.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center py-4 text-gray-500 dark:text-gray-400">
                          No devices found.
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
  );
};

export default Devices; 