"use strict";

const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = express();
const port = process.env.PORT || 3000;

// Create a new instance of the MongoDB memory server
const mongod = new MongoMemoryServer();
let server; // Declare server variable

mongod
  .start()
  .then(async () => {
    const mongoUri = mongod.getUri();

    try {
      // Connect to the in-memory MongoDB
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      // Handle MongoDB connection events
      const db = mongoose.connection;

      db.on("error", (err) => {
        console.error("Error connecting to database.", err);
      });

      mongod.once("connected", () => {
        console.log("Database Connection is Successful");
      });

      db.once("disconnected", () => {
        console.info("Database Disconnected");
        server.close(); // Close the server if the database disconnects
      });
    } catch (error) {
      console.error("Error starting the server:", error);
    }
  })
  .catch((error) => {
    console.error("Error starting MongoDB memory server:", error);
  });

app.use(express.json());
// set the view engine to ejs
app.set("view engine", "ejs");

// routes
app.use("/", require("./routes/profile")());

// Export the server object
server = app.listen(port, () => {
  console.log("Express started. Listening on %s", port);
});

module.exports = server; // Export the server object
