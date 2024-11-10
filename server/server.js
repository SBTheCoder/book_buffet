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

// Helper function to get the next ID
const getNextId = (bookings) => {
  // Filter out bookings without an `id` and find the max existing ID
  const ids = bookings.map(b => b.id).filter(id => id !== undefined);
  const highestId = ids.length > 0 ? Math.max(...ids) : 100;
  return highestId + 1;
};

// Endpoint to handle booking requests
app.post('/booking', async (req, res) => {
  try {
    const bookingData = req.body;

    // Read existing data from db.json
    const data = await jsonfile.readFile(dbFilePath);

    // Generate and assign the next unique ID
    bookingData.id = getNextId(data.bookings);

    // Add new booking with the unique ID to the existing data
    data.bookings.push(bookingData);

    // Write updated data with IDs back to db.json
    await jsonfile.writeFile(dbFilePath, data, { spaces: 2 });

    res.status(201).send({ message: "Booking saved successfully", id: bookingData.id });

  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
});


app.get('/bookings/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;
    const data = await jsonfile.readFile(dbFilePath);

    // Find booking by ID
    const booking = data.bookings.find((b) => b.id === parseInt(bookingId));

    if (booking) {
      res.status(200).send(booking);
    } else {
      res.status(404).send({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
});
// DELETE endpoint to delete a booking by ID
app.delete('/bookings/:id', async (req, res) => {
  try {
      const bookingId = parseInt(req.params.id);
      const data = await jsonfile.readFile(dbFilePath);

      // Filter out the booking with the specified ID
      const updatedBookings = data.bookings.filter((b) => b.id !== bookingId);

      if (updatedBookings.length === data.bookings.length) {
          return res.status(404).send({ message: "Booking not found" });
      }

      data.bookings = updatedBookings;
      await jsonfile.writeFile(dbFilePath, data, { spaces: 2 });

      res.status(200).send({ message: "Booking deleted successfully" });
  } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
  }
});

// PUT endpoint to update a booking by ID
app.put('/bookings/:id', async (req, res) => {
  try {
      const bookingId = parseInt(req.params.id);
      const updatedData = req.body;
      const data = await jsonfile.readFile(dbFilePath);

      const bookingIndex = data.bookings.findIndex((b) => b.id === bookingId);
      if (bookingIndex === -1) {
          return res.status(404).send({ message: "Booking not found" });
      }

      data.bookings[bookingIndex] = { ...data.bookings[bookingIndex], ...updatedData };
      await jsonfile.writeFile(dbFilePath, data, { spaces: 2 });

      res.status(200).send({ message: "Booking updated successfully" });
  } catch (error) {
      res.status(500).send({ message: "Something went wrong" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});