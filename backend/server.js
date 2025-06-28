require('dotenv').config();
const app = require('./app');
const { PORT } = require('./config/app.config');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });

const db = require('./models/db'); // Adjust path if needed

// Helper: emit all patients to all clients
const emitAllPatients = async () => {
  const [patients] = await db.execute('SELECT * FROM patients');
  io.emit('patients', patients);
};

io.on('connection', (socket) => {
  // Send all patients on connect
  emitAllPatients();

  // Add patient
  socket.on('addPatient', async (patient) => {
    await db.execute(
      'INSERT INTO patients (name, age, gender, heartRate, oxygenSaturation, temperature) VALUES (?, ?, ?, ?, ?, ?)',
      [patient.name, patient.age, patient.gender, patient.heartRate, patient.oxygenSaturation, patient.temperature]
    );
    emitAllPatients();
  });

  // Delete patient
  socket.on('deletePatient', async (id) => {
    await db.execute('DELETE FROM patients WHERE id = ?', [id]);
    emitAllPatients();
  });

  // Update patient
  socket.on('updatePatient', async (updatedPatient) => {
    await db.execute(
      'UPDATE patients SET name=?, age=?, gender=?, heartRate=?, oxygenSaturation=?, temperature=? WHERE id=?',
      [
        updatedPatient.name,
        updatedPatient.age,
        updatedPatient.gender,
        updatedPatient.heartRate,
        updatedPatient.oxygenSaturation,
        updatedPatient.temperature,
        updatedPatient.id
      ]
    );
    emitAllPatients();
  });

  // Select patient (broadcast selected id)
  socket.on('selectPatient', (id) => {
    io.emit('selectedPatient', id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 