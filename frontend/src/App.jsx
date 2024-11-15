import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';  // Assuming you have this component in a separate file
import ContactsTable from './components/ContactsTable'; // Assuming you have this component in a separate file
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contacts from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/contacts')
      .then((response) => response.json())
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching contacts:', error);
        setLoading(false);
      });
  }, []);

  // Add a new contact
  const addContact = (newContact) => {
    fetch('http://localhost:5000/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })
      .then((response) => response.json())
      .then((data) => {
        setContacts([...contacts, data]);  // Add the new contact to the list
      })
      .catch((error) => {
        console.error('Error adding contact:', error);
      });
  };

  // Delete a contact
  const deleteContact = (id) => {
    fetch(`http://localhost:5000/contacts/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setContacts(contacts.filter((contact) => contact._id !== id));  // Remove the contact from the list
        }
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);
      });
  };

  return (
    <div className="App">
      <h1>Contact Manager</h1>
      

      {/* Display loading message or spinner */}
      {loading ? (
        <div className="loading">
          <p>Loading contacts...</p>
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <ContactsTable contacts={contacts} deleteContact={deleteContact} />
      )}
    </div>
  );
}

export default App;
