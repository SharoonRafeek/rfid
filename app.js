const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const port = 3000;

app.use(bodyParser.json());
dotenv.config();

mongoose.connect(
  `mongodb+srv://${process.env.USERNAME1}:${process.env.PASSWORD}@cluster0.pwz8cgk.mongodb.net/rfiddb`
);

const rfidSchema = new mongoose.Schema({
  rfid: String,
});

const RFID = mongoose.model("RFID", rfidSchema);

app.post("/rfid", (req, res) => {
  const rfidData = req.body.rfid;

  const newRFID = new RFID({ rfid: rfidData });
  newRFID
    .save()
    .then(() => {
      res.status(200).send("RFID data saved successfully");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving RFID data");
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
