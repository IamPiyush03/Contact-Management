const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Contact = require("./models/Contacts");

console.log("MongoDB URI:", process.env.MONGO_URI);
mongoose.set("debug", true);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error", err));

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});

// Adding a new contact
app.post("/contacts", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).send(newContact);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Retrieving all contacts
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).send(contacts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Updating a contact
app.put("/contacts/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).send("Could not find contact");
    }
    res.status(200).send(updatedContact);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Deleting a contact
app.delete("/contacts/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).send("Could not find contact");
    }
    res.status(200).send({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
