import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Adjust if needed

const PatientManager = () => {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name: '', age: '', gender: '', heartRate: '', oxygenSaturation: '', temperature: '' });
  const [selected, setSelected] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    socket.on('patients', setPatients);
    socket.on('selectedPatient', setSelected);
    return () => {
      socket.off('patients');
      socket.off('selectedPatient');
    };
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = e => {
    e.preventDefault();
    socket.emit('addPatient', form);
    setForm({ name: '', age: '', gender: '', heartRate: '', oxygenSaturation: '', temperature: '' });
  };

  const handleDelete = id => socket.emit('deletePatient', id);

  const handleEdit = patient => {
    setEditId(patient.id);
    setForm(patient);
  };

  const handleUpdate = e => {
    e.preventDefault();
    socket.emit('updatePatient', { ...form, id: editId });
    setEditId(null);
    setForm({ name: '', age: '', gender: '', heartRate: '', oxygenSaturation: '', temperature: '' });
  };

  const handleSelect = id => socket.emit('selectPatient', id);

  return (
    <div>
      <h2>Patients</h2>
      <form onSubmit={editId ? handleUpdate : handleAdd}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="age" value={form.age} onChange={handleChange} placeholder="Age" required />
        <input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" required />
        <input name="heartRate" value={form.heartRate} onChange={handleChange} placeholder="Heart Rate" />
        <input name="oxygenSaturation" value={form.oxygenSaturation} onChange={handleChange} placeholder="Oxygen Saturation" />
        <input name="temperature" value={form.temperature} onChange={handleChange} placeholder="Temperature" />
        <button type="submit">{editId ? 'Update' : 'Add'} Patient</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ name: '', age: '', gender: '', heartRate: '', oxygenSaturation: '', temperature: '' }); }}>Cancel</button>}
      </form>
      <ul>
        {patients.map(p => (
          <li key={p.id} style={{ background: selected === p.id ? '#eef' : 'transparent' }}>
            {p.name} ({p.age}, {p.gender}) | HR: {p.heartRate} | O2: {p.oxygenSaturation} | Temp: {p.temperature}
            <button onClick={() => handleDelete(p.id)}>Delete</button>
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleSelect(p.id)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientManager; 