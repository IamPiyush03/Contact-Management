import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton, CircularProgress, Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import ContactForm from "./ContactForm";

const ContactsTable = () => {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditContact = (contact) => {
    setContactToEdit(contact);
  };

  const handleAddContact = () => {
    setContactToEdit(null);
  };

  const handleDeleteContact = async (contactId) => {
    try {
      await axios.delete(`http://localhost:5000/contacts/${contactId}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const refreshTable = () => {
    fetchContacts();
    setOpenSuccessDialog(true);  // Show dialog after successful refresh
  };

  return (
    <div>
      {/* Contact Form Dialog */}
      <ContactForm
        contactToEdit={contactToEdit}
        refreshTable={refreshTable}
        closeDialog={() => setContactToEdit(null)}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#3f51b5", color: "#fff" }}>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              contacts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((contact) => (
                  <TableRow key={contact._id} style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <TableCell style={{ color: 'white' }}>{contact.firstName}</TableCell>
                    <TableCell style={{ color: 'white' }}>{contact.lastName}</TableCell>
                    <TableCell style={{ color: 'white' }}>{contact.email}</TableCell>
                    <TableCell style={{ color: 'white' }}>{contact.phone}</TableCell>
                    <TableCell style={{ color: 'white' }}>{contact.company}</TableCell>
                    <TableCell style={{ color: 'white' }}>{contact.jobTitle}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleEditContact(contact)}
                        color="primary"
                        style={{ marginRight: 8 }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteContact(contact._id)}
                        color="secondary"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          '& .MuiTablePagination-toolbar': {
            color: 'white', // Set text color to white
          }
        }}
      />

      <Dialog
        open={openSuccessDialog}
        onClose={() => setOpenSuccessDialog(false)}
      >
        <DialogTitle>Contact Added/Updated Successfully</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenSuccessDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ContactsTable;
