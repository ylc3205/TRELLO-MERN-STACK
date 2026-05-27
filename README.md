# 🚀 TRELLO MERN STACK

A full-stack Trello-inspired web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).  
This project allows users to manage tasks efficiently through boards, columns, and cards with a modern drag-and-drop interface similar to Trello.

---

# ✨ Features

- 🔐 User Authentication & Authorization
- 📧 Email Verification
- 📋 Create and manage boards
- 📌 Create columns/lists inside boards
- 📝 Add, edit, and delete task cards
- ↔️ Drag & Drop cards and columns
- 👥 Responsive UI
- ⚡ RESTful API integration
- 🌐 Full MERN Stack architecture

---

# 🛠️ Tech Stack

## Frontend
- ReactJS
- Redux Toolkit
- React Router DOM
- Axios
- Material UI
- React Beautiful DnD

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Nodemailer / Brevo

## Tools
- Git & GitHub
- VS Code
- Postman
- npm / yarn

---

# 📂 Project Structure

```bash
MERN STACK/
│
├── trello-api/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── providers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── sockets/
│   │   ├── utils/
│   │   └── validations/
│   │
│   ├── .env
│   └── server.js
│
├── trello-web/
│   ├── src/
│   │   ├── apis/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── customLibraries/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── utils/
│   │
│   └── App.jsx
│
└── README.md

# 🔑 Authentication

The application supports:

User Registration
Login / Logout
JWT Authentication
Protected Routes
Email Verification
# 📌 Main Functionalities
📋 Board Management
Create boards
Update board title
Delete boards
📑 Column Management
Add columns
Edit column names
Delete columns
Reorder columns
📝 Card Management
Create task cards
Edit card details
Move cards between columns
Delete cards
🎯 Drag & Drop
Drag cards between columns
Drag columns within boards
Smooth Trello-like interaction
