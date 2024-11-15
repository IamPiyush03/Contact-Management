

# Contact Management - Mini Feature of a CRM

This project implements a **Contact Management** feature for a Customer Relationship Management (CRM) system. The goal is to allow users to add, view, update, and delete contacts, all in one place. The application provides a user-friendly interface for managing contacts, essential for keeping track of customer relationships in a business context.

## 📋 Overview

The Contact Management feature enables users to:
- Add new contacts with essential details (First Name, Last Name, Email, Phone, Company, and Job Title).
- View a list of contacts in a table format with sorting and pagination.
- Edit and update existing contacts.
- Delete outdated or unnecessary contacts.

---

## ⚙️ Features

- **Add a Contact**: Add contact details such as First Name, Last Name, Email, Phone Number, Company, and Job Title.
- **View Contacts**: A table displays all contacts with sorting and pagination options.
- **Edit Contacts**: Users can update contact information when required.
- **Delete Contacts**: Easily remove outdated or duplicate contacts.
- **Pagination & Sorting**: Efficiently manage large lists of contacts.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Material UI (MUI), Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB (or your choice of database, such as MySQL, PostgreSQL)
- **Other**: Git, npm/yarn for package management

---

## 🏁 Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (or your preferred database setup)

### Frontend

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Your frontend will be running at `http://localhost:3000`.

### Backend

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd backend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```
   The backend will be available at `http://localhost:5000`.

4. Ensure your database is properly set up and connected.

---

## 🔧 API Endpoints

- **POST /contacts**: Adds a new contact.
- **GET /contacts**: Retrieves all contacts.
- **PUT /contacts/:id**: Updates a specific contact by ID.
- **DELETE /contacts/:id**: Deletes a contact by ID.

---

## 📝 Documentation

- **Frontend**: The frontend was built using React.js, Vite (for fast builds), and Material UI components. It includes a form for adding/editing contacts and a table for displaying them.
- **Backend**: The backend is built with Node.js and Express. It provides API endpoints for managing contacts, with MongoDB as the database.

---

## 💡 Challenges and Solutions

- **Challenge**: Handling pagination and sorting in the table view.
  - **Solution**: Used Material UI’s `TablePagination` and implemented sorting functionality with `useState` and `useEffect` in React.
  
- **Challenge**: Managing backend routes for contact CRUD operations.
  - **Solution**: Set up API routes for POST, GET, PUT, and DELETE operations and handled errors using middleware for validation.

---

## 🎯 Future Improvements

- Add user authentication to secure the contact management feature.
- Implement search functionality to filter contacts.
- Add validation and error handling in the frontend.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

