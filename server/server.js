const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const path = require('path');

const app = express();
const PORT = 4000;

// Path to db.json file
const dbFilePath = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to handle booking requests
app.post('/booking', async (req, res) => {
  try {
    const bookingData = req.body;

    // Read existing data from db.json
    const data = await jsonfile.readFile(dbFilePath);

    // Add new booking to the existing data
    data.bookings.push(bookingData);

    // Write updated data back to db.json
    await jsonfile.writeFile(dbFilePath, data, { spaces: 2 });

    res.status(201).send({ message: "Booking saved successfully" });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
});

// Start the server
app.listen(PORT, () => {
 // eslint-disable-next-line no-unused-expressions
 (`Server is running on http://localhost:${PORT}`);
});
