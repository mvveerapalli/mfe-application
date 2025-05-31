
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const PORT = 4000;

// const VALID_TOKEN = 'Bearer mysecrettoken123';
// let daylightSavings = true; // 🔧 In-memory toggle state

// // Enable CORS for Angular (localhost:4200)
// app.use(cors({ origin: 'http://localhost:4200' }));
// app.use(express.json());

// // 🔐 Middleware for token validation
// function authenticate(req, res, next) {
//   const token = req.headers['authorization'];
//   if (token === VALID_TOKEN) {
//     next();
//   } else {
//     res.status(401).json({ error: 'Unauthorized' });
//   }
// }

// // ✅ DEALER INFO (GET)
// app.get('/servicedashboard/remoteIn/dealer/info', authenticate, (req, res) => {
//   res.json({
//     id: "b11464",
//     phone: "1(987) 654-3210",
//     name: "Shumate Mechanical LLC Residential",
//     email: "example123@mail.completeemailid",
//     website: "https://www.shumatemechanical.com",
//     address: {
//       address1: "9528",
//       address2: "25 Hwy",
//       city: "Halton Hills",
//       state: "ON",
//       zip: "K1A 0B1"
//     }
//   });
// });

// // ✅ GENERAL INFO (GET)
// app.get('/servicedashboard/remoteIn/general/info', authenticate, (req, res) => {
//   res.json({
//     language: "English",
//     region: "United States",
//     time: "4:18pm",
//     date: "Apr 28, 2025",
//     timezone: "Central",
//     daylightSavings,
//     temperatureUnit: "Celsius °C"
//   });
// });

// // ✅ UPDATE Daylight Savings (POST)
// app.post('/servicedashboard/remoteIn/general/daylight', authenticate, (req, res) => {
//   const { daylightSavings: newValue } = req.body;

//   if (typeof newValue === 'boolean') {
//     daylightSavings = newValue;
//     return res.json({ status: 'success', updatedValue: daylightSavings });
//   } else {
//     return res.status(400).json({ error: 'Invalid value. Expecting boolean.' });
//   }
// });

// // ✅ START API SERVER
// app.listen(PORT, () => {
//   console.log(`API running at http://localhost:${PORT}/servicedashboard/remoteIn`);
// });
