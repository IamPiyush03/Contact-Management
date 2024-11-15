import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Box, Typography, Divider } from "@mui/material";
import axios from "axios";

const ContactForm = ({ contactToEdit, refreshTable, closeDialog }) => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
  });

  useEffect(() => {
    if (contactToEdit) {
      setContact(contactToEdit);
    } else {
      setContact({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: "",
      });
    }
  }, [contactToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contact.firstName || !contact.lastName || !contact.email || !contact.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      if (contactToEdit) {
        await axios.put(`http://localhost:5000/contacts/${contactToEdit._id}`, contact);
      } else {
        await axios.post("http://localhost:5000/contacts", contact);
      }
      refreshTable();
      setContact({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: "",
      });
      closeDialog();
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: 3,
      }}
    >
      <Divider sx={{ margin: "20px 0" }} />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="firstName"
              label="First Name"
              variant="outlined"
              value={contact.firstName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="lastName"
              label="Last Name"
              variant="outlined"
              value={contact.lastName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              variant="outlined"
              value={contact.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="company"
              label="Company Name"
              variant="outlined"
              value={contact.company}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="phone"
              label="Phone"
              variant="outlined"
              value={contact.phone}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="jobTitle"
              label="Job Title"
              variant="outlined"
              value={contact.jobTitle}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {contactToEdit ? "Update" : "Add Contact"}
            </Button>
          </Grid>
        </Grid>
      </form>
      
    </Box>
  );
};

export default ContactForm;